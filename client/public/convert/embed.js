/**
 * / convert embed script — businessblueprint.io
 *
 * Vanilla JS, no dependencies, no build step. Runs on any website.
 * Loaded via:
 *
 *   <script src="https://businessblueprint.io/convert/embed.js"
 *           data-form-id="contact-us"
 *           data-client-id="42"></script>
 *
 * Reads configuration from the <script> tag's data-* attributes, fetches the
 * form definition from the public API, renders the form, handles all three
 * display modes (inline / popup / slide_in), validates, submits, and
 * coordinates SwipesBlue payment for payment fields.
 *
 * All CSS is scoped via the bb-convert- prefix so nothing leaks in or out
 * of the host site.
 */
(function () {
  "use strict";

  var scriptTag = document.currentScript;
  if (!scriptTag) {
    console.error("[bb-convert] document.currentScript is null — cannot initialize");
    return;
  }

  var formSlug = scriptTag.getAttribute("data-form-id");
  var clientId = scriptTag.getAttribute("data-client-id");
  if (!formSlug || !clientId) {
    console.error("[bb-convert] Missing required data-form-id or data-client-id");
    return;
  }

  var type = scriptTag.getAttribute("data-type") || "inline";
  var trigger = scriptTag.getAttribute("data-trigger") || "time_delay";
  var delaySeconds = parseInt(scriptTag.getAttribute("data-delay") || "5", 10);
  var scrollPercent = parseInt(scriptTag.getAttribute("data-scroll") || "50", 10);
  var position = scriptTag.getAttribute("data-position") || "center";
  var frequency = scriptTag.getAttribute("data-frequency") || "once_per_session";
  var containerSelector = scriptTag.getAttribute("data-container");

  // Derive API base from the script's own src so a staging embed hits
  // staging and a prod embed hits prod. Fall back to prod.
  var apiBase = "https://businessblueprint.io";
  try {
    var srcUrl = new URL(scriptTag.src);
    apiBase = srcUrl.origin;
  } catch (e) {
    // script.src parsing failed; stick with default
  }

  // ─── State ───
  var formDef = null;
  var fields = [];
  var design = {};
  var settings = {};
  var clientInfo = {};
  var currentStep = 1;
  var fieldValues = {};        // { fieldId: value }
  var fieldErrors = {};        // { fieldId: errorMessage }
  var fieldElements = {};      // { fieldId: wrapper DOM element }
  var formElement = null;      // the <div class="bb-convert-form">
  var overlayElement = null;   // the popup overlay (null for inline/slide_in)
  var slideInElement = null;   // the slide-in panel (null for inline/popup)
  var submitCallbacks = [];    // bbConvert.onSubmit listeners
  var styleInjected = false;

  var STORAGE_KEY = "bb_convert_" + formSlug + "_shown";

  // ─── Utilities ───

  function el(tag, className, text) {
    var e = document.createElement(tag);
    if (className) e.className = className;
    if (text != null) e.textContent = String(text);
    return e;
  }

  function getUrlParam(name) {
    try {
      var params = new URLSearchParams(window.location.search);
      return params.get(name);
    } catch (e) {
      return null;
    }
  }

  function isValidEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value).trim());
  }

  function isValidPhone(value) {
    // Permissive — strip common separators, require at least 7 digits
    var digits = String(value).replace(/[^0-9]/g, "");
    return digits.length >= 7;
  }

  function storageAvailable(kind) {
    try {
      var store = kind === "session" ? window.sessionStorage : window.localStorage;
      var testKey = "__bb_test__";
      store.setItem(testKey, "1");
      store.removeItem(testKey);
      return true;
    } catch (e) {
      return false;
    }
  }

  function shouldShowBasedOnFrequency() {
    if (frequency === "every_visit") return true;
    var kind = frequency === "once" ? "local" : "session";
    if (!storageAvailable(kind)) return true;
    var store = kind === "session" ? window.sessionStorage : window.localStorage;
    return store.getItem(STORAGE_KEY) !== "1";
  }

  function markShown() {
    var kind = frequency === "once" ? "local" : frequency === "once_per_session" ? "session" : null;
    if (!kind || !storageAvailable(kind)) return;
    var store = kind === "session" ? window.sessionStorage : window.localStorage;
    try {
      store.setItem(STORAGE_KEY, "1");
    } catch (e) { /* ignore */ }
  }

  function isMobile() {
    return window.innerWidth < 640;
  }

  // ─── Load form definition ───

  function loadForm() {
    var url = apiBase + "/api/convert/public/" + encodeURIComponent(clientId) + "/" + encodeURIComponent(formSlug);
    return fetch(url)
      .then(function (res) {
        if (!res.ok) throw new Error("Form not found or not published (HTTP " + res.status + ")");
        return res.json();
      })
      .then(function (data) {
        if (!data || !data.success || !data.form) throw new Error("Invalid API response");
        formDef = data.form;
        fields = Array.isArray(data.fields) ? data.fields : [];
        design = formDef.design || {};
        settings = formDef.settings || {};
        clientInfo = data.client || {};
      });
  }

  // ─── Scoped CSS ───

  function injectStyles() {
    if (styleInjected) return;
    var brand = formDef.brandColor || design.primaryColor || "#8000FF";
    var textColor = design.textColor || "#09080E";
    var bgColor = design.backgroundColor || "#FFFFFF";
    var radius = (design.borderRadius != null ? design.borderRadius : 8) + "px";
    var fontFamily = design.fontFamily || "Inter, system-ui, -apple-system, sans-serif";
    var fieldSpacing = (design.fieldSpacing || 20) + "px";
    var formPadding = (design.formPadding || 24) + "px";

    var css = [
      '.bb-convert-form, .bb-convert-popup, .bb-convert-slide-in-panel { box-sizing: border-box; font-family: ' + fontFamily + '; color: ' + textColor + '; max-width: 480px; width: 100%; padding: ' + formPadding + '; background: ' + bgColor + '; border-radius: ' + radius + '; }',
      '.bb-convert-form *, .bb-convert-popup *, .bb-convert-slide-in-panel * { box-sizing: border-box; }',
      '.bb-convert-grid { display: grid; grid-template-columns: 1fr 1fr; gap: ' + fieldSpacing + '; margin-bottom: ' + fieldSpacing + '; }',
      '@media (max-width: 640px) { .bb-convert-grid { grid-template-columns: 1fr; } }',
      '.bb-convert-field { display: flex; flex-direction: column; }',
      '.bb-convert-field.bb-convert-full { grid-column: 1 / -1; }',
      '.bb-convert-label { font-size: 14px; font-weight: 500; color: ' + textColor + '; margin-bottom: 4px; }',
      '.bb-convert-required { color: #E00420; margin-left: 2px; }',
      '.bb-convert-input, .bb-convert-textarea, .bb-convert-select { width: 100%; padding: 10px 12px; border: 1px solid #E5E7EB; border-radius: 6px; font-size: 14px; font-family: inherit; background: #FFFFFF; color: ' + textColor + '; }',
      '.bb-convert-input:focus, .bb-convert-textarea:focus, .bb-convert-select:focus { border-color: ' + brand + '; outline: none; box-shadow: 0 0 0 2px ' + brand + '33; }',
      '.bb-convert-textarea { min-height: 96px; resize: vertical; }',
      '.bb-convert-help { font-size: 12px; color: #6B7280; margin-top: 4px; }',
      '.bb-convert-error { font-size: 12px; color: #E00420; margin-top: 4px; }',
      '.bb-convert-form-error { font-size: 13px; color: #E00420; margin: 12px 0; padding: 8px 12px; background: #FEF2F2; border: 1px solid #FECACA; border-radius: 6px; display: none; }',
      '.bb-convert-form-error.visible { display: block; }',
      '.bb-convert-checkbox-row { display: flex; align-items: flex-start; gap: 8px; }',
      '.bb-convert-checkbox-row input { margin-top: 2px; flex-shrink: 0; accent-color: ' + brand + '; }',
      '.bb-convert-checkbox-row span { font-size: 13px; color: ' + textColor + '; }',
      '.bb-convert-radio-row { display: flex; align-items: center; gap: 6px; font-size: 13px; color: ' + textColor + '; }',
      '.bb-convert-radio-row input { accent-color: ' + brand + '; }',
      '.bb-convert-heading { font-size: 18px; font-weight: 700; color: ' + textColor + '; margin: 0 0 8px 0; }',
      '.bb-convert-paragraph { font-size: 14px; color: #6B7280; margin: 0 0 8px 0; }',
      '.bb-convert-divider { border: none; border-top: 1px solid #E5E7EB; margin: 8px 0; }',
      '.bb-convert-step-indicator { display: flex; justify-content: center; gap: 8px; margin-bottom: 16px; }',
      '.bb-convert-step-dot { width: 24px; height: 24px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: 600; background: #E5E7EB; color: #6B7280; }',
      '.bb-convert-step-dot.active { background: ' + brand + '; color: #FFFFFF; }',
      '.bb-convert-buttons { display: flex; gap: 8px; margin-top: ' + fieldSpacing + '; }',
      '.bb-convert-submit, .bb-convert-next { flex: 1; padding: 12px; background: ' + brand + '; color: #FFFFFF; border: none; border-radius: 6px; font-size: 16px; font-weight: 600; cursor: pointer; font-family: inherit; transition: opacity 0.15s; }',
      '.bb-convert-submit:hover, .bb-convert-next:hover { opacity: 0.9; }',
      '.bb-convert-submit:disabled, .bb-convert-next:disabled { opacity: 0.6; cursor: not-allowed; }',
      '.bb-convert-back { flex: 0 0 auto; padding: 12px 20px; background: #FFFFFF; color: ' + textColor + '; border: 1px solid #E5E7EB; border-radius: 6px; font-size: 14px; font-weight: 500; cursor: pointer; font-family: inherit; }',
      '.bb-convert-back:hover { background: #F9FAFB; }',
      '.bb-convert-branding { text-align: center; font-size: 11px; color: #9CA3AF; margin-top: 16px; }',
      '.bb-convert-branding a { color: #9CA3AF; text-decoration: underline; }',
      '.bb-convert-pay-button { width: 100%; padding: 14px; background: ' + brand + '; color: #FFFFFF; border: none; border-radius: 6px; font-size: 16px; font-weight: 600; cursor: pointer; font-family: inherit; }',
      '.bb-convert-rating { display: flex; gap: 4px; }',
      '.bb-convert-star { font-size: 28px; color: #E5E7EB; cursor: pointer; transition: color 0.15s; user-select: none; }',
      '.bb-convert-star.active { color: ' + brand + '; }',
      '.bb-convert-signature-pad { width: 100%; height: 120px; border: 1px dashed #E5E7EB; border-radius: 6px; cursor: crosshair; touch-action: none; }',
      '.bb-convert-signature-clear { margin-top: 4px; padding: 4px 10px; background: #FFFFFF; border: 1px solid #E5E7EB; border-radius: 4px; font-size: 12px; cursor: pointer; }',
      '.bb-convert-overlay { position: fixed; inset: 0; background: rgba(0, 0, 0, 0.5); z-index: 999999; display: flex; padding: 20px; animation: bb-convert-fade-in 0.2s ease-out; }',
      '.bb-convert-overlay.bb-convert-pos-center { align-items: center; justify-content: center; }',
      '.bb-convert-overlay.bb-convert-pos-bottom_right { align-items: flex-end; justify-content: flex-end; }',
      '.bb-convert-overlay.bb-convert-pos-bottom_left { align-items: flex-end; justify-content: flex-start; }',
      '.bb-convert-overlay.bb-convert-pos-top_bar { align-items: flex-start; justify-content: center; padding: 0; }',
      '.bb-convert-overlay.bb-convert-pos-top_bar .bb-convert-popup { max-width: 100%; width: 100%; border-radius: 0; }',
      '.bb-convert-popup { position: relative; box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3); animation: bb-convert-slide-up 0.25s ease-out; }',
      '.bb-convert-close { position: absolute; top: 12px; right: 12px; width: 32px; height: 32px; border: none; background: transparent; font-size: 24px; line-height: 1; color: #6B7280; cursor: pointer; border-radius: 4px; }',
      '.bb-convert-close:hover { background: #F3F4F6; color: #09080E; }',
      '.bb-convert-slide-in-wrap { position: fixed; z-index: 999999; transition: transform 0.3s ease-out; box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2); max-width: 400px; }',
      '.bb-convert-slide-in-wrap.bb-convert-slide-right { right: 20px; top: 50%; transform: translate(440px, -50%); }',
      '.bb-convert-slide-in-wrap.bb-convert-slide-right.open { transform: translate(0, -50%); }',
      '.bb-convert-slide-in-wrap.bb-convert-slide-left { left: 20px; top: 50%; transform: translate(-440px, -50%); }',
      '.bb-convert-slide-in-wrap.bb-convert-slide-left.open { transform: translate(0, -50%); }',
      '.bb-convert-slide-in-wrap.bb-convert-slide-bottom_right { right: 20px; bottom: 20px; transform: translateY(140%); }',
      '.bb-convert-slide-in-wrap.bb-convert-slide-bottom_right.open { transform: translateY(0); }',
      '.bb-convert-slide-in-wrap.bb-convert-slide-bottom_left { left: 20px; bottom: 20px; transform: translateY(140%); }',
      '.bb-convert-slide-in-wrap.bb-convert-slide-bottom_left.open { transform: translateY(0); }',
      '.bb-convert-success { text-align: center; padding: 20px 0; }',
      '.bb-convert-success-check { width: 56px; height: 56px; margin: 0 auto 12px; border-radius: 50%; background: ' + brand + '; color: #FFFFFF; display: flex; align-items: center; justify-content: center; font-size: 28px; font-weight: bold; }',
      '.bb-convert-success-title { font-size: 20px; font-weight: 700; color: ' + textColor + '; margin: 0 0 8px 0; }',
      '.bb-convert-success-message { font-size: 14px; color: #6B7280; }',
      '@keyframes bb-convert-fade-in { from { opacity: 0; } to { opacity: 1; } }',
      '@keyframes bb-convert-slide-up { from { transform: translateY(20px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }',
    ].join(" ");

    var styleEl = document.createElement("style");
    styleEl.setAttribute("data-bb-convert", "true");
    styleEl.appendChild(document.createTextNode(css));
    document.head.appendChild(styleEl);
    styleInjected = true;
  }

  // ─── Conditional logic ───

  function evaluateConditions() {
    fields.forEach(function (field) {
      var logic = field.conditionalRules;
      if (!logic || !logic.enabled || !Array.isArray(logic.conditions) || logic.conditions.length === 0) return;
      var matchType = logic.matchType || "all";
      var results = logic.conditions.map(function (cond) {
        var triggerField = null;
        // conditionalRules from Phase B stores fieldTempId; that's a client-side
        // identifier and won't survive save. For runtime we match by field id
        // where possible.
        for (var i = 0; i < fields.length; i++) {
          if (String(fields[i].id) === String(cond.fieldTempId) || fields[i].tempId === cond.fieldTempId) {
            triggerField = fields[i];
            break;
          }
        }
        if (!triggerField) return false;
        var triggerValue = fieldValues[triggerField.id];
        switch (cond.operator) {
          case "equals": return String(triggerValue || "") === String(cond.value || "");
          case "not_equals": return String(triggerValue || "") !== String(cond.value || "");
          case "contains": return String(triggerValue || "").indexOf(String(cond.value || "")) !== -1;
          case "is_empty": return triggerValue == null || triggerValue === "";
          case "is_not_empty": return triggerValue != null && triggerValue !== "";
          case "greater_than": return Number(triggerValue) > Number(cond.value);
          case "less_than": return Number(triggerValue) < Number(cond.value);
          default: return false;
        }
      });
      var visible = matchType === "all" ? results.every(Boolean) : results.some(Boolean);
      var wrapper = fieldElements[field.id];
      if (wrapper) {
        wrapper.style.display = visible ? "" : "none";
      }
    });
  }

  function isFieldVisible(field) {
    var wrapper = fieldElements[field.id];
    if (!wrapper) return true;
    return wrapper.style.display !== "none";
  }

  // ─── Field rendering ───

  function buildFieldElement(field) {
    var wrapper = el("div", "bb-convert-field" + (field.columnSpan === 2 ? " bb-convert-full" : ""));
    fieldElements[field.id] = wrapper;

    // Layout elements
    if (field.fieldType === "heading") {
      wrapper.appendChild(el("h3", "bb-convert-heading", field.label));
      return wrapper;
    }
    if (field.fieldType === "paragraph") {
      wrapper.appendChild(el("p", "bb-convert-paragraph", field.label));
      return wrapper;
    }
    if (field.fieldType === "divider") {
      wrapper.appendChild(el("hr", "bb-convert-divider"));
      return wrapper;
    }
    if (field.fieldType === "spacer") {
      var spacer = el("div", "bb-convert-spacer");
      spacer.style.height = (field.config && field.config.height ? field.config.height : 20) + "px";
      wrapper.appendChild(spacer);
      return wrapper;
    }
    if (field.fieldType === "image") {
      var img = document.createElement("img");
      img.src = field.defaultValue || "";
      img.alt = field.label || "";
      img.style.maxWidth = "100%";
      img.style.borderRadius = "6px";
      wrapper.appendChild(img);
      return wrapper;
    }
    if (field.fieldType === "hidden") {
      // Hidden fields don't render visibly but their default values are submitted
      if (field.defaultValue != null) fieldValues[field.id] = field.defaultValue;
      wrapper.style.display = "none";
      return wrapper;
    }

    // Single checkbox (consent-style) — label goes next to the box
    if (field.fieldType === "checkbox" && (!Array.isArray(field.options) || field.options.length === 0)) {
      var row = el("label", "bb-convert-checkbox-row");
      var cb = document.createElement("input");
      cb.type = "checkbox";
      cb.addEventListener("change", function () {
        fieldValues[field.id] = cb.checked;
        clearFieldError(field.id);
        evaluateConditions();
      });
      var consentLabel = field.label;
      if (field.mapsTo === "email_consent" && formDef.consentTextEmail) consentLabel = formDef.consentTextEmail;
      if (field.mapsTo === "sms_consent" && formDef.consentTextSms) consentLabel = formDef.consentTextSms;
      var span = el("span", null, consentLabel);
      if (field.isRequired) {
        var star = el("span", "bb-convert-required", " *");
        span.appendChild(star);
      }
      row.appendChild(cb);
      row.appendChild(span);
      wrapper.appendChild(row);
      if (field.helpText) wrapper.appendChild(el("p", "bb-convert-help", field.helpText));
      wrapper.appendChild(el("div", "bb-convert-error"));
      return wrapper;
    }

    // Standard label row
    var label = el("label", "bb-convert-label", field.label);
    if (field.isRequired) label.appendChild(el("span", "bb-convert-required", " *"));
    wrapper.appendChild(label);

    if (field.fieldType === "textarea") {
      var ta = document.createElement("textarea");
      ta.className = "bb-convert-textarea";
      ta.placeholder = field.placeholder || "";
      if (field.defaultValue) ta.value = field.defaultValue;
      if (field.config && field.config.rows) ta.rows = field.config.rows;
      ta.addEventListener("input", function () {
        fieldValues[field.id] = ta.value;
        clearFieldError(field.id);
      });
      wrapper.appendChild(ta);
    } else if (field.fieldType === "select") {
      var sel = document.createElement("select");
      sel.className = "bb-convert-select";
      var placeholderOpt = document.createElement("option");
      placeholderOpt.value = "";
      placeholderOpt.textContent = field.placeholder || "Choose one...";
      sel.appendChild(placeholderOpt);
      (field.options || []).forEach(function (opt) {
        var o = document.createElement("option");
        o.value = opt.value != null ? opt.value : opt;
        o.textContent = opt.label != null ? opt.label : (opt.value != null ? opt.value : opt);
        sel.appendChild(o);
      });
      sel.addEventListener("change", function () {
        fieldValues[field.id] = sel.value;
        clearFieldError(field.id);
        evaluateConditions();
      });
      wrapper.appendChild(sel);
    } else if (field.fieldType === "radio") {
      var radioGroup = el("div");
      (field.options || []).forEach(function (opt, i) {
        var radioRow = el("label", "bb-convert-radio-row");
        var r = document.createElement("input");
        r.type = "radio";
        r.name = "bb-convert-" + field.id;
        r.value = opt.value != null ? opt.value : opt;
        r.addEventListener("change", function () {
          if (r.checked) {
            fieldValues[field.id] = r.value;
            clearFieldError(field.id);
            evaluateConditions();
          }
        });
        radioRow.appendChild(r);
        radioRow.appendChild(el("span", null, opt.label != null ? opt.label : (opt.value != null ? opt.value : opt)));
        radioGroup.appendChild(radioRow);
      });
      wrapper.appendChild(radioGroup);
    } else if (field.fieldType === "checkbox") {
      // Multi-checkbox (options array present)
      var group = el("div");
      var selected = {};
      (field.options || []).forEach(function (opt, i) {
        var r = el("label", "bb-convert-radio-row");
        var c = document.createElement("input");
        c.type = "checkbox";
        c.value = opt.value != null ? opt.value : opt;
        c.addEventListener("change", function () {
          selected[c.value] = c.checked;
          fieldValues[field.id] = Object.keys(selected).filter(function (k) { return selected[k]; });
          clearFieldError(field.id);
          evaluateConditions();
        });
        r.appendChild(c);
        r.appendChild(el("span", null, opt.label != null ? opt.label : (opt.value != null ? opt.value : opt)));
        group.appendChild(r);
      });
      wrapper.appendChild(group);
    } else if (field.fieldType === "rating") {
      var scale = (field.config && field.config.ratingScale) || 5;
      var ratingRow = el("div", "bb-convert-rating");
      var stars = [];
      var currentRating = 0;
      function updateStars() {
        stars.forEach(function (s, i) {
          if (i < currentRating) s.classList.add("active");
          else s.classList.remove("active");
        });
      }
      for (var i = 1; i <= scale; i++) {
        (function (rating) {
          var star = el("span", "bb-convert-star", "★");
          star.addEventListener("click", function () {
            currentRating = rating;
            fieldValues[field.id] = rating;
            updateStars();
            clearFieldError(field.id);
            evaluateConditions();
          });
          stars.push(star);
          ratingRow.appendChild(star);
        })(i);
      }
      wrapper.appendChild(ratingRow);
    } else if (field.fieldType === "date") {
      var dateInput = document.createElement("input");
      dateInput.type = "date";
      dateInput.className = "bb-convert-input";
      dateInput.addEventListener("change", function () {
        fieldValues[field.id] = dateInput.value;
        clearFieldError(field.id);
      });
      wrapper.appendChild(dateInput);
    } else if (field.fieldType === "file") {
      var fileInput = document.createElement("input");
      fileInput.type = "file";
      fileInput.className = "bb-convert-input";
      if (field.config && field.config.fileTypes) fileInput.accept = field.config.fileTypes;
      fileInput.addEventListener("change", function () {
        var f = fileInput.files && fileInput.files[0];
        // Phase C only captures file NAME; full upload is Phase D.
        fieldValues[field.id] = f ? f.name : "";
        clearFieldError(field.id);
      });
      wrapper.appendChild(fileInput);
    } else if (field.fieldType === "signature") {
      var canvas = document.createElement("canvas");
      canvas.className = "bb-convert-signature-pad";
      canvas.width = 400;
      canvas.height = 120;
      var ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.strokeStyle = "#09080E";
        ctx.lineWidth = 2;
        ctx.lineCap = "round";
      }
      var drawing = false;
      function getPoint(e) {
        var rect = canvas.getBoundingClientRect();
        var touch = e.touches && e.touches[0];
        var clientX = touch ? touch.clientX : e.clientX;
        var clientY = touch ? touch.clientY : e.clientY;
        return {
          x: (clientX - rect.left) * (canvas.width / rect.width),
          y: (clientY - rect.top) * (canvas.height / rect.height),
        };
      }
      function startDraw(e) {
        e.preventDefault();
        drawing = true;
        if (!ctx) return;
        var p = getPoint(e);
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
      }
      function moveDraw(e) {
        if (!drawing || !ctx) return;
        e.preventDefault();
        var p = getPoint(e);
        ctx.lineTo(p.x, p.y);
        ctx.stroke();
      }
      function endDraw() {
        if (!drawing) return;
        drawing = false;
        try {
          fieldValues[field.id] = canvas.toDataURL("image/png");
          clearFieldError(field.id);
        } catch (e) { /* ignore */ }
      }
      canvas.addEventListener("mousedown", startDraw);
      canvas.addEventListener("mousemove", moveDraw);
      canvas.addEventListener("mouseup", endDraw);
      canvas.addEventListener("mouseleave", endDraw);
      canvas.addEventListener("touchstart", startDraw);
      canvas.addEventListener("touchmove", moveDraw);
      canvas.addEventListener("touchend", endDraw);
      wrapper.appendChild(canvas);
      var clearBtn = el("button", "bb-convert-signature-clear", "Clear");
      clearBtn.type = "button";
      clearBtn.addEventListener("click", function () {
        if (ctx) ctx.clearRect(0, 0, canvas.width, canvas.height);
        fieldValues[field.id] = "";
      });
      wrapper.appendChild(clearBtn);
    } else if (field.fieldType === "payment") {
      var amount = field.config && field.config.paymentAmount != null ? Number(field.config.paymentAmount) : 0;
      var currency = (field.config && field.config.currency) || "usd";
      var payLabel = (field.config && field.config.buttonText) || (amount > 0 ? "Pay $" + amount.toFixed(2) : "Pay Now");
      var payBtn = el("button", "bb-convert-pay-button", payLabel);
      payBtn.type = "button";
      payBtn.addEventListener("click", function () {
        handlePaymentSubmit(field, amount, currency, payBtn);
      });
      wrapper.appendChild(payBtn);
      if (field.helpText) wrapper.appendChild(el("p", "bb-convert-help", field.helpText));
      wrapper.appendChild(el("div", "bb-convert-error"));
      // Store metadata so validation knows this field is a payment gate
      fieldValues[field.id] = { __payment: true, amount: amount, currency: currency };
      return wrapper;
    } else {
      // text / email / phone / number
      var input = document.createElement("input");
      input.className = "bb-convert-input";
      input.type =
        field.fieldType === "email" ? "email" :
        field.fieldType === "phone" ? "tel" :
        field.fieldType === "number" ? "number" : "text";
      input.placeholder = field.placeholder || "";
      if (field.defaultValue) input.value = field.defaultValue;
      input.addEventListener("input", function () {
        fieldValues[field.id] = input.value;
        clearFieldError(field.id);
      });
      wrapper.appendChild(input);
    }

    if (field.helpText) wrapper.appendChild(el("p", "bb-convert-help", field.helpText));
    wrapper.appendChild(el("div", "bb-convert-error"));
    return wrapper;
  }

  // ─── Error display ───

  function showFieldError(fieldId, message) {
    fieldErrors[fieldId] = message;
    var wrapper = fieldElements[fieldId];
    if (!wrapper) return;
    var errEl = wrapper.querySelector(".bb-convert-error");
    if (errEl) errEl.textContent = message;
  }

  function clearFieldError(fieldId) {
    delete fieldErrors[fieldId];
    var wrapper = fieldElements[fieldId];
    if (!wrapper) return;
    var errEl = wrapper.querySelector(".bb-convert-error");
    if (errEl) errEl.textContent = "";
  }

  function showFormError(message) {
    if (!formElement) return;
    var errEl = formElement.querySelector(".bb-convert-form-error");
    if (errEl) {
      errEl.textContent = message;
      errEl.classList.add("visible");
    }
  }

  function clearFormError() {
    if (!formElement) return;
    var errEl = formElement.querySelector(".bb-convert-form-error");
    if (errEl) {
      errEl.textContent = "";
      errEl.classList.remove("visible");
    }
  }

  // ─── Validation ───

  function validateField(field) {
    if (!isFieldVisible(field)) return true;
    var value = fieldValues[field.id];

    // Payment fields are validated separately inside handlePaymentSubmit
    if (value && typeof value === "object" && value.__payment) return true;

    if (field.isRequired) {
      if (value == null || value === "" || value === false || (Array.isArray(value) && value.length === 0)) {
        showFieldError(field.id, "This field is required");
        return false;
      }
    }
    if (value && field.fieldType === "email" && !isValidEmail(value)) {
      showFieldError(field.id, "Please enter a valid email address");
      return false;
    }
    if (value && field.fieldType === "phone" && !isValidPhone(value)) {
      showFieldError(field.id, "Please enter a valid phone number");
      return false;
    }
    if (value && field.minLength != null && String(value).length < field.minLength) {
      showFieldError(field.id, "Must be at least " + field.minLength + " characters");
      return false;
    }
    if (value && field.maxLength != null && String(value).length > field.maxLength) {
      showFieldError(field.id, "Must be no more than " + field.maxLength + " characters");
      return false;
    }
    if (value && field.validationPattern) {
      try {
        var re = new RegExp(field.validationPattern);
        if (!re.test(String(value))) {
          showFieldError(field.id, field.validationMessage || "Invalid format");
          return false;
        }
      } catch (e) { /* invalid regex saved — treat as pass */ }
    }
    return true;
  }

  function validateStep(step) {
    var ok = true;
    fields.forEach(function (field) {
      var fstep = field.pageNumber || 1;
      if (fstep !== step) return;
      if (!validateField(field)) ok = false;
    });
    return ok;
  }

  function validateAll() {
    var ok = true;
    fields.forEach(function (field) {
      if (!validateField(field)) ok = false;
    });
    return ok;
  }

  // ─── Build full form ───

  function getMaxStep() {
    var max = 1;
    fields.forEach(function (f) {
      var s = f.pageNumber || 1;
      if (s > max) max = s;
    });
    return max;
  }

  function buildFormDom() {
    fieldElements = {};
    var container = el("div", "bb-convert-form");
    formElement = container;

    var maxStep = getMaxStep();

    if (maxStep > 1) {
      var indicator = el("div", "bb-convert-step-indicator");
      for (var s = 1; s <= maxStep; s++) {
        var dot = el("span", "bb-convert-step-dot" + (s === currentStep ? " active" : ""), String(s));
        indicator.appendChild(dot);
      }
      container.appendChild(indicator);
    }

    var grid = el("div", "bb-convert-grid");
    fields
      .filter(function (f) { return (f.pageNumber || 1) === currentStep; })
      .sort(function (a, b) { return (a.sortOrder || 0) - (b.sortOrder || 0); })
      .forEach(function (field) {
        var fieldEl = buildFieldElement(field);
        grid.appendChild(fieldEl);
      });
    container.appendChild(grid);

    container.appendChild(el("div", "bb-convert-form-error"));

    var buttonRow = el("div", "bb-convert-buttons");

    if (currentStep > 1) {
      var backBtn = el("button", "bb-convert-back", "Back");
      backBtn.type = "button";
      backBtn.addEventListener("click", function () {
        currentStep--;
        rerender();
      });
      buttonRow.appendChild(backBtn);
    }

    if (currentStep < maxStep) {
      var nextBtn = el("button", "bb-convert-next", "Next");
      nextBtn.type = "button";
      nextBtn.addEventListener("click", function () {
        clearFormError();
        if (validateStep(currentStep)) {
          currentStep++;
          rerender();
        }
      });
      buttonRow.appendChild(nextBtn);
    } else {
      var submitBtn = el("button", "bb-convert-submit", design.buttonText || "Submit");
      submitBtn.type = "button";
      submitBtn.addEventListener("click", handleSubmit);
      buttonRow.appendChild(submitBtn);
    }

    container.appendChild(buttonRow);

    if (formDef.showBranding !== false) {
      var branding = el("div", "bb-convert-branding");
      var brandLink = document.createElement("a");
      brandLink.href = "https://businessblueprint.io/convert";
      brandLink.target = "_blank";
      brandLink.rel = "noopener noreferrer";
      brandLink.textContent = "Powered by businessblueprint.io/convert";
      branding.appendChild(brandLink);
      container.appendChild(branding);
    }

    // Evaluate conditions once after initial render
    setTimeout(evaluateConditions, 0);

    return container;
  }

  function rerender() {
    if (!formElement || !formElement.parentNode) return;
    var newForm = buildFormDom();
    formElement.parentNode.replaceChild(newForm, formElement);
    formElement = newForm;
  }

  // ─── Submission ───

  function buildSubmitPayload() {
    // Strip payment placeholders from submitted data — they're not real values
    var data = {};
    Object.keys(fieldValues).forEach(function (k) {
      var v = fieldValues[k];
      if (v && typeof v === "object" && v.__payment) return;
      data[k] = v;
    });
    return {
      data: data,
      sourceUrl: window.location.href,
      referrerUrl: document.referrer || null,
      utmSource: getUrlParam("utm_source"),
      utmMedium: getUrlParam("utm_medium"),
      utmCampaign: getUrlParam("utm_campaign"),
      userAgent: navigator.userAgent,
    };
  }

  function handleSubmit() {
    clearFormError();
    if (!validateAll()) {
      showFormError("Please correct the errors above");
      return;
    }

    // If the form has a payment field, payment is the submit path
    var paymentField = fields.filter(function (f) { return f.fieldType === "payment"; })[0];
    if (paymentField) {
      var amount = paymentField.config && paymentField.config.paymentAmount != null ? Number(paymentField.config.paymentAmount) : 0;
      var currency = (paymentField.config && paymentField.config.currency) || "usd";
      var submitBtn = formElement.querySelector(".bb-convert-submit");
      handlePaymentSubmit(paymentField, amount, currency, submitBtn);
      return;
    }

    var submitBtn = formElement.querySelector(".bb-convert-submit");
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = "Submitting...";
    }

    var url = apiBase + "/api/convert/submit/" + encodeURIComponent(clientId) + "/" + encodeURIComponent(formSlug);
    fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(buildSubmitPayload()),
    })
      .then(function (res) { return res.json().then(function (body) { return { ok: res.ok, body: body }; }); })
      .then(function (r) {
        if (!r.ok || !r.body.success) {
          showFormError(r.body.error || "Submission failed. Please try again.");
          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.textContent = design.buttonText || "Submit";
          }
          return;
        }
        onSubmitSuccess(r.body);
      })
      .catch(function (err) {
        console.error("[bb-convert] Submission error:", err);
        showFormError("Could not reach the form server. Please try again.");
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.textContent = design.buttonText || "Submit";
        }
      });
  }

  function handlePaymentSubmit(paymentField, amount, currency, btn) {
    clearFormError();
    if (!validateAll()) {
      showFormError("Please correct the errors above");
      return;
    }
    if (!amount || amount <= 0) {
      showFieldError(paymentField.id, "Payment amount not configured");
      return;
    }
    if (btn) {
      btn.disabled = true;
      btn.textContent = "Redirecting to checkout...";
    }

    // Find customer email from mapped field if any
    var customerEmail = null;
    fields.forEach(function (f) {
      if (f.mapsTo === "crm_email" || f.fieldType === "email") {
        if (fieldValues[f.id]) customerEmail = fieldValues[f.id];
      }
    });

    var url = apiBase + "/api/convert/public/" + encodeURIComponent(clientId) + "/" + encodeURIComponent(formSlug) + "/checkout";
    var payload = {
      amount: Math.round(amount * 100),
      currency: currency,
      description: (paymentField.config && paymentField.config.description) || formDef.name,
      customerEmail: customerEmail,
      formData: buildSubmitPayload().data,
      sourceUrl: window.location.href,
      referrerUrl: document.referrer || null,
      utmSource: getUrlParam("utm_source"),
      utmMedium: getUrlParam("utm_medium"),
      utmCampaign: getUrlParam("utm_campaign"),
      userAgent: navigator.userAgent,
    };

    fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
      .then(function (res) { return res.json().then(function (body) { return { ok: res.ok, body: body }; }); })
      .then(function (r) {
        if (!r.ok || !r.body.success || !r.body.checkoutUrl) {
          showFormError(r.body.error || "Payment could not be initiated. Please try again.");
          if (btn) {
            btn.disabled = false;
            btn.textContent = design.buttonText || "Submit";
          }
          return;
        }
        window.location.href = r.body.checkoutUrl;
      })
      .catch(function (err) {
        console.error("[bb-convert] Checkout error:", err);
        showFormError("Could not reach payment processor. Please try again.");
        if (btn) {
          btn.disabled = false;
          btn.textContent = design.buttonText || "Submit";
        }
      });
  }

  function onSubmitSuccess(body) {
    submitCallbacks.forEach(function (cb) {
      try { cb(body); } catch (e) { console.error("[bb-convert] onSubmit callback threw:", e); }
    });

    var thankYouType = body.thankYouType || formDef.thankYouType || "message";
    var thankYouMessage = body.thankYouMessage || formDef.thankYouMessage || "Thank you for your submission!";
    var thankYouRedirectUrl = body.thankYouRedirectUrl || formDef.thankYouRedirectUrl;

    if (thankYouType === "redirect" && thankYouRedirectUrl) {
      window.location.href = thankYouRedirectUrl;
      return;
    }

    if (thankYouType === "close" && (type === "popup" || type === "slide_in")) {
      hidePopupForm();
      return;
    }

    // thankYouType === "message" (default) — replace form with success state
    if (!formElement) return;
    var success = el("div", "bb-convert-success");
    var check = el("div", "bb-convert-success-check", "✓");
    var title = el("h3", "bb-convert-success-title", "Thank you!");
    var msg = el("p", "bb-convert-success-message", thankYouMessage);
    success.appendChild(check);
    success.appendChild(title);
    success.appendChild(msg);
    if (formDef.showBranding !== false) {
      var branding = el("div", "bb-convert-branding");
      var brandLink = document.createElement("a");
      brandLink.href = "https://businessblueprint.io/convert";
      brandLink.target = "_blank";
      brandLink.rel = "noopener noreferrer";
      brandLink.textContent = "Powered by businessblueprint.io/convert";
      branding.appendChild(brandLink);
      success.appendChild(branding);
    }
    // Clone the form container styling onto the success container
    success.style.maxWidth = "480px";
    success.style.width = "100%";
    success.style.padding = (design.formPadding || 24) + "px";
    success.style.background = design.backgroundColor || "#FFFFFF";
    success.style.borderRadius = (design.borderRadius != null ? design.borderRadius : 8) + "px";
    formElement.parentNode.replaceChild(success, formElement);
    formElement = success;
  }

  // ─── Display modes ───

  function renderInline() {
    formElement = buildFormDom();
    if (containerSelector) {
      var host = document.querySelector(containerSelector);
      if (host) {
        host.appendChild(formElement);
        return;
      }
      console.warn("[bb-convert] data-container selector not found:", containerSelector);
    }
    // Default: insert after the script tag
    if (scriptTag.parentNode) {
      scriptTag.parentNode.insertBefore(formElement, scriptTag.nextSibling);
    }
  }

  function renderPopup() {
    overlayElement = el("div", "bb-convert-overlay bb-convert-pos-" + position);
    overlayElement.style.display = "none";
    formElement = buildFormDom();
    formElement.classList.add("bb-convert-popup");
    var close = el("button", "bb-convert-close", "×");
    close.type = "button";
    close.setAttribute("aria-label", "Close");
    close.addEventListener("click", hidePopupForm);
    formElement.insertBefore(close, formElement.firstChild);
    overlayElement.appendChild(formElement);
    overlayElement.addEventListener("click", function (e) {
      if (e.target === overlayElement) hidePopupForm();
    });
    document.body.appendChild(overlayElement);

    document.addEventListener("keydown", function escHandler(e) {
      if (e.key === "Escape" && overlayElement && overlayElement.style.display !== "none") {
        hidePopupForm();
      }
    });
  }

  function renderSlideIn() {
    slideInElement = el("div", "bb-convert-slide-in-wrap bb-convert-slide-" + position);
    slideInElement.style.display = "none";
    formElement = buildFormDom();
    formElement.classList.add("bb-convert-slide-in-panel");
    var close = el("button", "bb-convert-close", "×");
    close.type = "button";
    close.setAttribute("aria-label", "Close");
    close.addEventListener("click", hidePopupForm);
    formElement.insertBefore(close, formElement.firstChild);
    slideInElement.appendChild(formElement);
    document.body.appendChild(slideInElement);
  }

  function showPopupForm() {
    if (!shouldShowBasedOnFrequency()) return;
    if (overlayElement) {
      overlayElement.style.display = "flex";
      document.body.style.overflow = "hidden";
    } else if (slideInElement) {
      slideInElement.style.display = "block";
      // Allow CSS transition to animate in
      setTimeout(function () { slideInElement.classList.add("open"); }, 10);
    }
    markShown();
  }

  function hidePopupForm() {
    if (overlayElement) {
      overlayElement.style.display = "none";
      document.body.style.overflow = "";
    } else if (slideInElement) {
      slideInElement.classList.remove("open");
      setTimeout(function () { if (slideInElement) slideInElement.style.display = "none"; }, 320);
    }
  }

  // ─── Popup triggers ───

  function setupPopupTrigger() {
    if (trigger === "click") {
      // No auto-show — host site calls window.bbConvert.show()
      return;
    }

    if (trigger === "page_load") {
      showPopupForm();
      return;
    }

    if (trigger === "time_delay") {
      setTimeout(showPopupForm, (delaySeconds || 5) * 1000);
      return;
    }

    if (trigger === "scroll") {
      var triggered = false;
      var onScroll = function () {
        if (triggered) return;
        var docHeight = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight);
        var windowHeight = window.innerHeight;
        var scrolled = window.scrollY || document.documentElement.scrollTop;
        var pct = ((scrolled + windowHeight) / docHeight) * 100;
        if (pct >= (scrollPercent || 50)) {
          triggered = true;
          window.removeEventListener("scroll", onScroll);
          showPopupForm();
        }
      };
      window.addEventListener("scroll", onScroll, { passive: true });
      return;
    }

    if (trigger === "exit_intent") {
      if (isMobile()) {
        // No mouseout on mobile — fall back to time_delay(5)
        setTimeout(showPopupForm, 5000);
        return;
      }
      var triggered = false;
      var onMouseOut = function (e) {
        if (triggered) return;
        if (!e.relatedTarget && e.clientY <= 0) {
          triggered = true;
          document.removeEventListener("mouseout", onMouseOut);
          showPopupForm();
        }
      };
      document.addEventListener("mouseout", onMouseOut);
      return;
    }
  }

  // ─── Global API ───

  window.bbConvert = window.bbConvert || {};
  var prevShow = window.bbConvert.show;
  var prevHide = window.bbConvert.hide;
  var prevOnSubmit = window.bbConvert.onSubmit;
  var prevReset = window.bbConvert.reset;

  window.bbConvert.show = function (slug) {
    if (slug == null || slug === formSlug) showPopupForm();
    if (typeof prevShow === "function") prevShow(slug);
  };
  window.bbConvert.hide = function (slug) {
    if (slug == null || slug === formSlug) hidePopupForm();
    if (typeof prevHide === "function") prevHide(slug);
  };
  window.bbConvert.onSubmit = function (slug, cb) {
    if (slug === formSlug && typeof cb === "function") submitCallbacks.push(cb);
    if (typeof prevOnSubmit === "function") prevOnSubmit(slug, cb);
  };
  window.bbConvert.reset = function (slug) {
    if (slug == null || slug === formSlug) {
      fieldValues = {};
      currentStep = 1;
      rerender();
    }
    if (typeof prevReset === "function") prevReset(slug);
  };

  // ─── Init ───

  loadForm()
    .then(function () {
      injectStyles();
      if (type === "inline") {
        renderInline();
      } else if (type === "popup") {
        renderPopup();
        setupPopupTrigger();
      } else if (type === "slide_in") {
        renderSlideIn();
        setupPopupTrigger();
      } else {
        // Unknown type — fall back to inline
        renderInline();
      }
    })
    .catch(function (err) {
      console.error("[bb-convert] Failed to load form '" + formSlug + "':", err);
    });
})();

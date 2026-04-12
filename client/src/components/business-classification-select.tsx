/**
 * Business Classification autocomplete — replaces the old 8-option Industry
 * dropdown on the assessment form. Powered by the Google Business Profile
 * category taxonomy in shared/google-business-categories.ts (~550 categories).
 *
 * Features:
 *  - Text input with search icon. User types >= 2 characters → dropdown
 *    appears with matching categories. Matches highlighted in bold.
 *  - Keyboard navigation (arrow keys, Enter, Escape)
 *  - Click or Enter to select → stores the category display name
 *  - Clear button to reset
 *  - Max 10 results at a time
 *  - If no matches: "No matching classification found" (never "Other")
 */
import { useState, useRef, useEffect, useCallback } from "react";
import { Input } from "@/components/ui/input";
import { Search, X } from "lucide-react";
import { searchCategories, type BusinessCategory } from "@shared/google-business-categories";

interface BusinessClassificationSelectProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

export function BusinessClassificationSelect({ value, onChange, error }: BusinessClassificationSelectProps) {
  const [inputValue, setInputValue] = useState(value || "");
  const [isOpen, setIsOpen] = useState(false);
  const [results, setResults] = useState<BusinessCategory[]>([]);
  const [highlightIndex, setHighlightIndex] = useState(-1);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Sync external value changes
  useEffect(() => {
    if (value && value !== inputValue) {
      setInputValue(value);
    }
  }, [value]);

  const runSearch = useCallback((query: string) => {
    if (query.length < 2) {
      setResults([]);
      setIsOpen(false);
      return;
    }
    const matches = searchCategories(query, 10);
    setResults(matches);
    setIsOpen(matches.length > 0 || query.length >= 2);
    setHighlightIndex(-1);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setInputValue(val);
    runSearch(val);
    if (!val) {
      onChange("");
    }
  };

  const selectCategory = (cat: BusinessCategory) => {
    setInputValue(cat.name);
    onChange(cat.name);
    setIsOpen(false);
    setResults([]);
  };

  const clear = () => {
    setInputValue("");
    onChange("");
    setIsOpen(false);
    setResults([]);
    inputRef.current?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlightIndex((prev) => Math.min(prev + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlightIndex((prev) => Math.max(prev - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (highlightIndex >= 0 && highlightIndex < results.length) {
        selectCategory(results[highlightIndex]);
      }
    } else if (e.key === "Escape") {
      setIsOpen(false);
    }
  };

  // Close on click outside
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={containerRef} className="relative">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
        <Input
          ref={inputRef}
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={() => inputValue.length >= 2 && runSearch(inputValue)}
          placeholder="Search your business type..."
          className={`pl-9 pr-8 ${error ? "border-red-500" : ""}`}
          data-testid="business-classification-input"
          autoComplete="off"
        />
        {inputValue && (
          <button
            type="button"
            onClick={clear}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700"
            data-testid="business-classification-clear"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {isOpen && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto">
          {results.length > 0 ? (
            results.map((cat, i) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => selectCategory(cat)}
                className={`w-full text-left px-3 py-2 text-sm ${
                  i === highlightIndex ? "bg-[#8000FF]/10 text-[#8000FF]" : "text-gray-900 hover:bg-gray-100"
                }`}
                data-testid={`classification-option-${cat.id}`}
              >
                <HighlightedText text={cat.name} query={inputValue} />
              </button>
            ))
          ) : (
            <div className="px-3 py-4 text-sm text-gray-500 text-center">
              No matching classification found
            </div>
          )}
        </div>
      )}

      {error && <p className="text-xs text-red-600 mt-1">{error}</p>}
    </div>
  );
}

function HighlightedText({ text, query }: { text: string; query: string }) {
  if (!query || query.length < 2) return <span>{text}</span>;
  const lower = text.toLowerCase();
  const idx = lower.indexOf(query.toLowerCase());
  if (idx === -1) return <span>{text}</span>;
  return (
    <span>
      {text.slice(0, idx)}
      <strong className="font-bold">{text.slice(idx, idx + query.length)}</strong>
      {text.slice(idx + query.length)}
    </span>
  );
}

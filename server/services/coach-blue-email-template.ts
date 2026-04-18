export interface CoachBlueEmailSlots {
  title: string;
  subtitle: string;
  businessName: string;
  opening: string;
  coachVoice: string;
  highlightHeader: string;
  highlightBullets: string[];
  closingLine: string;
  ctaText: string;
  ctaUrl: string;
  topCtaText: string;
  topCtaUrl: string;
}

const baseUrl = () => process.env.FRONTEND_URL || 'https://businessblueprint.io';

export function renderCoachBlueEmail(slots: CoachBlueEmailSlots): string {
  const base = baseUrl();
  const logoUrl = 'https://cdn.triadblue.com/brands/businessblueprint/logo-text.png';
  const portraitUrl = 'https://cdn.triadblue.com/brands/businessblueprint/logo-image.png';

  const bullets = slots.highlightBullets
    .map(b => `<li style="margin: 10px 0; font-size: 13px; color: #09080E; font-family: 'Allerta Stencil', sans-serif; letter-spacing: 0.5px;">${b}</li>`)
    .join('\n            ');

  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="color-scheme" content="light only">
  <meta name="supported-color-schemes" content="light only">
  <title>${slots.title}</title>
  <link href="https://fonts.googleapis.com/css2?family=Allerta+Stencil&display=swap" rel="stylesheet">
</head>
<body style="font-family: Copperplate, 'Copperplate Gothic', serif; line-height: 1.6; color: #09080E; background-color: #f5f5f5; margin: 0; padding: 0; font-variant: normal; text-transform: none;">
  <div style="max-width: 600px; margin: 0 auto; background: #EEFBFF;">
    <div style="border: 2px solid #F97316; border-radius: 8px; overflow: hidden;">

      <!-- HEADER BANNER -->
      <div style="background: #97ACCA; padding: 30px; border-bottom: 4px solid #F97316;">
        <table width="100%" cellpadding="0" cellspacing="0" border="0">
          <tr>
            <td style="vertical-align: top; padding-right: 20px;">
              <img src="${logoUrl}" alt="businessblueprint.io" style="height: 36px; margin-bottom: 16px; display: block;" />
              <h1 style="font-family: 'Allerta Stencil', sans-serif; font-size: 28px; color: #09080E; margin: 0; letter-spacing: 1.5px; font-weight: 400; -webkit-font-smoothing: antialiased;">${slots.title}</h1>
              <p style="font-family: 'Allerta Stencil', sans-serif; font-size: 12px; color: #09080E; margin: 8px 0 0 0; letter-spacing: 2.5px; text-transform: uppercase; font-weight: 400; -webkit-font-smoothing: antialiased;">${slots.subtitle}</p>
            </td>
            <td style="vertical-align: bottom; width: 180px; text-align: right;">
              <img src="${portraitUrl}" alt="Coach Blue" style="width: 175px; height: 175px;" />
            </td>
          </tr>
        </table>
      </div>

      <!-- TOP CTA — between header and body -->
      <div style="background: #EEFBFF; padding: 24px 30px 0 30px; text-align: right;">
        <a href="${slots.topCtaUrl}" style="display: inline-block; background: #97ACCA; color: #09080E; border: 2px solid #09080E; padding: 12px 24px; text-decoration: none; border-radius: 8px; font-weight: 700; font-family: 'Allerta Stencil', sans-serif; font-size: 14px;">${slots.topCtaText}</a>
      </div>

      <!-- BODY — BLUEPRINT GRID -->
      <div style="background: #EEFBFF; padding: 24px 30px 40px 30px; background-image: linear-gradient(0deg, transparent 24%, rgba(0, 0, 255, 0.08) 25%, rgba(0, 0, 255, 0.08) 26%, transparent 27%, transparent 74%, rgba(0, 0, 255, 0.08) 75%, rgba(0, 0, 255, 0.08) 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, rgba(0, 0, 255, 0.08) 25%, rgba(0, 0, 255, 0.08) 26%, transparent 27%, transparent 74%, rgba(0, 0, 255, 0.08) 75%, rgba(0, 0, 255, 0.08) 76%, transparent 77%, transparent); background-size: 50px 50px; background-color: #EEFBFF;">

        <p style="font-size: 16px; margin: 0 0 20px 0; font-family: Copperplate, 'Copperplate Gothic', serif;"><strong>Hi ${slots.businessName},</strong></p>

        <p style="font-size: 15px; margin: 0 0 24px 0; font-family: Copperplate, 'Copperplate Gothic', serif;">${slots.opening}</p>

        <p style="font-size: 15px; margin: 0 0 30px 0; font-family: Copperplate, 'Copperplate Gothic', serif;">${slots.coachVoice}</p>

        <!-- HIGHLIGHT CALLOUT — ORANGE -->
        <div style="background: #F97316; border-radius: 8px; padding: 24px 28px; margin: 30px 0;">
          <p style="font-weight: 700; color: #09080E; font-size: 20px; margin: 0 0 16px 0; font-family: 'Allerta Stencil', sans-serif; letter-spacing: 0.5px;">${slots.highlightHeader}</p>
          <ul style="margin: 0; padding-left: 20px; list-style-type: disc;">
            ${bullets}
          </ul>
        </div>

        <p style="font-size: 16px; font-weight: 600; margin: 30px 0 24px 0; font-family: Copperplate, 'Copperplate Gothic', serif;">${slots.closingLine}</p>

        <!-- BOTTOM CTA -->
        <div style="text-align: center; margin: 30px 0;">
          <a href="${slots.ctaUrl}" style="display: inline-block; background: #97ACCA; color: #09080E; border: 2px solid #09080E; padding: 16px 36px; text-decoration: none; border-radius: 8px; font-weight: 700; font-family: 'Allerta Stencil', sans-serif; font-size: 16px;">${slots.ctaText}</a>
        </div>
      </div>

      <!-- FOOTER -->
      <div style="background: #f2f4f6; background-image: linear-gradient(0deg, transparent 24%, rgba(0, 0, 255, 0.08) 25%, rgba(0, 0, 255, 0.08) 26%, transparent 27%, transparent 74%, rgba(0, 0, 255, 0.08) 75%, rgba(0, 0, 255, 0.08) 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, rgba(0, 0, 255, 0.08) 25%, rgba(0, 0, 255, 0.08) 26%, transparent 27%, transparent 74%, rgba(0, 0, 255, 0.08) 75%, rgba(0, 0, 255, 0.08) 76%, transparent 77%, transparent); background-size: 50px 50px; background-color: #f2f4f6; color: #09080E; padding: 30px; text-align: center; border-top: 4px solid #F97316;">
        <img src="https://cdn.triadblue.com/brands/businessblueprint/logo-text.png" alt="businessblueprint.io" style="height: 28px; margin-bottom: 8px;" />
        <p style="margin: 8px 0 0 0; font-size: 14px; font-family: Copperplate, 'Copperplate Gothic', serif;">Your Partner in Local Business Growth</p>
        <p style="margin-top: 16px; font-size: 11px; opacity: 0.6; font-family: Copperplate, 'Copperplate Gothic', serif;">a product of</p>
        <img src="https://cdn.triadblue.com/brands/triadblue/logo-lockup.png" alt="TRIADBLUE.COM" style="height: 20px; margin-top: 4px;" />
        <p style="margin-top: 16px; font-size: 12px; opacity: 0.7; font-family: Copperplate, 'Copperplate Gothic', serif;">&copy; 2026 TRIADBLUE Inc.</p>
        <p style="margin-top: 12px; font-size: 11px; color: #666; line-height: 1.5; font-family: Copperplate, 'Copperplate Gothic', serif;">
          You are receiving this email because you completed a Digital IQ Assessment on businessblueprint.io.<br>
          <a href="${base}/unsubscribe" style="color: #09080E; text-decoration: underline;">Unsubscribe</a> | <a href="${base}/privacy" style="color: #09080E; text-decoration: underline;">Privacy Policy</a> | <a href="${base}/terms" style="color: #09080E; text-decoration: underline;">Terms of Service</a>
        </p>
      </div>

    </div>
  </div>
</body>
</html>`;
}

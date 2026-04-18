import { writeFileSync } from 'fs';
import { generateAssessmentConfirmationHTML } from '../server/services/assessment-emails';

const html = generateAssessmentConfirmationHTML({
  id: 12345,
  firstName: 'Dean',
  lastName: 'Laskowski',
  email: 'dean@triadblue.com',
  businessName: 'TRIADBLUE Inc.',
  industry: 'Software / SaaS',
} as any);

const out = '/tmp/assessment-email-preview.html';
writeFileSync(out, html);
console.log(`Wrote ${out}`);

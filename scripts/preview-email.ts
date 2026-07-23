import { writeFileSync } from 'fs';
import { generateAssessmentConfirmationHTML } from '../server/services/assessment-emails';
import {
  generateEmail1_MeetCoachBlue,
  generateEmail2_DigitalIQ,
  generateEmail3_Prescription,
  generateEmail4_PathForward,
  generateEmail5_Toolkit,
  generateEmail6_FirstMove,
} from '../server/services/onboarding-emails';

const publicDir = `file://${process.cwd()}/client/public`;

process.env.FRONTEND_URL = publicDir;

const emailId = process.argv[2] || '1';

const generators: Record<string, () => string> = {
  assessment: () => generateAssessmentConfirmationHTML({
    id: 12345, firstName: 'Dean', lastName: 'Laskowski',
    email: 'dean@triadblue.com', businessName: 'TRIADBLUE Inc.', industry: 'Software / SaaS',
  } as any),
  '1': () => generateEmail1_MeetCoachBlue({ businessName: 'hostsblue.com', assessmentId: 12345 }),
  '2': () => generateEmail2_DigitalIQ({ businessName: 'hostsblue.com', assessmentId: 12345 }),
  '3': () => generateEmail3_Prescription({ businessName: 'hostsblue.com' }),
  '4': () => generateEmail4_PathForward({ businessName: 'hostsblue.com' }),
  '5': () => generateEmail5_Toolkit({ businessName: 'hostsblue.com' }),
  '6': () => generateEmail6_FirstMove({ businessName: 'hostsblue.com' }),
};

const gen = generators[emailId];
if (!gen) {
  console.error(`Unknown email: ${emailId}. Use: assessment, 1, 2, 3, 4, 5, 6`);
  process.exit(1);
}

const html = gen();
const out = '/tmp/email-preview.html';
writeFileSync(out, html);
console.log(`Wrote ${out} (email: ${emailId})`);

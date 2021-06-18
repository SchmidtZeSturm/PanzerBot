import { config } from 'dotenv';
import yn from 'yn';

const debugMode = yn(process.env.DEBUG);

export const result = config({ debug: debugMode });

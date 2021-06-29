import { config, DotenvConfigOutput } from 'dotenv';
import yn from 'yn';

const debugMode = yn(process.env.DEBUG);

type Result = null | DotenvConfigOutput;

const env = (): Result => {
  try {
    return config({ debug: debugMode });
  } catch(e) {
    return null;
  }
}

export const result = env();

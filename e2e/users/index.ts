import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../../.env.local') });

const getNickname = (email: string) =>
  email ? email.substring(0, email.indexOf('@')) : '';

const email1 = process.env.EMAIL_1 || '';
const password1 = process.env.PASSWORD_1 || '';
//const nickname1 = process.env.NICKNAME_1 || '';
const nickname1 = getNickname(email1);

const email2 = process.env.EMAIL_2 || '';
const password2 = process.env.PASSWORD_2 || '';
const nickname2 = getNickname(email2);
//const nickname2 = process.env.NICKNAME_2 || '';

export { email1, password1, nickname1, email2, password2, nickname2 };

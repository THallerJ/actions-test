import { chromium } from '@playwright/test';
import { email1, password1, email2, password2 } from './users';
import { PageFactory } from './pages/page_factory';

const authenticate = async (
  email: string,
  password: string,
  filename: string
) => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  const login = await PageFactory.createLogin(page);

  await login.fillLoginForm(email, password);
  await login.submitForm(filename);

  await browser.close();
};

const globalSetup = async () => {
  await authenticate(email1, password1, 'auth1.json');
  await authenticate(email2, password2, 'auth2.json');
};

export default globalSetup;

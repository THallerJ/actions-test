import { type Page } from '@playwright/test';
import { PageBase } from '../page_base/page_base';

export class Login extends PageBase {
  constructor(page: Page) {
    super(page, 'http://localhost:3000/api/auth/login');
  }

  async useUsernameEmail() {
    const notYourAccount = this.page.getByText('Not your account?');

    if (await notYourAccount.isVisible()) {
      await notYourAccount.click();
    }
  }

  async fillLoginForm(username: string, password: string) {
    await this.useUsernameEmail();
    await this.page
      .getByPlaceholder('username/email')
      .fill('thaller60@yahoo.com');
    await this.page.getByPlaceholder('your password').fill('Tjh3605@');
  }

  async submitForm(filename: string) {
    await this.page.getByRole('button').click();
    await this.storeAuth(filename);
  }

  async storeAuth(filename: string) {
    await this.page.waitForURL('http://localhost:3000');
    await this.page
      .context()
      .storageState({ path: `./e2e/storage/${filename}` });
  }
}

import { type Page } from '@playwright/test';
import { PageBase } from './page_base';

export class PageNavDesktop extends PageBase {
  constructor(page: Page, initialUrl: string) {
    super(page, initialUrl);
  }

  async clickViewTabs() {
    await this.page.getByRole('link', { name: 'View Tabs' }).first().click();
  }

  async clickCreateTab() {
    await this.page.getByRole('link', { name: 'Create Tab' }).first().click();
  }

  async clickMyTabs() {
    await this.page.getByRole('link', { name: 'My Tabs' }).first().click();
  }

  async clickLogo() {
    await this.page.getByRole('link', { name: 'Guitar Tabs' }).first().click();
  }

  async clickLogin() {
    await this.page.getByRole('link', { name: 'Login' }).first().click();
  }

  async clickSignUp() {
    await this.page.getByRole('link', { name: 'Sign Up' }).first().click();
  }
}

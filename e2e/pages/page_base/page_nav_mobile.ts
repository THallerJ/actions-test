import { type Page } from '@playwright/test';
import { PageNavDesktop } from './page_nav_desktop';

export class PageNavMobile extends PageNavDesktop {
  constructor(page: Page, initialUrl: string) {
    super(page, initialUrl);
  }

  async clickMenu() {
    await this.page.getByRole('button', { name: 'menu' }).click();
  }
}

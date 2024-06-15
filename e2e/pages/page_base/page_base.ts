import { type Page } from '@playwright/test';
import { height, width } from '../../constants';

export class PageBase {
  readonly page: Page;
  readonly initialUrl: string;

  constructor(page: Page, initialUrl: string) {
    this.page = page;
    this.initialUrl = initialUrl;
  }

  async goto() {
    await this.page.goto(this.initialUrl, { waitUntil: 'commit' });
  }

  didRedirect() {
    return this.page.url() !== this.initialUrl;
  }

  async setMobile() {
    await this.page.setViewportSize({ width, height });
  }
}

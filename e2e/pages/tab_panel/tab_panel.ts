import { type Page } from '@playwright/test';

export class TabPanel {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  getRight(song: String) {
    return this.page.locator(`div:right-of(:text("${song}"))`).first();
  }

  async deleteTab(song: string) {
    await this.getRight(song).getByText('Delete').first().click();
    await this.page.getByText('Yes').click();
  }

  getPrivate(song: string) {
    return this.page
      .locator(`span:above(:text("${song}"))`)
      .first()
      .getByText('Private');
  }

  getCreatedBy(song: string) {
    return this.page.locator(`span:right-of(:text("${song}"))`).first();
  }

  async clickRefresh() {
    await this.page.getByRole('button', { name: 'Refresh' }).click();
  }
}

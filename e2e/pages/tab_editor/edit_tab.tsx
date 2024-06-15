import { type Page } from '@playwright/test';

export class EditTab {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async fillNote(note: number, str: number, fret: string) {
    await this.page.locator(`#note_${note}_str_${str}`).click();
    await this.page.locator(`#input_note_${note}_str_${str}`).fill(fret);
    await this.page.keyboard.down('Enter');
  }

  async fillForm(song: string, artist: string, isPrivate: boolean) {
    await this.page.getByLabel('Song Title').fill(song);
    await this.page.getByLabel('Artist Name').fill(artist);
    if (isPrivate) await this.page.getByRole('checkbox').check();
  }

  async submitForm() {
    await this.page.getByRole('button', { name: 'Save' }).click();
    await this.page.waitForResponse(resp => resp.url().includes('/tab_editor'));
  }

  getNote(note: number, str: number) {
    const res = this.page.locator(`#note_${note}_str_${str}`);
    return res;
  }

  async addStaff() {
    await this.page.getByText('Add Staff').click();
  }

  async deleteStaff() {
    await this.page.getByText('Delete Staff').click();
  }

  async clear() {
    await this.page.getByText('Clear').click();
  }

  async confirm() {
    await this.page.getByText('Yes').click();
  }

  async clickEdit() {
    await this.page.getByText('Edit').click();
  }
}

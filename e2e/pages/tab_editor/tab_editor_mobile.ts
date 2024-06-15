import { type Page } from '@playwright/test';
import { PageNavMobile } from '../page_base/page_nav_mobile';
import { EditTab } from './edit_tab';

export class TabEditorMobile extends PageNavMobile {
  readonly editor: EditTab;

  constructor(page: Page) {
    super(page, 'http://localhost:3000/tab_editor');
    this.editor = new EditTab(page);
  }

  async toggleForm() {
    await this.page.getByText('Submit Tab').click();
  }
}

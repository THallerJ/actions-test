import { type Page } from '@playwright/test';
import { PageNavDesktop } from '../page_base/page_nav_desktop';
import { EditTab } from './edit_tab';

export class TabEditor extends PageNavDesktop {
  readonly editor: EditTab;

  constructor(page: Page) {
    super(page, 'http://localhost:3000/tab_editor');
    this.editor = new EditTab(page);
  }
}

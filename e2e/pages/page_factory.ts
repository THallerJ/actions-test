import { Page } from '@playwright/test';
import {
  Home,
  Login,
  MyTabs,
  TabEditor,
  HomeMobile,
  MyTabsMobile,
  TabEditorMobile,
} from '.';
import { PageBase } from './page_base/page_base';
import { width, height } from '../constants';

export class PageFactory {
  static async createLogin(page: Page) {
    const p = new Login(page);
    return (await this.setup(p)) as Login;
  }

  static async createHome(page: Page) {
    const p = new Home(page);
    return (await this.setup(p)) as Home;
  }

  static async createHomeMobile(page: Page) {
    const p = new HomeMobile(page);
    return (await this.setup(p, true)) as HomeMobile;
  }

  static async createTabEditor(page: Page) {
    const p = new TabEditor(page);
    return (await this.setup(p)) as TabEditor;
  }

  static async createTabEditorMobile(page: Page) {
    const p = new TabEditorMobile(page);
    return (await this.setup(p, true)) as TabEditorMobile;
  }

  static async createMyTabs(page: Page) {
    const p = new MyTabs(page);
    return (await this.setup(p)) as MyTabs;
  }

  static async createMyTabsMobile(page: Page) {
    const p = new MyTabsMobile(page);
    return (await this.setup(p, true)) as MyTabsMobile;
  }

  private static async setup(p: PageBase, isMobile?: boolean) {
    if (isMobile) await p.page.setViewportSize({ width, height });
    await p.goto();
    return p;
  }
}

import { test as base } from '@playwright/test';
import { NoAuthFixtures } from './common/fixture_types.type';
import * as fn from './common/fixture_functions';
import { PageFactory } from '../pages';

const test = base.extend<NoAuthFixtures>({
  // storageState: { cookies: [], origins: [] },
  login: async ({ page }, use) => {
    const loginPage = await PageFactory.createLogin(page);
    await use(loginPage);
  },
  homeNoAuth: async ({ page }, use) => {
    await fn.homeFn({ use, page });
  },
  homeMobileNoAuth: async ({ page }, use) => {
    await fn.homeMobileFn({ use, page });
  },
  myTabsNoAuth: async ({ page }, use) => {
    await fn.myTabsFn({ use, page });
  },
  myTabsMobileNoAuth: async ({ page }, use) => {
    await fn.myTabsMobileFn({ use, page });
  },
  tabEditorNoAuth: async ({ page }, use) => {
    await fn.tabEditorFn({ use, page });
  },
  tabEditorMobileNoAuth: async ({ page }, use) => {
    await fn.tabEditorMobileFn({ use, page });
  },
});

export { test };

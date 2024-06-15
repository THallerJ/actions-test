import { test as base } from '@playwright/test';
import { Auth2Fixtures } from './common/fixture_types.type';
import * as fn from './common/fixture_functions';
import { PATH_AUTH2 } from '../constants';

const test = base.extend<Auth2Fixtures>({
  homeAlt: async ({ browser }, use) => {
    await fn.homeFn({ use, browser, filepath: PATH_AUTH2 });
  },
  homeMobileAlt: async ({ browser }, use) => {
    await fn.homeMobileFn({ use, browser, filepath: PATH_AUTH2 });
  },
  myTabsAlt: async ({ browser }, use) => {
    await fn.myTabsFn({ use, browser, filepath: PATH_AUTH2 });
  },
  myTabsMobileAlt: async ({ browser }, use) => {
    await fn.myTabsMobileFn({ use, browser, filepath: PATH_AUTH2 });
  },
  tabEditorAlt: async ({ browser }, use) => {
    await fn.tabEditorFn({ use, browser, filepath: PATH_AUTH2 });
  },
  tabEditorMobileAlt: async ({ browser }, use) => {
    await fn.tabEditorMobileFn({ use, browser, filepath: PATH_AUTH2 });
  },
});

export { test };

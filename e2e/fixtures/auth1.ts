import { test as base } from '@playwright/test';
import { Auth1Fixtures } from './common/fixture_types.type';
import * as fn from './common/fixture_functions';
import { PATH_AUTH1 } from '../constants';

const test = base.extend<Auth1Fixtures>({
  home: async ({ browser }, use) => {
    await fn.homeFn({ use, browser, filepath: PATH_AUTH1 });
  },
  homeMobile: async ({ browser }, use) => {
    await fn.homeMobileFn({ use, browser, filepath: PATH_AUTH1 });
  },
  myTabs: async ({ browser }, use) => {
    await fn.myTabsFn({ use, browser, filepath: PATH_AUTH1 });
  },
  myTabsMobile: async ({ browser }, use) => {
    await fn.myTabsMobileFn({ use, browser, filepath: PATH_AUTH1 });
  },
  tabEditor: async ({ browser }, use) => {
    await fn.tabEditorFn({ use, browser, filepath: PATH_AUTH1 });
  },
  tabEditorMobile: async ({ browser }, use) => {
    await fn.tabEditorMobileFn({ use, browser, filepath: PATH_AUTH1 });
  },
});

export { test };

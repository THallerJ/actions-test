import { Page, expect, Browser } from '@playwright/test';
import {
  Home,
  HomeMobile,
  MyTabs,
  MyTabsMobile,
  PageFactory,
  TabEditor,
  TabEditorMobile,
} from '../../pages';

const homeFn = async ({ use, page, browser, filepath }: Params<Home>) => {
  const p = await buildPage({ browser, page, filepath });
  const pom = await PageFactory.createHome(p);
  if (filepath) await waitAuth(p);
  await use(pom);
};

const homeMobileFn = async ({
  use,
  page,
  browser,
  filepath,
}: Params<HomeMobile>) => {
  const p = await buildPage({ browser, page, filepath });
  const pom = await PageFactory.createHomeMobile(p);
  if (filepath) await waitAuth(p);
  await use(pom);
};

const tabEditorFn = async ({
  use,
  page,
  browser,
  filepath,
}: Params<TabEditor>) => {
  const p = await buildPage({ browser, page, filepath });
  const pom = await PageFactory.createTabEditor(p);
  if (filepath) await waitAuth(p);
  await use(pom);
};

const tabEditorMobileFn = async ({
  use,
  page,
  browser,
  filepath,
}: Params<TabEditorMobile>) => {
  const p = await buildPage({ browser, page, filepath });
  const pom = await PageFactory.createTabEditorMobile(p);
  if (filepath) await waitAuth(p);
  await use(pom);
};

const myTabsFn = async ({ use, page, browser, filepath }: Params<MyTabs>) => {
  const p = await buildPage({ browser, page, filepath });
  const pom = await PageFactory.createMyTabs(p);
  if (filepath) await waitAuth(p);
  await use(pom);
};

const myTabsMobileFn = async ({
  use,
  page,
  browser,
  filepath,
}: Params<MyTabsMobile>) => {
  const p = await buildPage({ browser, page, filepath });
  const pom = await PageFactory.createMyTabsMobile(p);
  if (filepath) await waitAuth(p);
  await use(pom);
};

const buildPage = async ({ browser, page, filepath }: buildPageParams) => {
  let p;

  if (page) p = page;
  else if (browser && filepath) {
    const context = await browser.newContext({ storageState: filepath });
    p = await context.newPage();
  } else {
    throw Error('invalid parameters');
  }

  return p;
};

const waitAuth = async (page: Page) => {
  await page.getByText('Logout').first().isEnabled();
};

type buildPageParams = {
  browser?: Browser;
  page?: Page;
  filepath?: string;
};

type Params<T> = {
  use: (r: T) => Promise<void>;
  page?: Page;
  browser?: Browser;
  filepath?: string;
};

export {
  homeFn,
  homeMobileFn,
  tabEditorFn,
  tabEditorMobileFn,
  myTabsFn,
  myTabsMobileFn,
};

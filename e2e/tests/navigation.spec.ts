import { test, expect } from '../fixtures';

test.describe('links navigate to correct page', () => {
  test('navigate to tab editor', async ({ home }) => {
    test.slow();

    await home.clickCreateTab();
    await home.page.waitForURL('http://localhost:3000/tab_editor');
    expect(home.page.url()).toBe('http://localhost:3000/tab_editor');
  });

  test('navigate to tab editor on mobile', async ({ homeMobile }) => {
    test.slow();

    await homeMobile.clickMenu();
    await homeMobile.clickCreateTab();
    await homeMobile.page.waitForURL('http://localhost:3000/tab_editor');
    expect(homeMobile.page.url()).toBe('http://localhost:3000/tab_editor');
  });

  test('navigate to my tabs', async ({ home }) => {
    test.slow();

    await home.clickMyTabs();
    await home.page.waitForURL('http://localhost:3000/my_tabs');
    expect(home.page.url()).toBe('http://localhost:3000/my_tabs');
  });

  test('navigate to my tabs on mobile', async ({ homeMobile }) => {
    test.slow();

    await homeMobile.clickMenu();
    await homeMobile.clickMyTabs();
    await homeMobile.page.waitForURL('http://localhost:3000/my_tabs');
    expect(homeMobile.page.url()).toBe('http://localhost:3000/jsalkdaslk');
  });

  test('navigate to all tabs', async ({ myTabs }) => {
    test.slow();

    await myTabs.clickViewTabs();
    await myTabs.page.waitForURL('http://localhost:3000/my_tabs');
    expect(myTabs.page.url()).toBe('http://localhost:3000/my_tabs');
  });

  test('navigate to all tabs on mobile', async ({ myTabsMobile }) => {
    test.slow();

    await myTabsMobile.clickMenu();
    await myTabsMobile.clickViewTabs();
    await myTabsMobile.page.waitForURL('http://localhost:3000/my_tabs');
    expect(myTabsMobile.page.url()).toBe('http://localhost:3000/my_tabs');
  });

  test('navigate home page', async ({ myTabs }) => {
    test.slow();

    await myTabs.clickLogo();
    await myTabs.page.waitForURL('http://localhost:3000/');
    expect(myTabs.page.url()).toBe('http://localhost:3000/');
  });
});

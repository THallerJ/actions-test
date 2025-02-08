import { test, expect } from '../fixtures';
import { nickname1 } from '../users';
/*
test.describe('handle multiple users', () => {
  test('view and edit tab created by other user', async ({
    tabEditor,
    myTabsAlt,
    browserName,
    myTabs,
    homeAlt,
  }) => {
    test.slow();

    const song = `${browserName}: other user tab`;
    const artist = `${browserName}: other user aritst`;

    await tabEditor.editor.fillForm(song, artist, false);
    await tabEditor.editor.submitForm();

    await myTabs.panel.clickRefresh();
    await expect(myTabs.page.getByText(song)).toBeVisible();
    await expect(myTabs.page.getByText(artist)).toBeVisible();
    await expect(myTabs.panel.getCreatedBy(song)).toHaveText(
      `created by: ${nickname1}`
    );

    await myTabsAlt.panel.clickRefresh();
    await expect(myTabsAlt.page.getByText(song)).not.toBeVisible();
    await expect(myTabsAlt.page.getByText(artist)).not.toBeVisible();

    await homeAlt.panel.clickRefresh();
    await expect(homeAlt.page.getByText(song)).toBeVisible();
    await expect(homeAlt.page.getByText(artist)).toBeVisible();
    await expect(homeAlt.panel.getCreatedBy(song)).toHaveText(
      `created by: ${nickname1}`
    );

    await expect(homeAlt.panel.getRight(song)).not.toHaveText('Delete');

    await myTabs.panel.deleteTab(song);
  });

  test('view and edit private tab created by other user', async ({
    tabEditor,
    homeAlt,
    browserName,
    home,
    myTabs,
    myTabsAlt,
  }) => {
    test.slow();

    const song = `${browserName}:oups`;
    const artist = `${browserName}:ospa`;

    await tabEditor.editor.fillForm(song, artist, true);
    await tabEditor.editor.submitForm();

    await home.panel.clickRefresh();
    await expect(home.page.getByText(song)).toBeVisible();
    await expect(home.page.getByText(artist)).toBeVisible();
    await expect(home.panel.getPrivate(song)).not.toBeEmpty();
    await expect(home.panel.getCreatedBy(song)).toHaveText(
      `created by: ${nickname1}`
    );

    await myTabs.panel.clickRefresh();
    await expect(myTabs.page.getByText(song)).toBeVisible();
    await expect(myTabs.page.getByText(artist)).toBeVisible();
    await expect(myTabs.panel.getCreatedBy(song)).toHaveText(
      `created by: ${nickname1}`
    );

    await homeAlt.panel.clickRefresh();
    await expect(homeAlt.page.getByText(song)).not.toBeVisible();
    await expect(homeAlt.page.getByText(artist)).not.toBeVisible();

    await myTabsAlt.panel.clickRefresh();
    await expect(myTabsAlt.page.getByText(song)).not.toBeVisible();
    await expect(myTabsAlt.page.getByText(artist)).not.toBeVisible();

    await myTabs.panel.deleteTab(song);
  });
});
*/

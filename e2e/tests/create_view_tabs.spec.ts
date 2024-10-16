import { Page } from '@playwright/test';
import { test, expect } from '../fixtures';
import { Home } from '../pages';
import { nickname1 } from '../users';

test.describe('create, view, edit, and delete tabs', () => {
  test('desktop: create tab', async ({ tabEditor, browserName }) => {
    test.slow();

    const song = `${browserName}:dcts`;
    const artist = `${browserName}:dcta`;

    await tabEditor.editor.fillForm(song, artist, false);

    await tabEditor.editor.fillNote(0, 0, '14');
    await tabEditor.editor.submitForm();

    await expect(tabEditor.page.getByText('Tab saved!')).toBeVisible();
    await saveTabRedirect(tabEditor.page);

    await tabEditor.clickViewTabs();
    const home = new Home(tabEditor.page);

    await expect(home.page.getByText(song)).toBeVisible();
    await expect(home.page.getByText(artist)).toBeVisible();
    await expect(home.panel.getCreatedBy(song)).toHaveText(
      `created by: ${nickname1}`
    );

    await home.page.getByText(song).click();
    await expect(tabEditor.editor.getNote(0, 0).getByText('14')).toBeVisible();
    await expect(tabEditor.page.getByText(song).first()).toBeVisible();
    await expect(tabEditor.page.getByText(artist).first()).toBeVisible();

    await tabEditor.editor.clickEdit();

    await expect(tabEditor.page.getByText('Clear')).toBeVisible();
    await expect(tabEditor.editor.getNote(0, 0).getByText('14')).toBeVisible();

    await home.clickViewTabs();
    await home.panel.deleteTab(song);

    await expect(home.page.getByText(song)).not.toBeVisible();
    await expect(home.page.getByText(artist)).not.toBeVisible();
  });

  test('mobile: create tab', async ({ tabEditorMobile, browserName }) => {
    test.slow();

    const song = `${browserName}:mcts`;
    const artist = `${browserName}:mcta`;

    await tabEditorMobile.editor.fillNote(0, 0, '14');
    await tabEditorMobile.toggleForm();
    await tabEditorMobile.editor.fillForm(song, artist, false);
    await tabEditorMobile.editor.submitForm();

    await expect(tabEditorMobile.page.getByText('Tab saved!')).toBeVisible();
    await saveTabRedirect(tabEditorMobile.page);

    await tabEditorMobile.clickMenu();
    await tabEditorMobile.clickViewTabs();
    const homeMobile = new Home(tabEditorMobile.page);

    await expect(homeMobile.page.getByText(song)).toBeVisible();
    await expect(homeMobile.page.getByText(artist)).toBeVisible();
    await expect(homeMobile.panel.getCreatedBy(song)).toHaveText(
      `created by: ${nickname1}`
    );

    await homeMobile.page.getByText(song).click();
    await tabEditorMobile.editor.clickEdit();

    await tabEditorMobile.toggleForm();
    await expect(
      tabEditorMobile.editor.getNote(0, 0).getByText('14')
    ).toBeVisible();
    await expect(tabEditorMobile.page.getByText(song)).toBeVisible();
    await expect(tabEditorMobile.page.getByText(artist)).toBeVisible();

    await tabEditorMobile.clickMenu();
    await tabEditorMobile.clickViewTabs();
    await homeMobile.panel.deleteTab(song);

    await expect(homeMobile.page.getByText(song)).not.toBeVisible();
    await expect(homeMobile.page.getByText(artist)).not.toBeVisible();
  });
});

const saveTabRedirect = async (page: Page) => {
  await expect(page).toHaveURL(
    new RegExp('http://localhost:3000/tab_editor/[0-9+]')
  );
};

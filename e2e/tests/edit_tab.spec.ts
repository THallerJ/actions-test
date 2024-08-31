import { test as test, expect } from '../fixtures';

test.describe('add and update notes', () => {
  test('add notes', async ({ tabEditor }) => {
    await tabEditor.editor.fillNote(0, 0, '14');
    await tabEditor.editor.fillNote(19, 5, '2');

    await expect(tabEditor.editor.getNote(0, 0).getByText('14')).toBeVisible();
    await expect(tabEditor.editor.getNote(19, 5).getByText('2')).toBeVisible();
  });

  test('update notes', async ({ tabEditor }) => {
    await tabEditor.editor.fillNote(0, 0, '14');
    await expect(tabEditor.editor.getNote(0, 0).getByText('14')).toBeVisible();

    await tabEditor.editor.fillNote(0, 0, '2');
    await expect(tabEditor.editor.getNote(0, 0).getByText('2')).toBeVisible();
    await expect(
      tabEditor.editor.getNote(0, 0).getByText('14')
    ).not.toBeVisible();
  });

  test('clear notes', async ({ tabEditor }) => {
    await tabEditor.editor.fillNote(0, 0, '14');
    await tabEditor.editor.fillNote(19, 5, '2');

    await expect(tabEditor.editor.getNote(0, 0).getByText('14')).toBeVisible();
    await expect(tabEditor.editor.getNote(19, 5).getByText('2')).toBeVisible();

    await tabEditor.editor.clear();
    await tabEditor.editor.confirm();

    await expect(
      tabEditor.editor.getNote(0, 0).getByText('14')
    ).not.toBeVisible();
    await expect(
      tabEditor.editor.getNote(19, 5).getByText('2')
    ).not.toBeVisible();
  });
});

test.describe('update staff', async () => {
  test('add staff', async ({ tabEditor }) => {
    await tabEditor.editor.addStaff();
    await expect(tabEditor.editor.getNote(79, 0)).toBeVisible();
    await expect(tabEditor.editor.getNote(80, 0)).not.toBeVisible();

    await tabEditor.editor.addStaff();
    await tabEditor.editor.addStaff();
    await expect(tabEditor.editor.getNote(159, 0)).toBeVisible();
    await expect(tabEditor.editor.getNote(160, 0)).not.toBeVisible();
  });

  test('delete staff', async ({ tabEditor }) => {
    await tabEditor.editor.addStaff();
    await tabEditor.editor.addStaff();

    await tabEditor.editor.deleteStaff();
    await tabEditor.editor.confirm();

    await expect(tabEditor.editor.getNote(79, 0)).toBeVisible();
    await expect(tabEditor.editor.getNote(80, 0)).not.toBeVisible();

    await tabEditor.editor.deleteStaff();
    await tabEditor.editor.confirm();

    await expect(tabEditor.editor.getNote(39, 0)).toBeVisible();
    await expect(tabEditor.editor.getNote(40, 0)).not.toBeVisible();

    await tabEditor.editor.deleteStaff();
    await expect(tabEditor.page.getByText('Yes')).not.toBeVisible();
  });

  test('clear staff', async ({ tabEditor }) => {
    await tabEditor.editor.addStaff();
    await tabEditor.editor.addStaff();

    await expect(tabEditor.editor.getNote(119, 0)).toBeVisible();
    await expect(tabEditor.editor.getNote(120, 0)).not.toBeVisible();

    await tabEditor.editor.clear();
    await tabEditor.editor.confirm();

    await expect(tabEditor.editor.getNote(39, 0)).toBeVisible();
    await expect(tabEditor.editor.getNote(40, 0)).not.toBeVisible();
  });
});

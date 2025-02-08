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
    await expect(tabEditor.editor.getNote(0, 0).getByText('13')).toBeVisible();

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

test.describe('arrow key navigation', async () => {
  test('save notes with arrow keys', async ({ tabEditor }) => {
    await tabEditor.editor.fillNoteNoAction(10, 2, '14');
    await tabEditor.page.keyboard.down('ArrowDown');
    await tabEditor.editor.fillNoteFocused('1');
    await tabEditor.page.keyboard.down('ArrowLeft');
    await tabEditor.page.keyboard.down('ArrowLeft');
    await tabEditor.editor.fillNoteFocused('9');
    await tabEditor.page.keyboard.down('ArrowRight');
    await tabEditor.editor.fillNoteFocused('7');
    await tabEditor.page.keyboard.down('ArrowUp');
    await tabEditor.editor.fillNoteFocused('12');
    await tabEditor.page.keyboard.down('Escape');

    await expect(tabEditor.editor.getNote(10, 2).getByText('14')).toBeVisible();
    await expect(tabEditor.editor.getNote(10, 3).getByText('1')).toBeVisible();
    await expect(tabEditor.editor.getNote(8, 3).getByText('9')).toBeVisible();
    await expect(tabEditor.editor.getNote(9, 3).getByText('7')).toBeVisible();
    await expect(tabEditor.editor.getNote(9, 2).getByText('12')).toBeVisible();
  });

  test('arrow key boundary test', async ({ tabEditor }) => {
    await tabEditor.editor.fillNoteNoAction(39, 3, '1');
    for (let i = 0; i < 3; i++) tabEditor.page.keyboard.down('ArrowRight');
    await tabEditor.editor.fillNoteFocused('5');

    await tabEditor.editor.fillNoteNoAction(0, 3, '2');
    for (let i = 0; i < 3; i++) tabEditor.page.keyboard.down('ArrowLeft');
    await tabEditor.editor.fillNoteFocused('6');

    await tabEditor.editor.fillNoteNoAction(20, 5, '3');
    for (let i = 0; i < 3; i++) tabEditor.page.keyboard.down('ArrowDown');
    await tabEditor.editor.fillNoteFocused('7');

    await tabEditor.editor.fillNoteNoAction(20, 0, '4');
    for (let i = 0; i < 3; i++) tabEditor.page.keyboard.down('ArrowUp');
    await tabEditor.editor.fillNoteFocused('8');
    await tabEditor.page.keyboard.down('Escape');

    await expect(tabEditor.editor.getNote(39, 3).getByText('5')).toBeVisible();
    await expect(tabEditor.editor.getNote(0, 3).getByText('6')).toBeVisible();
    await expect(tabEditor.editor.getNote(20, 5).getByText('7')).toBeVisible();
    await expect(tabEditor.editor.getNote(20, 0).getByText('8')).toBeVisible();
  });
});

test('show tutorial', async ({ tabEditor }) => {
  await tabEditor.clickTutorial();
  await expect(tabEditor.page.getByText('Tutorial')).toBeVisible();
  await expect(
    tabEditor.page.getByText('Save note by typing the note')
  ).toBeVisible();
  await tabEditor.closeTutorial();
  await expect(tabEditor.page.getByText('Tutorial')).not.toBeVisible();
});

import { test, expect } from '../fixtures';
import { exec } from 'child_process';
import path from 'path';

const clearDatabase = () => {
  /*
  const filePath = path.join(
    __dirname,
    '..',
    '..',
    'postgres_scripts',
    'clear_test_db',
    'clear_test_db'
  );

  exec(`start ${filePath}${process.platform === 'win32' ? '.bat' : '.sh'}`); */
};

test.beforeAll(() => {
  clearDatabase();
});

test('setup', async ({ homeNoAuth }) => {
  await expect(
    homeNoAuth.page.getByText(
      'There are no tabs here. Click here to create a tabasda.'
    )
  ).toBeVisible();
});

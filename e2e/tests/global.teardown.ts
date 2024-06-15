import { test, expect } from '../fixtures';

test('teardown', async ({ homeNoAuth }) => {
  await expect(
    homeNoAuth.page.getByText(
      'There are no tabs here. Click here to create a tab.'
    )
  ).toBeVisible();
});

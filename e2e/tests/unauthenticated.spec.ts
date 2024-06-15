import { test, expect } from '../fixtures';

test.describe('check that protected pages redirect  when not authenticated', () => {
  test('navigate to my tabs', async ({ myTabsNoAuth }) => {
    expect(myTabsNoAuth.didRedirect()).toBe(true);
  });

  test('navigate to tab editor', async ({ tabEditorNoAuth }) => {
    expect(tabEditorNoAuth.didRedirect()).toBe(true);
  });
});

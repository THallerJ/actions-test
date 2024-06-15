import { test, expect } from '../fixtures';

test.describe('check protected pages do not redirect when authenticated', () => {
  test('navigate to my tabs', async ({ myTabs }) => {
    expect(myTabs.didRedirect()).toBe(false);
  });

  test('navigate to tab editor', async ({ tabEditor }) => {
    expect(tabEditor.didRedirect()).toBe(false);
  });
});

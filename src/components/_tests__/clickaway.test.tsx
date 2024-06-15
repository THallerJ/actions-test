import { describe, expect, it, vi } from 'vitest';
import ClickAway from '../ClickAway';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('clickaway component', () => {
  it('triggers callback', async () => {
    const { getByTestId } = render(<MockComponent />);

    expect(cb.mock.calls.length).toBe(0);
    await userEvent.click(getByTestId('inner'));
    expect(cb.mock.calls.length).toBe(0);
    await userEvent.click(getByTestId('outer'));
    expect(cb.mock.calls.length).toBe(1);
    await userEvent.click(getByTestId('inner'));
    expect(cb.mock.calls.length).toBe(1);
    await userEvent.click(getByTestId('outer'));
    expect(cb.mock.calls.length).toBe(2);
    await userEvent.click(getByTestId('outer'));
    expect(cb.mock.calls.length).toBe(3);
  });
});

const cb = vi.fn();

const MockComponent = () => (
  <div>
    <h1 data-testid="outer">outer</h1>
    <ClickAway callback={cb}>
      <div data-testid="inner">inner</div>
    </ClickAway>
  </div>
);

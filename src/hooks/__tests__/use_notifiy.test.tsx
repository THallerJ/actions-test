import { describe, expect, it, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import useNotify from '../useNotify';

describe('useNotify hook', () => {
  it('timer', async () => {
    vi.useFakeTimers();
    const { result, rerender } = renderHook(() => useNotify(1500));

    expect(result.current[0]).toBe(false);

    act(() => result.current[1]());
    expect(result.current[0]).toBe(true);

    act(() => vi.advanceTimersByTime(1499));

    rerender();
    expect(result.current[0]).toBe(true);

    act(() => vi.advanceTimersByTime(1500));

    rerender();
    expect(result.current[0]).toBe(false);
    vi.clearAllTimers();
  });

  it('cancel', () => {
    vi.useFakeTimers();
    const { result, rerender } = renderHook(() => useNotify(1500));

    expect(result.current[0]).toBe(false);
    act(() => result.current[1]());
    expect(result.current[0]).toBe(true);

    act(() => vi.advanceTimersByTime(1499));
    rerender();
    expect(result.current[0]).toBe(true);

    act(() => result.current[2]());
    rerender();
    expect(result.current[0]).toBe(false);
  });
});

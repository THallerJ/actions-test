import { expect, it } from 'vitest';
import { renderHook } from '@testing-library/react';
import useAnimationCss from '../useAnimationCss';

it('useAnimatitonCss', () => {
  const { result, rerender } = renderHook(
    ({ toggled, foreward, reverse, defaultStyle }: hookProps) =>
      useAnimationCss(toggled, foreward, reverse, defaultStyle),
    {
      initialProps,
    }
  );

  expect(result.current).toBe('default');
  rerender({ ...initialProps, toggled: true });
  expect(result.current).toBe('foreward');
  rerender({ ...initialProps, toggled: false });
  expect(result.current).toBe('reverse');
});

type hookProps = {
  toggled: boolean;
  foreward: string;
  reverse: string;
  defaultStyle: string;
};

const initialProps: hookProps = {
  toggled: false,
  foreward: 'foreward',
  reverse: 'reverse',
  defaultStyle: 'default',
};

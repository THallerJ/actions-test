import { beforeEach, describe, expect, it } from 'vitest';
import ConditionalHandler from '../ConditionalHandler';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';

let condition = true;
let fallback: React.ReactNode | undefined = undefined;

beforeEach(() => {
  condition = true;
  fallback = undefined;
});

describe('conditional handler', () => {
  it('render children', () => {
    const { getByText, queryByText, rerender } = render(<MockHandler />);
    expect(getByText('children')).toBeInTheDocument();

    condition = false;
    rerender(<MockHandler />);
    expect(queryByText('children')).not.toBeInTheDocument();

    fallback = <div>fallback</div>;
    condition = true;
    rerender(<MockHandler />);
    expect(getByText('children')).toBeInTheDocument();
    expect(queryByText('fallback')).not.toBeInTheDocument();
  });

  it('render fallback', () => {
    condition = false;
    fallback = undefined;
    const { getByText, queryByText, rerender } = render(<MockHandler />);

    expect(queryByText('children')).not.toBeInTheDocument();
    expect(queryByText('fallback')).not.toBeInTheDocument();

    fallback = <div>fallback</div>;
    rerender(<MockHandler />);

    expect(queryByText('children')).not.toBeInTheDocument();
    expect(getByText('fallback')).toBeInTheDocument();
  });
});

const MockHandler = () => {
  return (
    <ConditionalHandler condition={condition} fallback={fallback}>
      <div>children</div>
    </ConditionalHandler>
  );
};

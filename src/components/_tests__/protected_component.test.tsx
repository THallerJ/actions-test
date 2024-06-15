import { describe, expect, it, vi } from 'vitest';
import ProtectedComponent from '../ProtectedComponent';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import { UserContext, UserProfile } from '@auth0/nextjs-auth0/client';
import { beforeEach } from 'node:test';

const checkSession = vi.fn();
let user: UserProfile | undefined = undefined;
let isLoading = false;

beforeEach(() => {
  user = undefined;
  isLoading = false;
});

describe('render protected components', () => {
  it('render unprotected', () => {
    const { getByText, queryByText } = render(<MockProtected />);
    expect(getByText('unprotected')).toBeInTheDocument();
    expect(queryByText('fallback')).not.toBeInTheDocument();
    expect(queryByText('child')).not.toBeInTheDocument();
  });
  it('render child', () => {
    user = { name: 'user' };
    const { getByText, queryByText } = render(<MockProtected />);

    expect(getByText('child')).toBeInTheDocument();
    expect(queryByText('fallback')).not.toBeInTheDocument();
    expect(queryByText('unprotected')).not.toBeInTheDocument();
  });
  it('render fallback', () => {
    isLoading = true;
    const { getByText, queryByText } = render(<MockProtected />);

    expect(getByText('fallback')).toBeInTheDocument();
    expect(queryByText('child')).not.toBeInTheDocument();
    expect(queryByText('unprotected')).not.toBeInTheDocument();
  });
});

const MockProtected = () => (
  <UserContext.Provider
    value={{
      user,
      isLoading,
      checkSession,
    }}
  >
    <ProtectedComponent
      fallback={<div>fallback</div>}
      unprotected={<div>unprotected</div>}
    >
      <div>child</div>
    </ProtectedComponent>
  </UserContext.Provider>
);

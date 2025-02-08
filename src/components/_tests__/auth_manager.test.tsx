import { beforeEach, describe, expect, it, vi } from 'vitest';
import AuthManager from '../header/AuthManager';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import { UserContext, UserProfile } from '@auth0/nextjs-auth0/client';

const checkSession = vi.fn();
let user: UserProfile | undefined = undefined;
let isLoading = false;

beforeEach(() => {
  user = undefined;
  isLoading = false;
});

describe('auth manager', () => {
  it('no user', () => {
    const { getByText, queryByText } = render(<MockAuth />);
    expect(getByText('Logi')).toBeInTheDocument();
    expect(getByText('Sign Up')).toBeInTheDocument();
    expect(queryByText('Hi')).not.toBeInTheDocument();
    expect(queryByText('Logout')).not.toBeInTheDocument();
  });
  it('with user', () => {
    user = { nickname: 'Name' };
    const { getByText, queryByText } = render(<MockAuth />);
    expect(getByText('Hi, Name')).toBeInTheDocument();
    expect(getByText('Logout')).toBeInTheDocument();
    expect(queryByText('Login')).not.toBeInTheDocument();
    expect(queryByText('Sign Up')).not.toBeInTheDocument();
  });
});

const MockAuth = () => (
  <UserContext.Provider
    value={{
      user,
      isLoading,
      checkSession,
    }}
  >
    <AuthManager />
  </UserContext.Provider>
);

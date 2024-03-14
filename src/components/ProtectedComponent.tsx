import { useUser } from '@auth0/nextjs-auth0/client';

const ProtectedComponent = ({
  children,
  unprotected,
  fallback,
}: ProtectedComponentProps) => {
  const { user, isLoading } = useUser();

  if (isLoading) return fallback || null;
  if (user) return children;
  if (!user) return unprotected || null;
};

export default ProtectedComponent;

type ProtectedComponentProps = {
  children: React.ReactNode;
  unprotected?: React.ReactNode;
  fallback?: React.ReactNode;
};

import { useUser } from '@auth0/nextjs-auth0/client';

type ProtectedComponentProps = {
  children: React.ReactNode;
  protect?: boolean;
};

const ProtectedComponent = ({ children, protect }: ProtectedComponentProps) => {
  const { user, isLoading } = useUser();

  if (protect) return user && !isLoading ? children : null;
  else return !user && !isLoading ? children : null;
};

export default ProtectedComponent;

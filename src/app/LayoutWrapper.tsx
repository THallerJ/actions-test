'use client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AlertContextProvider } from '@/stores';

const queryClient = new QueryClient();

const LayoutWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <AlertContextProvider>{children}</AlertContextProvider>
    </QueryClientProvider>
  );
};

export default LayoutWrapper;

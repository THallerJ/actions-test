const ConditionalHandler = ({
  condition,
  fallback,
  children,
}: ConditionalHandlerProps) => {
  return condition ? children : fallback || null;
};

export default ConditionalHandler;

type ConditionalHandlerProps = {
  condition: boolean;
  fallback?: React.ReactNode;
  children: React.ReactNode;
};

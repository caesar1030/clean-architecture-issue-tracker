const LoadingSpinner = () => {
  return (
    <div className="h-screen flex justify-center items-center">
      <div className="border-neutral-border-active h-20 w-20 animate-spin rounded-full border-8 border-t-accent-border-weak" />
    </div>
  );
};

export default LoadingSpinner;

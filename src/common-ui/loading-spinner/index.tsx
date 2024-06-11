const LoadingSpinner = () => {
  return (
    <div className="h-screen flex justify-center items-center">
      <div
        className="border-neutral-border-active h-20 w-20 animate-spin rounded-full border-8 border-t-accent-border-weak"
        role="alert"
        aria-label="로딩중입니다. 잠시만 기다려주세요."
      />
    </div>
  );
};

export default LoadingSpinner;

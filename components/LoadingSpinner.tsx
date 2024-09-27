const LoadingSpinner = () => {
    return (
      <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30">
        <div className="w-10 h-10 border-4 border-gray-100 border-t-green-500 rounded-full animate-spin"></div>
      </div>
    );
  };
  
  export default LoadingSpinner;
  
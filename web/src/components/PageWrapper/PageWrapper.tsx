const PageWrapper = ({ children }) => {
  return (
    <div className="ml-6 mr-6 min-h-screen bg-gray-100 pt-0 md:pt-6">
      <div className="md:col-span-2"></div>
      <div className="mb-6 min-h-[95vh] bg-white pt-6 shadow-lg md:col-span-8 md:grid md:grid-cols-12">{children}</div>
    </div>
  );
};

export default PageWrapper;

const PageWrapper = ({ children }) => {
  return (
    <div className="pt-0 md:ml-6 md:mr-6 md:pt-6">
      <div className="md:col-span-2"></div>
      <div className="bg-white pt-6 shadow-lg md:col-span-8 md:mb-6 md:grid md:grid-cols-12">{children}</div>
    </div>
  );
};

export default PageWrapper;

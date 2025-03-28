const PageHeader = ({ title, description }) => {
    return (
      <div className="text-center mt-8">
        <h1 className="text-5xl font-bold text-gray-800">{title}</h1>
        <p className="text-gray-600 mt-2 max-w-screen-2xl mx-auto">{description}</p>
      </div>
    );
  };
  
  export default PageHeader;
  
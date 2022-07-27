const CoverHeader = ({ title, lead }) => {
  return (
    <>
      <h1 className="font-header-serif text-4xl text-center mb-2 lg:text-left">{title}</h1>
      <p className="mb-2 text-center lg:text-left">{lead}</p>
    </>
  );
}

export default CoverHeader;

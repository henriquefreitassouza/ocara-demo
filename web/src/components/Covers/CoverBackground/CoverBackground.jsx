const CoverBackground = ({ cover }) => {
  return (
    <div
      className="bg-gray-300 bg-cover bg-center w-full h-64"
      style={{ backgroundImage: `url(${cover})` }}>
    </div>
  );
}

export default CoverBackground;

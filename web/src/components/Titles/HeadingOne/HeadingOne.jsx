const HeadingOne = ({ title, ...params }) => {
  return (
    <h1 className={params.className}>{title}</h1>
  );
}

export default HeadingOne;

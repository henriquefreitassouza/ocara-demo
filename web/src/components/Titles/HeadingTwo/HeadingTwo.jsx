const HeadingTwo = ({ title, ...params }) => {
  return (
    <h2 className={params.className}>{title}</h2>
  );
}

export default HeadingTwo;

const SubHeading = ({ title, ...params }) => {
  return (
    <p className={params.className}>{title}</p>
  );
}

export default SubHeading;

const Title = ({ children, ...params }) => {
  return (
    <div className={params.className}>
      {children}
    </div>
  );
}

export default Title;

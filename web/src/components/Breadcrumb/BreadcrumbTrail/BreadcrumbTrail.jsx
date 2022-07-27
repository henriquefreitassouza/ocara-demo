const BreadcrumbTrail = ({ children, ...params }) => {
  return (
    <nav className={params.className}>
      <ul>
        {children}
      </ul>
    </nav>
  );
}

export default BreadcrumbTrail;

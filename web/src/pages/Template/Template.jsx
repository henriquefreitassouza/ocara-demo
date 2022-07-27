import { Outlet } from "react-router-dom";
import { Header, Footer } from "components";

const Template = () => {
  return (
    <>
      <Header />
      <main className="flex-grow mt-[4.5rem]">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default Template;

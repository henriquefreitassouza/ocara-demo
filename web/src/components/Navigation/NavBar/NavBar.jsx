import { useState } from "react";
import { NavBrand,
         NavMenu,
         NavToggler } from "components";

const NavBar = ({ ...params }) => {
  const [toggle, setToggle] = useState(false);
  const toggleMenu = () => { setToggle(!toggle); }

  return (
    <nav className="fixed w-full top-0 z-50">
      <div className="flex flex-col bg-white lg:flex-row lg:items-center justify-between p-4">
        <div className="flex justify-between">
          <NavBrand link="/" text="Ocara" />
          <NavToggler onClick={toggleMenu} />
        </div>
        <div className="bg-white h-max lg:flex lg:flex-row-reverse">
          <NavMenu toggle={toggle} />
        </div>
      </div>
    </nav>
  )
}

export default NavBar;

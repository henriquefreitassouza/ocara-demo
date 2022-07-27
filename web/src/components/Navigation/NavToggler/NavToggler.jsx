import { MenuIcon } from "@heroicons/react/outline";

const NavToggler = ({ ...params }) => {
  return (
    <button className="lg:hidden" type="button" onClick={params.onClick}>
      <MenuIcon className="h-6 w-6 text-black" />
    </button>
  );
}

export default NavToggler;

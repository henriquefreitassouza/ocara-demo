import { ArrowCircleDownIcon } from "@heroicons/react/outline";
import { HeroForm,
         HeroTitle } from "components";
import { handleAnchorClick,
         handleImageLoad } from "utils";
import tiles from "./data";

const images = handleImageLoad(require.context("/src/assets/images/hero", false, /\.jpg/));

const HeroBanner = () => {
  const HeroTileList = () => {
    return (
      <>
        {tiles.map((tile) => (
          <img key={tile.id} className="w-full rounded-lg" src={images[tile.name]} alt={tile.alt} />
        ))}
      </>
    )
  }

  return (
    <div id="hero" className="container mx-auto h-screen overflow-hidden lg:flex lg:items-center lg:justify-between lg:-mt-[4.5rem]">
      <div className="">
        <HeroTitle />
      </div>
      <div>
        <div className="relative">
          <HeroForm />
          <div className="columns-2 p-4 gap-4 space-y-4 md:columns-4 xl:columns-6">
            <HeroTileList />
          </div>
        </div>
        <div className="hidden lg:block absolute inset-x-0 bottom-0 py-8">
          <a href="#feature" onClick={(e) => handleAnchorClick(e, "/#feature")}>
            <ArrowCircleDownIcon className="w-12 h-12 text-orange-700 mx-auto animate-bounce" />
          </a>
        </div>
      </div>
    </div>
  );
}

export default HeroBanner;

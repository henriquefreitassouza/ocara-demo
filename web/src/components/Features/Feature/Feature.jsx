import { FeatureIcon } from "components";

const Feature = ({ icon, title, description }) => {
  return (
    <div className="text-center p-4 mb-4 basis-full lg:p-8 lg:mb-0 lg:basis-1/3">
      <FeatureIcon icon={icon} className="mx-auto mb-2 w-16 h-16 text-orange-700" />
      <h3 className="font-header-serif text-xl text-orange-700 mb-1">{title}</h3>
      <p>{description}</p>
    </div>
  );
}

export default Feature;

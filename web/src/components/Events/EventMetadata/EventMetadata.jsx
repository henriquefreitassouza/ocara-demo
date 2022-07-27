import { ArrowCircleRightIcon,
         CalendarIcon,
         InformationCircleIcon,
         LocationMarkerIcon,
         UserGroupIcon } from "@heroicons/react/outline";
import { NavLink } from "components";

const EventMetadata = ({ icon, text, link, className }) => {
  let iconTag, iconText;
  let iconStyles = "text-gray-500 w-6 h-6";

  if (!className) className = "";

  switch (icon) {
    case "calendar":
      iconTag = <CalendarIcon className={iconStyles} />;
      break;
    case "location":
      iconTag = <LocationMarkerIcon className={iconStyles} />;
      break;
    case "group":
      iconTag = <UserGroupIcon className={iconStyles} />;
      break;
    case "information":
      iconTag = <InformationCircleIcon className={iconStyles} />;
      break;
    default:
      iconTag = <ArrowCircleRightIcon className={iconStyles} />;
      break;
  }

  if (link) iconText = (<NavLink link={link} text={text} className="text-sm" />);
  else iconText = (<span className="text-sm">{text}</span>);

  return (
    <div className={`flex ${className}`}>
      <div className="mr-2">
        {iconTag}
      </div>
      {iconText}
    </div>
  );
}

export default EventMetadata;

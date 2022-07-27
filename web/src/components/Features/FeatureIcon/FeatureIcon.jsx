import {
  BookOpenIcon,
  UsersIcon,
  CalendarIcon,
  InformationCircleIcon
} from "@heroicons/react/outline";

const FeatureIcon = ({ icon, className }) => {
  let iconTag;

  switch (icon) {
    case "book":
      iconTag = (<BookOpenIcon className={className} />);
      break;
    case "user":
      iconTag = (<UsersIcon className={className} />);
      break;
    case "calendar":
      iconTag = (<CalendarIcon className={className} />);
      break;
    default:
      iconTag = (<InformationCircleIcon className={className} />);
      break;
  }

  return iconTag;
}

export default FeatureIcon;

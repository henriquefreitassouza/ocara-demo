import { useParams } from "react-router-dom";
import { CommunityEventListCallToAction,
         CommunityEventListEvents } from "pages";

const CommunityEventList = () => {
  const { community } = useParams();

  return (
    <>
      <CommunityEventListEvents namespace={community} />
      <CommunityEventListCallToAction />
    </>
  );
}

export default CommunityEventList;

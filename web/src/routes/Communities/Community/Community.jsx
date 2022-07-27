import { useOutletContext } from "react-router-dom";
import { useCommunityEvents } from "hooks";
import { CommunityHeader,
         CommunityNextEvent,
         CommunityPreviousEvents } from "pages";

const Community = () => {
  const { community, events, isMember, setIsMember } = useOutletContext();
  const [nextEvent, previousEvents] = useCommunityEvents(events);

  return (
    <>
      <CommunityHeader community={community} isMember={isMember} handleMember={setIsMember} />
      <CommunityNextEvent community={community} event={nextEvent} isMember={isMember} />
      <CommunityPreviousEvents community={community} event={previousEvents} isMember={isMember} />
    </>
  );
}

export default Community;

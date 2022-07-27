import { useEffect,
         useState } from "react";
import { useParams } from "react-router-dom";
import { useAuthentication,
         useEvent } from "hooks";
import { handleFetch } from "utils";
import { CommunityEventCallToAction,
         CommunityEventDescription,
         CommunityEventHeader } from "pages";

const CommunityEvent = () => {
  const { community, event: communityEventNamespace } = useParams();
  const [isRsvp, setIsRsvp] = useState(false);
  const credentials = useAuthentication();
  const communityEvent = useEvent({ event: communityEventNamespace });

  useEffect(() => {
    (async () => {
      if (credentials) {
        const member = await handleFetch(`${process.env.REACT_APP_API_ADDRESS}/member/user`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            community: community,
            user: credentials.user
          })
        });

        if (!member || member.result === "error") return;

        const rsvp = await handleFetch(`${process.env.REACT_APP_API_ADDRESS}/event/list/rsvp`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            event: communityEventNamespace,
            member: member.body._id
          })
        });

        if (!rsvp || rsvp.result === "error") return;

        setIsRsvp(true);
      }
    })();
  }, [community, credentials, communityEvent, communityEventNamespace]);

  if (communityEvent.isLoading || communityEvent.error) return;

  return (
    <>
      <CommunityEventHeader event={communityEvent.data.body} isRsvp={isRsvp} handleRsvp={setIsRsvp} />
      <CommunityEventDescription description={communityEvent.data.body.description} />
      <CommunityEventCallToAction />
    </>
  );
}

export default CommunityEvent;

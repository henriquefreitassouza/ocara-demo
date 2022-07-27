import { useEffect,
         useState } from "react";
import { Outlet,
         Navigate,
         useParams } from "react-router-dom";
import { useAuthentication,
         useCommunity,
         useNamespace } from "hooks";
import { handleFetch } from "utils";

const CommunityGateway = () => {
  const { community, event: communityEvent } = useParams();
  const [isMember, setIsMember] = useState(false);
  const credentials = useAuthentication();
  const [communityResult, eventsResult] = useCommunity({ community });
  const [validEvent, isLoadingEvent] = useNamespace("event", communityEvent);

  useEffect(() => {
    if (credentials) {
      (async () => {
        const member = await handleFetch(`${process.env.REACT_APP_API_ADDRESS}/member/user`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            user: credentials.user,
            community: community
          })
        });

        if (member && member.result === "success")
          setIsMember(true);
      })();
    }
  }, [isMember, community, credentials]);

  if (communityResult.isLoading || eventsResult.isLoading) return;

  if (communityResult.error || communityResult.data.result === "error")
    return <Navigate to="/clubes-de-leitura" replace />;

  if (communityEvent) {
    if ((isLoadingEvent === "2" || isLoadingEvent === "9") && !validEvent)
      return <Navigate to={`/clubes-de-leitura/${community}`} replace />;

    if (eventsResult.error || eventsResult.data.result === "error")
      return <Navigate to={`/clubes-de-leitura/${community}`} replace />;
  }

  return <Outlet context={{ community: communityResult.data.body, events: eventsResult.data.body, isMember: isMember, setIsMember: setIsMember }} />;
}

export default CommunityGateway;

import { useQuery } from "react-query";

function useEvent({ event: communityEvent }) {
  const eventResult = useQuery("communityEventData", () =>
    fetch(`${process.env.REACT_APP_API_ADDRESS}/event/list/namespace/${communityEvent}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then((result) => result.json())
  );

  return eventResult;
}

export default useEvent;

import { useQuery } from "react-query";

const useCommunity = ({ community }) => {
  const communityResult = useQuery("communityData", () =>
    fetch(`${process.env.REACT_APP_API_ADDRESS}/community/list/namespace/${community}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then((result) => result.json())
  );

  const eventsResult = useQuery("communityEventsData", () =>
    fetch(`${process.env.REACT_APP_API_ADDRESS}/event/list/community/${community}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then((result) => result.json())
  );

  return [communityResult, eventsResult];
}

export default useCommunity;

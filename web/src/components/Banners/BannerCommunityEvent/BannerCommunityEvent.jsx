import { useEffect,
         useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthentication } from "hooks";
import { handleFetch } from "utils";
import { ButtonDanger,
         ButtonSecondary,
         EventMetadata,
         Info } from "components";

const BannerCommunityEvent = ({ event: communityEvent, isRsvp, handleRsvp }) => {
  const credentials = useAuthentication();
  const navigate = useNavigate();
  const [memberId, setMemberId] = useState(null);

  useEffect(() => {
    (async () => {
      if (credentials) {
        const member = await handleFetch(`${process.env.REACT_APP_API_ADDRESS}/member/user`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            user: credentials.user,
            community: communityEvent.community
          })
        });

        if (!member || member.result === "error") return;

        setMemberId(member.body._id);
      }
    })();
  }, [communityEvent, memberId, credentials]);

  const handleJoinClick = async (e) => {
    e.preventDefault();

    if (!credentials || !communityEvent) return navigate("/login");

    try {
      if (!memberId)
        throw new Error("Faça parte do clube antes de confirmar sua participação no evento");

      const rsvpMember = await handleFetch(`${process.env.REACT_APP_API_ADDRESS}/event/rsvp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          member: memberId,
          event: communityEvent.namespace
        })
      });

      if (!rsvpMember || rsvpMember.result === "error")
        throw new Error("Não foi possível confirmar a participação no evento");

      handleRsvp(true);

      window.alert("Sua participação no evento está confirmada");
    } catch(e) { window.alert(e.message); }
  }

  const handleLeaveClick = async (e) => {
    e.preventDefault();

    if (!credentials || !communityEvent) return navigate("/login");

    try {
      if (!memberId)
        throw new Error("Faça parte do clube antes de confirmar sua participação no evento");

      const rsvpMember = await handleFetch(`${process.env.REACT_APP_API_ADDRESS}/event/rsvp/delete`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          member: memberId,
          event: communityEvent.namespace
        })
      });

      if (!rsvpMember || rsvpMember.result === "error")
        throw new Error("Não foi possível confirmar o cancelamento da sua participação no evento");

      handleRsvp(false);

      window.alert("Sua participação no evento está cancelada");
    } catch (e) { window.alert(e.message); }
  }

  const isPastEvent = () => {
    if (!communityEvent) return true;
    const today = Date.now();

    if (new Date(communityEvent.date) < today) return true;

    return false;
  }

  const BannerCommunityEventCta = () => {
    const pastEvent = isPastEvent();
    const eventInfo = <Info text={`${(communityEvent.rsvp_list) ? communityEvent.rsvp_list.length : 0} participantes`} />;
    if (pastEvent) return eventInfo;

    return (
      <div>
        {
          (isRsvp)
          ? <ButtonDanger text="Cancelar a participação" onClick={(e) => handleLeaveClick(e)} />
          : <ButtonSecondary text="Participar" onClick={(e) => handleJoinClick(e)} />
        }
        {eventInfo}
      </div>
    )
  }

  const eventAddress = `${communityEvent.place.address},
                        ${communityEvent.place.number},
                        ${communityEvent.place.neighborhood},
                        ${communityEvent.place.city},
                        ${communityEvent.place.state},
                        ${communityEvent.place.postal_code}`;

  return (
    <>
      <p className="text-3xl font-header-serif mb-2">{communityEvent.title}</p>
      <div className="">
        <div className="my-4">
          <EventMetadata
            icon="location"
            text={(communityEvent.online) ? "Evento online" : eventAddress}
            className="" />
        </div>
        <BannerCommunityEventCta />
      </div>
    </>
  );
}

export default BannerCommunityEvent;

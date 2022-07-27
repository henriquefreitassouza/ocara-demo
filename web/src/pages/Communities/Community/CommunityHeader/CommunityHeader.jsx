import { useNavigate } from "react-router-dom";
import { useAuthentication } from "hooks";
import { handleFetch } from "utils";
import { ButtonDanger,
         ButtonNeutral,
         ButtonSecondary,
         Cover,
         Info } from "components";

const CommunityHeader = ({ community, isMember, handleMember }) => {
  const credentials = useAuthentication();
  const navigate = useNavigate();

  const handleJoinClick = async (e) => {
    e.preventDefault();

    if (!credentials || !community) return navigate("/login");

    try {
      const user = await handleFetch(`${process.env.REACT_APP_API_ADDRESS}/user/${credentials.user}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      });

      if (!user || user.result === "error")
        throw new Error("Usuário não encontrado");

      const member = await handleFetch(`${process.env.REACT_APP_API_ADDRESS}/member`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          user: credentials.user,
          name: user.body.name,
          surname: user.body.surname,
          bio: user.body.bio,
          picture: user.body.picture,
          badge: "novice",
          role: "member",
          community: community.namespace,
          active: true,
          suspended: false,
        })
      });

      if (!member || member.result === "error")
        throw new Error("Membro não encontrado");

      const addMember = await handleFetch(`${process.env.REACT_APP_API_ADDRESS}/community/member`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          member: member.body._id,
          community: community.namespace
        })
      });

      if (!addMember || addMember.result === "error")
        throw new Error("Não foi possível entrar no clube");

      handleMember(true);

      window.alert("Você agora faz parte deste clube");
    }
    catch (e) { window.alert(e.message); }
  }

  const handleLeaveClick = async (e) => {
    e.preventDefault();

    if (!credentials || !community) return navigate("/login");

    try {
      const member = await handleFetch(`${process.env.REACT_APP_API_ADDRESS}/member/user`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          user: credentials.user,
          community: community.namespace
        })
      });

      if (!member || member.result === "error") throw new Error("Membro não encontrado");

      const memberId = member.body._id;

      const memberEvents = await handleFetch(`${process.env.REACT_APP_API_ADDRESS}/event/rsvp/${memberId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      });

      if (memberEvents && Array.isArray(memberEvents.body))
        throw new Error("Cancele sua participação nos próximos eventos antes de deixar o clube");
      //
      // memberEvents.body.map((memberEvent) => {
      //   if (new Date(memberEvent.date) > Date.now())
      //     throw new Error("Cancele sua participação nos próximos eventos antes de deixar o clube");
      //
      //   return null;
      // })

      const memberCommunityDelete = await handleFetch(`${process.env.REACT_APP_API_ADDRESS}/community/member/delete`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          community: community.namespace,
          member: memberId
        })
      });

      if (!memberCommunityDelete || memberCommunityDelete.result === "error") throw new Error("Não foi possível confirmar a saída do clube");

      const memberDelete = await handleFetch(`${process.env.REACT_APP_API_ADDRESS}/member/${memberId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        }
      });

      if (!memberDelete || memberDelete.result === "error") throw new Error("Não foi possível sair do clube");

      handleMember(false);

      window.alert("Você saiu deste clube");
    } catch (e) { window.alert(e.message); }
  }

  const CommunityList = () => {
    const cta = (
      <div>
        {
          (!isMember)
          ? <ButtonSecondary text="Entrar no clube" onClick={(e) => handleJoinClick(e)} />
          : <ButtonDanger text="Sair do clube" onClick={(e) => handleLeaveClick(e)} />
        }
        <Info text={`${(community.member_list) ? community.member_list.length : 0} membros`} />
        {
          (credentials && community && credentials.user === community.user)
          ? <ButtonNeutral link={`/perfil/clubes-de-leitura/${community.namespace}/eventos/criar`} text="Criar novo evento" />
          : ""
        }
      </div>
    );

    return (
      <Cover
        title={community.name}
        lead={community.description}
        cover={community.cover}
        profile={community.picture}
        inner={cta}
      />
    );
  }

  return (
    <section className="px-4">
      <div className="container mx-auto">
        <CommunityList />
      </div>
    </section>
  )
}

export default CommunityHeader;

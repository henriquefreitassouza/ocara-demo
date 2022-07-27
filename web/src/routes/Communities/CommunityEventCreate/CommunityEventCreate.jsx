import { Navigate,
         useParams } from "react-router-dom";
import { useNamespace } from "hooks";
import { CommunityEventCreateData } from "pages";

const CommunityEventCreate = ({ user }) => {
  const { community } = useParams();
  const [isCommunityValid, loadingCommunity] = useNamespace("community", community);

  if ((loadingCommunity === "2" || loadingCommunity === "9") && !isCommunityValid)
    return <Navigate to="/clubes-de-leitura" replace />;

  return (
    <CommunityEventCreateData community={community} />
  );
}

export default CommunityEventCreate;

import { Navigate, useParams } from "react-router-dom";
import { legacyRedirectTarget } from "@/lib/legacyRoutes";

const LegacyServiceRedirect = () => {
  const { slug } = useParams<{ slug: string }>();
  const target = slug ? legacyRedirectTarget(slug) : null;
  if (!target) {
    return <Navigate to="/" replace />;
  }
  return <Navigate to={target} replace />;
};

export default LegacyServiceRedirect;

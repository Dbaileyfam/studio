import { Navigate, useParams } from "react-router-dom";
import { getServiceBySlug, getServicePath } from "@/lib/services";

const LegacyServiceRedirect = () => {
  const { slug } = useParams<{ slug: string }>();
  const service = slug ? getServiceBySlug(slug) : undefined;
  if (!service) {
    return <Navigate to="/" replace />;
  }
  return <Navigate to={getServicePath(service.slug)} replace />;
};

export default LegacyServiceRedirect;

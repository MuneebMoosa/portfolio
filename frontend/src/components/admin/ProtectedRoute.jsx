import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useGetCurrentAdminQuery } from "../../services/portfolioApi";

const ProtectedRoute = () => {
  const location = useLocation();

  const { data, isLoading, isFetching, isError, } = useGetCurrentAdminQuery();

  if (isLoading || isFetching) {
    return (
      <div className="min-h-screen bg-[#09090b] text-[#D4B783] flex items-center justify-center">
        Checking authentication...
      </div>
    );
  }

  if (isError || !data?.authenticated) {
    return (
      <Navigate
        to="/admin/login"
        replace
        state={{ from: location }}
      />
    );
  }

  return <Outlet />;
};

export default ProtectedRoute;

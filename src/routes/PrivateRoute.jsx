import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { Navigate, useLocation } from "react-router";
import Loader from "../components/loader";


const PrivateRoute = ({children}) => {
    const {user, loading} = useContext(AuthContext);
    const location = useLocation();

    if(loading) {
        return <Loader></Loader>
    }

    if(user) {
        return children;
    }

    return <Navigate to="/signIn" state={{from: location}} replace></Navigate>
};

export default PrivateRoute;
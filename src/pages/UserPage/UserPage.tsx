import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../../App";
import Header from "../../components/Header/Header";
import "./UserPage.scss";

const UserPage = (): JSX.Element => {
  const authInfo = useContext(AuthContext);
  return (
    <div className="user-page page">
      {authInfo.userInfo ? (
        <>
          <Header></Header>
          <h1>User Page</h1>
        </>
      ) : (
        <Navigate to="/login" replace={true}></Navigate>
      )}
    </div>
  );
};

export default UserPage;

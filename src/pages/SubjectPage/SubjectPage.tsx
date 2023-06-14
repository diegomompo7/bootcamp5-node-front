import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../../App";
import Header from "../../components/Header/Header";
import "./SubjectPage.scss";

const SubjectPage = (): JSX.Element => {
  const authInfo = useContext(AuthContext);

  return (
    <div className="subject-page page">
      {authInfo.userInfo ? (
        <>
          <Header></Header>
          <h1>Subject Page</h1>
        </>
      ) : (
        <Navigate to="/login" replace={true}></Navigate>
      )}
    </div>
  );
};

export default SubjectPage;

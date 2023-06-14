import { useContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../../App";
import Header from "../../components/Header/Header";
import "./SubjectPage.scss";
import SubjectTable from "./SubjectTable/SubjectTable";
import { SubjectResponse } from "../../models/Subject";

const SubjectPage = (): JSX.Element => {
  const authInfo = useContext(AuthContext);

  const [subjects, setSubjects] = useState<SubjectResponse[]>([]);

  useEffect(() => {
    fetchSubjects();
  }, [authInfo]);

  const fetchSubjects = (): void => {
    if (authInfo?.userToken) {
      fetch("http://localhost:3000/subject", {
        headers: {
          Authorization: `Bearer ${authInfo.userToken}`,
        },
      })
        .then(async (response) => {
          if (response.status !== 200) {
            alert("Ha ocurrido un error en la petición");
          }
          return await response.json();
        })
        .then((responseParsed) => {
          setSubjects(responseParsed.data);
        })
        .catch((error) => {
          console.error(error);
          alert("Ha ocurrido un error en la petición");
        });
    }
  };

  return (
    <div className="subject-page page">
      {authInfo.userInfo ? (
        <>
          <Header></Header>
          <h1>Subject Page</h1>
          <SubjectTable subjects={subjects}></SubjectTable>
        </>
      ) : (
        <Navigate to="/login" replace={true}></Navigate>
      )}
    </div>
  );
};

export default SubjectPage;

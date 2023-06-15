import { useContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../../App";
import Header from "../../components/Header/Header";
import "./SubjectPage.scss";
import SubjectTable from "./SubjectTable/SubjectTable";
import SubjectForm from "./SubjectForm/SubjectForm";
import { SubjectResponse } from "../../models/Subject";

const SubjectPage = (): JSX.Element => {
  const API_URL_SUBJECT = `${process.env.REACT_APP_API_URL as string}/subject`;
  const authInfo = useContext(AuthContext);

  const [subjects, setSubjects] = useState<SubjectResponse[]>([]);

  useEffect(() => {
    fetchSubjects();
  }, [authInfo]);

  const fetchSubjects = (): void => {
    if (authInfo?.userToken) {
      fetch(API_URL_SUBJECT, {
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
          <h3>Listado de asignaturas:</h3>
          <SubjectTable subjects={subjects}></SubjectTable>

          <h3>Crear asignatura:</h3>
          <SubjectForm fetchSubjects={fetchSubjects} userToken={authInfo?.userToken}></SubjectForm>
        </>
      ) : (
        <Navigate to="/login" replace={true}></Navigate>
      )}
    </div>
  );
};

export default SubjectPage;

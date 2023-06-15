import { useContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../../App";
import Header from "../../components/Header/Header";
import "./ClassroomPage.scss";
import { ClassroomResponse } from "../../models/Classroom";
import ClassroomTable from "./ClassroomTable/ClassroomTable";
import ClassroomForm from "./ClassroomForm/ClassroomForm";

const ClassroomPage = (): JSX.Element => {
  const API_URL_CLASSROOM = `${process.env.REACT_APP_API_URL as string}/classroom`;
  const authInfo = useContext(AuthContext);
  const [classrooms, setClassrooms] = useState<ClassroomResponse[]>([]);

  useEffect(() => {
    fetchClassrooms();
  }, [authInfo]);

  const fetchClassrooms = (): void => {
    if (authInfo?.userToken) {
      fetch(API_URL_CLASSROOM, {
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
          setClassrooms(responseParsed.data);
        })
        .catch((error) => {
          console.error(error);
          alert("Ha ocurrido un error en la petición");
        });
    }
  };

  return (
    <div className="classroom-page page">
      {authInfo.userInfo ? (
        <>
          <Header></Header>
          <h1>Classroom Page</h1>
          <h3>Listado de clases:</h3>
          <ClassroomTable classrooms={classrooms}></ClassroomTable>

          <h3>Crear clase:</h3>
          <ClassroomForm fetchClassrooms={fetchClassrooms} userToken={authInfo?.userToken}></ClassroomForm>
        </>
      ) : (
        <Navigate to="/login" replace={true}></Navigate>
      )}
    </div>
  );
};

export default ClassroomPage;

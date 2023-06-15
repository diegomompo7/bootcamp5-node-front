import { useRef } from "react";
import { ClassroomCreate } from "../../../models/Classroom";

interface ClassroomFormProps {
  userToken?: string;
  fetchClassrooms: () => void;
}

const ClassroomForm = (props: ClassroomFormProps): JSX.Element => {
  const API_URL_CLASSROOM = `${process.env.REACT_APP_API_URL as string}/classroom`;
  const nameRef = useRef<HTMLInputElement>(null);

  const submitForm = (event: React.FormEvent): void => {
    event.preventDefault();

    if (!nameRef.current?.value?.length) {
      alert("El nombre de la clase es obligatorio");
      return;
    }

    const newClassroom: ClassroomCreate = { name: nameRef.current.value };

    fetch(API_URL_CLASSROOM, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${props.userToken as string}`,
      },
      body: JSON.stringify(newClassroom),
    })
      .then(async (response) => {
        if (response.status === 201) {
          (nameRef as any).current.value = "";
        } else {
          alert("Ha ocurrido un error");
        }
        return await response.json();
      })
      .then(() => {
        props.fetchClassrooms();
      })
      .catch((error) => {
        alert("Ha ocurrido un error en la petición");
        console.error(error);
      });
  };

  return (
    <form onSubmit={submitForm}>
      <label htmlFor="classroom-name">Nombre de la clase:</label>
      <input ref={nameRef} type="text" id="classroom-name" required />

      <button type="submit">Crear clase</button>
    </form>
  );
};

export default ClassroomForm;

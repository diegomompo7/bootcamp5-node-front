import { SubjectResponse } from "../../../models/Subject";

interface SubjectProps {
  subjects: SubjectResponse[];
}

const SubjectTable = (props: SubjectProps): JSX.Element => {
  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Teacher</th>
          <th>Classroom</th>
        </tr>
      </thead>
      <tbody>
        {props.subjects.map((subject: SubjectResponse) => (
          <tr key={subject._id}>
            <td>{subject._id}</td>
            <td>{subject.name}</td>
            <td>
              {subject.teacher.firstName} {subject.teacher.lastName}
            </td>
            <td>{subject.classroom.name}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default SubjectTable;

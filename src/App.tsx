
import { HashRouter, Route, Routes } from "react-router-dom";
import "./App.scss";
import ClassroomPage from "./pages/ClassroomPage/ClassroomPage";
import HomePage from "./pages/HomePage/HomePage";
import LoginPage from "./pages/LoginPage/LoginPage";
import SubjectPage from "./pages/SubjectPage/SubjectPage";
import UserPage from "./pages/UserPage/UserPage";

const App = (): JSX.Element => {
  return (
    <div className="app">
      <h1>Bienvenidos a la gestión del colegio</h1>
      <HashRouter>
        <Routes>
          <Route path="/" element={<HomePage></HomePage>}></Route>
          <Route path="/login" element={<LoginPage></LoginPage>}></Route>
          <Route path="/classroom" element={<ClassroomPage></ClassroomPage>}></Route>
          <Route path="/subject" element={<SubjectPage></SubjectPage>}></Route>
          <Route path="/user" element={<UserPage></UserPage>}></Route>
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;

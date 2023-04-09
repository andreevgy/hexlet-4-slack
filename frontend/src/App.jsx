import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import Login from "./screens/Login";
import NotFound from "./screens/NotFound";
import MainPage from "./screens/MainPage";

const App = () => (
  <Router>
    <div className="d-flex flex-column h-100">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<MainPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  </Router>
);

export default App;
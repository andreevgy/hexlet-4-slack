import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import Login from "./screens/Login";
import NotFound from "./screens/NotFound";
import ChatPage from "./screens/ChatPage";
import UserContextProvider from "./components/UserContextProvider";

const App = () => (
  <UserContextProvider>
    <Router>
      <div className="d-flex flex-column h-100">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<ChatPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  </UserContextProvider>
);

export default App;

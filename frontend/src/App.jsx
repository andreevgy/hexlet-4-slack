import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import Login from "./screens/Login";
import NotFound from "./screens/NotFound";
import ChatPage from "./screens/ChatPage";
import reducer from "./state/slices";

const App = () => {
  const store = configureStore({
    reducer,
  });

  return (
    <Provider store={store}>
      <Router>
        <div className="d-flex flex-column h-100">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<ChatPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </Router>
    </Provider>
  );
};

export default App;

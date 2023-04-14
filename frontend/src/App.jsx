import {
  BrowserRouter as Router,
  Route,
  Routes,
} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Login from './screens/Login';
import NotFound from './screens/NotFound';
import ChatPage from './screens/ChatPage';
import Register from './screens/Register';
import UserContextProvider from './components/UserContextProvider';
import Navbar from './components/Navbar';

const App = () => (
  <Router>
    <UserContextProvider>
      <div className="d-flex flex-column h-100">
        <Navbar />
        <Routes>
          <Route path="/signup" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<ChatPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <ToastContainer />
      </div>
    </UserContextProvider>
  </Router>
);

export default App;

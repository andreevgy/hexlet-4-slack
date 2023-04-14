import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";
import axios from "axios";
import paths from "../paths";
import { actions } from "../state";
import ChannelsList from "../components/ChannelsList";
import ChatBox from "../components/ChatBox";
import { useUserContext } from "../contexts/userContext";

const ChatPage = () => {
  const dispatch = useDispatch();
  const [fetching, setFetching] = useState(true);
  const navigate = useNavigate();
  const { getAuthHeader, logOut } = useUserContext();

  useEffect(() => {
    setFetching(true);
    const fetchData = async () => {
      try {
        const res = await axios.get(paths.api.dataPath, {
          headers: getAuthHeader(),
        });
        dispatch(actions.setInitialState(res.data));
      } catch (err) {
        if (err.response?.status === 401) {
          logOut();
          navigate(paths.app.loginPagePath);
        }
      } finally {
        setFetching(false);
      }
    };

    fetchData();
  }, []);

  return fetching
    ? (
      <div className="h-100 d-flex justify-content-center align-items-center">
        <Spinner animation="border" role="status" variant="primary">
          <span className="visually-hidden">Загрузка</span>
        </Spinner>
      </div>
    )
    : (
      <div className="container h-100 my-4 overflow-hidden rounded shadow">
        <div className="row h-100 bg-white flex-md-row">
          <div className="col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex">
            <ChannelsList />
          </div>
          <div className="col p-0 h-100">
            <ChatBox />
          </div>
        </div>
      </div>
    );
};

export default ChatPage;

import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";
import axios from "axios";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { useRollbar } from "@rollbar/react";
import paths from "../paths";
import { actions } from "../state";
import ChannelsList from "../components/ChannelsList";
import ChatBox from "../components/ChatBox";
import { useUserContext } from "../contexts/userContext";
import Modal from "../components/Modal";

const ChatPage = () => {
  const dispatch = useDispatch();
  const [fetching, setFetching] = useState(true);
  const navigate = useNavigate();
  const { getAuthHeader, logOut } = useUserContext();
  const { t } = useTranslation();
  const rollbar = useRollbar();

  useEffect(() => {
    setFetching(true);
    const fetchData = async () => {
      try {
        const res = await axios.get(paths.api.dataPath, {
          headers: getAuthHeader(),
        });
        dispatch(actions.setInitialState(res.data));
      } catch (err) {
        if (!err.isAxiosError) {
          rollbar.error(err);
          toast.error(t("errors.unknown"));
          return;
        }

        if (err.response?.status === 401) {
          logOut();
          navigate(paths.app.loginPagePath);
        } else {
          rollbar.error(err);
          toast.error(t("errors.network"));
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
          <span className="visually-hidden">{t("loading")}</span>
        </Spinner>
      </div>
    )
    : (
      <>
        <Modal />
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
      </>
    );
};

export default ChatPage;

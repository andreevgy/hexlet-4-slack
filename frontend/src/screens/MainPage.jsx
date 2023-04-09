import {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import paths from "../paths";

const MainPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const userData = localStorage.getItem('userData');
    if (!userData) {
      navigate(paths.app.loginPagePath);
    }
  }, []);
  return <div>main</div>
}

export default MainPage;
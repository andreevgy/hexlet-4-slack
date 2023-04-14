import { createContext, useContext } from "react";

const UserContext = createContext({ user: {} });

export const useUserContext = () => useContext(UserContext);

export default UserContext;

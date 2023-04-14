import { createContext, useContext } from "react";

const ApiContext = createContext(null);

export const useApiContext = () => useContext(ApiContext);

export default ApiContext;

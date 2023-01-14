import { MessageInstance } from "antd/lib/message";
import { createContext } from "react";

export interface AppContextState {
  messageApi: MessageInstance;
}

const AppContext = createContext({} as AppContextState);

export default AppContext;

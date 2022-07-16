import { createContext } from "react";

import { ITournamentsService, TournamentsService, } from "@services";

export interface IAppContext {
  tournamentsService: ITournamentsService;
}

export const AppContext = createContext<IAppContext>({
  tournamentsService: new TournamentsService(),
});

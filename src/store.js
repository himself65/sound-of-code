import * as Redux from "redux";

import * as Reducers from "./reducers";

/**
 * @typedef {Redux.Store<Reducers.AppState, Redux.AnyAction>} AppStore
 */

/**
 * @returns {AppStore}
 */
export const createStore = () => Redux.createStore(Reducers.appReducer);

export const store = createStore();

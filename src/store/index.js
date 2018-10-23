import { createStore } from "redux";
import reducer from "../reducers";

const initialState = { articles: [], savedArticles: []};
export const store = createStore(reducer, initialState);

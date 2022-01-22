import { SETTING_URL } from "./index";

export function getParameter() {
    return fetch(SETTING_URL + "get").then((data) => data.json());
  }
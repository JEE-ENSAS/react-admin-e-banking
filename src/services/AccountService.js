export function getListAccounts() {
  return fetch("https://my-account-service.herokuapp.com/Account/getAll").then(
    (data) => data.json()
  );
}

export function getListUsers() {
  return fetch("https://myclientservice.herokuapp.com/api/users/").then(
    (data) => data.json()
  );
}

export const baseURL =
  "https://my-account-service.herokuapp.com/Account/create";

export const updateURL =
  "https://my-account-service.herokuapp.com/Account/update";

export function getAccount(id) {
  return fetch(
    "https://my-account-service.herokuapp.com/Account/get?id=" + id
  ).then((data) => data.json());
}
const Swal = require("sweetalert2");
export function enabledAccount(id) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id: id }),
  };
  fetch(
    "https://my-account-service.herokuapp.com/Account/enable",
    requestOptions
  ).then((response) => response.json());

  Swal.fire("Enabled!", "", "success");
}

export function disabledAccount(id) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id: id }),
  };
  fetch(
    "https://my-account-service.herokuapp.com/Account/disable",
    requestOptions
  ).then((response) => response.json());

  Swal.fire("Disabled!", "", "success");
}

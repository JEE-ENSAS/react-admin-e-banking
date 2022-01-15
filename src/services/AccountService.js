export function getListAccounts() {
    return fetch('https://my-account-service.herokuapp.com/Account/getAll')
      .then(data => data.json())
  }

  export function getListUsers() {
    return fetch('https://myclientservice.herokuapp.com/api/users/')
      .then(data => data.json())
  }

  export const baseURL = "https://my-account-service.herokuapp.com/Account/create";

  export function getAccount(id) {
    return fetch('https://my-account-service.herokuapp.com/Account/get?id='+id)
      .then(data => data.json())
  }

  
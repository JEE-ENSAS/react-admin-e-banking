export function getParameter() {
    return fetch('https://my-parametrage-service.herokuapp.com/Parameter/get')
      .then(data => data.json())
  }
//curl --header "content-type: text/xml" -d @getAgencies.xml https://my-agency-service.herokuapp.com/ws
export function getListAgencies() {
    return fetch('https://my-agency-service.herokuapp.com/Agency/getAll')
      .then(data => data.json())
  }

  export const addURL = "https://my-agency-service.herokuapp.com/Agency/add";
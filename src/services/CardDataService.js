import http from "../http-common";

const addCardURL = "https://my-card-service-t.herokuapp.com/Card/create";

const Swal = require('sweetalert2')

export function getList() {
    return fetch('https://my-api-gateway-t.herokuapp.com/Card/getAll')
      .then(data => data.json())
  }

 

  export function enabledCard(id) {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 'id': id })
  };
   fetch('https://my-card-service-t.herokuapp.com/Card/enable', requestOptions)
      .then(response => response.json());
      
      Swal.fire('Enabled!', '', 'success')
 
  }


   export function disabledCard(id) {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 'id': id })
  };
  if( fetch('https://my-card-service-t.herokuapp.com/Card/disable', requestOptions)
      .then(response => response.json()))
      {
        Swal.fire('Disabled!', '', 'success')
      }
      
 
  }

  export async function addNewCard(postData) {
   return await fetch("https://my-card-service-t.herokuapp.com/Card/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify( postData),
    });
  }


  export function setItem (data)  {
    return http.post("https://my-card-service-t.herokuapp.com/Card/create", data);
  };

  export const baseURL = "https://my-card-service-t.herokuapp.com/Card/create";
  export default addCardURL;
 
 
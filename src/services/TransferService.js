export function getListTransfers() {
    return fetch('http://my-api-gateway-t.herokuapp.com/transfer-client/transfers')
      .then(data => data.json())
  }
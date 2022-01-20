
import React, { useRef, useState, useEffect } from "react";
import { getListAccounts } from '../../services/AccountService';
import {  updateURL,getCard } from '../../services/CardDataService';
import { useLocation } from 'react-router-dom';
import { Pen } from "react-bootstrap-icons";
function UpdateCard() {

  const Swal = require('sweetalert2')

  const [list, setList] = useState([]);
  const [card, setCard] = useState([]);
  const location = useLocation();
 
  console.log("id"+location.id)

  useEffect(() => {
    let mounted = true;
    getCard(location.id)
      .then(items => {
        if(mounted) {
          setCard(items)
          
        }
      })
    return () => mounted = false;
  }, [])

  useEffect(() => {
    let mounted = true;
    getListAccounts( )
      .then(items => {
        if(mounted) {
          setList(items)
          
        }
      })
    return () => mounted = false;
  }, [])
  

  const accountId = useRef(null);
  const cardNumber = useRef(null);
  const csv = useRef(null);
  const dateExpiration = useRef(null);
  const type = useRef(null);
   
  

  const [ setPostResult] = useState(null);

  
  
  async function postData() {
    console.log("updated");
    
   postData = {
    "accepted": card.accepted,
    "csv": csv.current.value,
    "cardNumber": cardNumber.current.value,
    "enabled": card.enabled,
    "accountId":  accountId.current.value,
    "id": card.id,
      "type": type.current.value,
      "dateExpiration":dateExpiration.current.value
      
    };
    console.log(accountId.current.value);
    try {
      const res =await fetch(updateURL, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify( postData),
      });
    

      if (!res.ok) {
        const message = `An error has occured: ${res.status} - ${res.statusText}`;
        throw new Error(message);
      }

      Swal.fire({
        title: 'Updated!',
        text: 'this card has been updated',
        icon: 'success',
        confirmButtonText: 'Ok'
      })
      console.log("card added");

      
    } catch (err) {
      console.log("card not updated");
      Swal.fire({
        title: 'Try again!',
        text: 'Card has not been updated:'+err.message,
        icon: 'info',
        confirmButtonText: 'Ok'
      })
    }
  }
  
 
  
  return (
    <div className="card">
      <div className="card-header"> <Pen /> Update Card</div>
      <div className="card-body">
        <div className="form-group">
          <label>Select Account Number : </label>
          <select className="form-control">
            
            {list.map(item => 
      
        
      <option ref={accountId} value={item.id} key={item.id}>{item.accountNumber}</option> 
      )}
             
          </select>
           
        </div><br></br>
        <div className="form-group">
          <input type="text" className="form-control" defaultValue={card.cardNumber || ''}  ref={cardNumber} placeholder="cardNumber " />
        </div><br></br>
        <div className="form-group">
          <input type="text" className="form-control"  defaultValue={card.csv || ''} ref={csv} placeholder="csv " />
        </div><br></br>
        <div className="form-group">
          <input type="date" className="form-control" defaultValue={card.dateExpiration || ''}  ref={dateExpiration} placeholder="dateExpiration " />
        </div><br></br>
        <div className="form-group">
          <label>Select Card Type :</label>
          <select className="form-control" >
          <option ref={type} value={card.type || ''}>{card.type || ''}</option>
            <option ref={type} value={"MASTERCARD"}>MASTERCARD</option>
            <option ref={type} value={"VISA"}>VISA</option>
            <option ref={type} value={"VIRTUAL"}>VIRTUAL</option>
          </select>
          
        </div><br></br>
        <button className="btn btn-sm btn-primary" onClick={postData}> Update Card    </button>
     
      </div>
    </div>
  );
}
 
  export default UpdateCard;
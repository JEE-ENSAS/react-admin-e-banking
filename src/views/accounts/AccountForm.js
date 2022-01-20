
import React, { useRef, useState, useEffect } from "react";
import { getListUsers , baseURL} from '../../services/AccountService';
import { Plus } from "react-bootstrap-icons";
import { Redirect } from "react-router-dom";
 

function AccountForm() {

    const Swal = require('sweetalert2')



  const accountNumber = useRef(null);
  const balance = useRef(null);
  const currency = useRef(null);
  const userId = useRef(null);
  const type = useRef(null);
   
 
 
  
  const [list, setList] = useState([]);

  useEffect(() => {
    let mounted = true;
    getListUsers()
      .then(items => {
        if(mounted) {
          setList(items)
          
        }
      })
    return () => mounted = false;
  }, [])


  const [setPostResult] = useState(null);

  
  async function postData() {
    console.log("post data");
    
   postData = {
           
            "accountNumber": accountNumber.current.value,
            "balance": balance.current.value,
            "creationDate": new Date(),
            "currency": currency.current.value,
            "type": type.current.value,
            "userId": userId.current.value
      
    };
  
    try {
      const res = await fetch(baseURL, {
        method: "POST",
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
        title: 'Saved!',
        text: 'New account has been added',
        icon: 'success',
        confirmButtonText: 'Ok'
      })

      

       
    } catch (err) {
        Swal.fire({
            title: 'Try again!',
            text: 'Account has not been saved:' + err.message,
            icon: 'info',
            confirmButtonText: 'Ok'
          })
     
    }
  }
  

  return (
    <div className="card">
      <div className="card-header"  > <Plus />  Add New Account</div>
      <div className="card-body">
      <div className="form-group">
          <label>Select User : </label>
        <select className="form-control">
            
            {list.map(item => 
      
        
      <option ref={userId} value={item.id} key={item.id}>{item.username}</option> 
      )}
             
          </select>
           
        </div><br></br>
        <div className="form-group">
          <input type="text" className="form-control" ref={accountNumber} placeholder="accountNumber" />
        </div><br></br>
        <div className="form-group">
          <input type="text" className="form-control" ref={balance} placeholder="balance " />
        </div><br></br>
        <div className="form-group">
          <input type="text" className="form-control" ref={currency} placeholder="currency " />
        </div> <br></br>
        <div className="form-group">
        <label>Select Account Type :</label>
          <select className="form-control" >
            <option ref={type} value={"SAVING"}>SAVING</option>
            <option ref={type} value={"NORMAL"}>NORMAL</option>
           
          </select>
        </div><br></br>
        <button className="btn btn-sm btn-primary" onClick={postData}> Add Account  </button>
      

        
      </div>
    </div>
  );
}
 
export default AccountForm;
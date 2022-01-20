import React, { useRef, useState ,useEffect} from "react";
import { getParameter } from '../../services/SettingsService';
import { Row, Col } from 'react-bootstrap';
import CIcon from '@coreui/icons-react'
import {  cilSettings } from '@coreui/icons'

function Setting() {

  const Swal = require('sweetalert2')

  const baseURL = "https://my-parametrage-service.herokuapp.com/Parameter/update";

  const maxAmountForCashToCash = useRef(null);
  const maxAmountForCashToAccount = useRef(null);
  const maxAmountForAccountToCash = useRef(null);
  const maxAmountForAccountToAccount = useRef(null);
  const maxHoldingTimeForCashToCash = useRef(null);
  const maxHoldingTimeForCashToAccount = useRef(null);
  const maxHoldingTimeForAccountToCash = useRef(null);
  const maxHoldingTimeForAccountToAccount = useRef(null);
  const transferPercentageForCashToCash = useRef(null);
  const transferPercentageForCashToAccount = useRef(null);
  const transferPercentageForAccountToAccount = useRef(null);
  const transferPercentageForAccountToCash = useRef(null);


   
  const [list, setList] = useState([]);

  useEffect(() => {
    let mounted = true;
    getParameter()
      .then(items => {
        if(mounted) {
          setList(items)
          
        }
      })
    return () => mounted = false;
  }, [])

 
  async function postData() {
    console.log("accountId.current.value");
    
   postData = {
    "id": list.id,
    "maxAmountForCashToCash": maxAmountForCashToCash.current.value,
    "maxAmountForCashToAccount": maxAmountForCashToAccount.current.value,
    "maxAmountForAccountToCash": maxAmountForAccountToCash.current.value,
    "maxAmountForAccountToAccount": maxAmountForAccountToAccount.current.value,
    "maxHoldingTimeForCashToCash": maxHoldingTimeForCashToCash.current.value,
    "maxHoldingTimeForCashToAccount": maxHoldingTimeForCashToAccount.current.value,
    "maxHoldingTimeForAccountToCash": maxHoldingTimeForAccountToCash.current.value,
    "maxHoldingTimeForAccountToAccount": maxHoldingTimeForAccountToAccount.current.value,
    "transferPercentageForCashToCash": transferPercentageForCashToCash.current.value,
    "transferPercentageForCashToAccount": transferPercentageForCashToAccount.current.value,
    "transferPercentageForAccountToAccount":transferPercentageForAccountToAccount.current.value,
    "transferPercentageForAccountToCash": transferPercentageForAccountToCash.current.value
      
    };
    
    try {
      const res = await fetch(baseURL, {
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
        text: 'Settings have been changed!',
        icon: 'success',
        confirmButtonText: 'Ok'
      })

    } catch (err) {
      Swal.fire({
        title: 'Try again!',
        text: 'Settings are not changed:' + err.message,
        icon: 'info',
        confirmButtonText: 'Ok'
      })
    }
  }
  

  
  return (
    <div className="card">
      
      <div className="card-header"> <CIcon icon={cilSettings}  /> Settings</div>
      <div className="card-body">
          <b>Max Amount :</b>
    <Row>
      <Col>
          <div className="form-group">
            <label>Cash To Cash :</label>
            <input type="text"   defaultValue={list.maxAmountForCashToCash || ''} className="form-control" ref={maxAmountForCashToCash} placeholder="maxAmountForCashToCash" />
        </div>
        </Col>
        <Col>
        <div className="form-group">
            <label>Cash To Account :</label>
            <input type="text" className="form-control" defaultValue={list.maxAmountForCashToAccount || ''} ref={maxAmountForCashToAccount} placeholder="maxAmountForCashToAccount " />
        </div>
        </Col>
    </Row>
    <Row>
        <Col>
        <div className="form-group">
            <label>Account To Cash :</label>
            <input type="text" className="form-control" defaultValue={list.maxAmountForAccountToCash || ''}  ref={maxAmountForAccountToCash} placeholder="maxAmountForAccountToCash " />
        </div>
        </Col>
        <Col>
        <div className="form-group">
            <label> Account To Account :</label>
            <input type="test" className="form-control" defaultValue={list.maxAmountForAccountToAccount || ''} ref={maxAmountForAccountToAccount} placeholder="maxAmountForAccountToAccount " />
        </div>
        </Col>
  </Row>

<hr></hr>
  <b>Max Holding Time :</b>
    <Row>
      <Col>
          <div className="form-group">
            <label>Cash To Cash :</label>
            <input type="text"   defaultValue={list.maxHoldingTimeForCashToCash || ''} className="form-control" ref={maxHoldingTimeForCashToCash} placeholder="maxHoldingTimeForCashToCash" />
        </div>
        </Col>
        <Col>
        <div className="form-group">
            <label>Cash To Account :</label>
            <input type="text" className="form-control" defaultValue={list.maxHoldingTimeForCashToAccount || ''} ref={maxHoldingTimeForCashToAccount} placeholder="maxHoldingTimeForCashToAccount " />
        </div>
        </Col>
    </Row>
    <Row>
        <Col>
        <div className="form-group">
            <label>Account To Cash :</label>
            <input type="text" className="form-control" defaultValue={list.maxHoldingTimeForAccountToCash || ''}  ref={maxHoldingTimeForAccountToCash} placeholder="maxHoldingTimeForAccountToCash " />
        </div>
        </Col>
        <Col>
        <div className="form-group">
            <label> Account To Account :</label>
            <input type="test" className="form-control" defaultValue={list.maxHoldingTimeForAccountToAccount || ''} ref={maxHoldingTimeForAccountToAccount} placeholder="maxHoldingTimeForAccountToAccount " />
        </div>
        </Col>
  </Row>
        
  <hr></hr>
  <b>Transfer Percentage :</b>
    <Row>
      <Col>
          <div className="form-group">
            <label>Cash To Cash :</label>
            <input type="text"   defaultValue={list.transferPercentageForCashToCash || ''} className="form-control" ref={transferPercentageForCashToCash}   />
        </div>
        </Col>
        <Col>
        <div className="form-group">
            <label>Cash To Account :</label>
            <input type="text" className="form-control" defaultValue={list.transferPercentageForCashToAccount || ''} ref={transferPercentageForCashToAccount}  />
        </div>
        </Col>
    </Row>
    <Row>
        <Col>
        <div className="form-group">
            <label>Account To Cash :</label>
            <input type="text" className="form-control" defaultValue={list.transferPercentageForAccountToCash || ''}  ref={transferPercentageForAccountToCash}  />
        </div>
        </Col>
        <Col>
        <div className="form-group">
            <label> Account To Account :</label>
            <input type="test" className="form-control"    
             defaultValue={list.transferPercentageForAccountToAccount || ''} 
              ref={transferPercentageForAccountToAccount}   />
        </div>
        </Col>
  </Row>
        
        <br></br>
        <div className="form-group">
            <button className="btn btn-secondary btn-lg btn-block" onClick={postData}> Update Settings </button>
        </div>
        <br></br>
    
      </div>
    </div>
  );
}
 
  export default Setting;
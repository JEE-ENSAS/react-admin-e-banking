import React, { useRef, useState ,useEffect} from "react";
import { getParameter } from '../../services/SettingsService';
import { Row, Col } from 'react-bootstrap';
import CIcon from '@coreui/icons-react'
import {  cilSettings } from '@coreui/icons'

function Setting() {
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
  let transferPercentageForAccountToAccount = useRef(null);
  let transferPercentageForAccountToCash = useRef(null);


   
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

  const handleInputChange = event => {
    const { transferPercentageForAccountToCash, value } = event.target;
     
  };
  
  const [ setPostResult] = useState(null);

  const fortmatResponse = (res) => {
    return JSON.stringify(res, null, 2);
  }
  
  async function postData() {
    console.log("accountId.current.value");
    
   postData = {
      "id": list.id,
      "maxAmountForCashToCash": maxAmountForCashToCash.current.value,
      "maxAmountForCashToAccount": maxAmountForCashToAccount.current.value,
      "maxAmountForAccountToCash": maxAmountForAccountToCash.current.value,
      "maxAmountForAccountToAccount": maxAmountForAccountToAccount.current.value,
      "maxHoldingTimeForCashToCash": maxAmountForCashToCash.current.value,
      "maxHoldingTimeForCashToAccount" : maxAmountForCashToCash.current.value,
      "maxHoldingTimeForAccountToCash" : maxAmountForCashToCash.current.value,
      "maxHoldingTimeForAccountToAccount" : maxAmountForCashToCash.current.value,
      "transferPercentageForCashToCash" : maxAmountForCashToCash.current.value,
      "transferPercentageForCashToAccount": maxAmountForCashToCash.current.value,
      "transferPercentageForAccountToAccount" : maxAmountForCashToCash.current.value,
      "transferPercentageForAccountToCash" : maxAmountForCashToCash.current.value
      
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

      const data = await res.json();

      const result = {
        status: res.status + "-" + res.statusText,
        headers: {
          "Content-Type": res.headers.get("Content-Type"),
          "Content-Length": res.headers.get("Content-Length"),
        },
        data: data,
      };

      setPostResult(fortmatResponse(result));
    } catch (err) {
      setPostResult(err.message);
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
            <input type="text"   value={list.maxAmountForCashToCash || ''} className="form-control" ref={maxAmountForCashToCash} placeholder="maxAmountForCashToCash" />
        </div>
        </Col>
        <Col>
        <div className="form-group">
            <label>Cash To Account :</label>
            <input type="text" className="form-control" value={list.maxAmountForCashToAccount || ''} ref={maxAmountForCashToAccount} placeholder="maxAmountForCashToAccount " />
        </div>
        </Col>
    </Row>
    <Row>
        <Col>
        <div className="form-group">
            <label>Account To Cash :</label>
            <input type="text" className="form-control" value={list.maxAmountForAccountToCash || ''}  ref={maxAmountForAccountToCash} placeholder="maxAmountForAccountToCash " />
        </div>
        </Col>
        <Col>
        <div className="form-group">
            <label> Account To Account :</label>
            <input type="test" className="form-control" value={list.maxAmountForAccountToAccount || ''} ref={maxAmountForAccountToAccount} placeholder="maxAmountForAccountToAccount " />
        </div>
        </Col>
  </Row>

<hr></hr>
  <b>Max Holding Time :</b>
    <Row>
      <Col>
          <div className="form-group">
            <label>Cash To Cash :</label>
            <input type="text"   value={list.maxHoldingTimeForCashToCash || ''} className="form-control" ref={maxHoldingTimeForCashToCash} placeholder="maxHoldingTimeForCashToCash" />
        </div>
        </Col>
        <Col>
        <div className="form-group">
            <label>Cash To Account :</label>
            <input type="text" className="form-control" value={list.maxHoldingTimeForCashToAccount || ''} ref={maxHoldingTimeForCashToAccount} placeholder="maxHoldingTimeForCashToAccount " />
        </div>
        </Col>
    </Row>
    <Row>
        <Col>
        <div className="form-group">
            <label>Account To Cash :</label>
            <input type="text" className="form-control" value={list.maxHoldingTimeForAccountToCash || ''}  ref={maxHoldingTimeForAccountToCash} placeholder="maxHoldingTimeForAccountToCash " />
        </div>
        </Col>
        <Col>
        <div className="form-group">
            <label> Account To Account :</label>
            <input type="test" className="form-control" value={list.maxHoldingTimeForAccountToAccount || ''} ref={maxHoldingTimeForAccountToAccount} placeholder="maxHoldingTimeForAccountToAccount " />
        </div>
        </Col>
  </Row>
        
  <hr></hr>
  <b>Transfer Percentage :</b>
    <Row>
      <Col>
          <div className="form-group">
            <label>Cash To Cash :</label>
            <input type="text"   value={list.transferPercentageForCashToCash || ''} className="form-control" ref={transferPercentageForCashToCash}   />
        </div>
        </Col>
        <Col>
        <div className="form-group">
            <label>Cash To Account :</label>
            <input type="text" className="form-control" value={list.transferPercentageForCashToAccount || ''} ref={transferPercentageForCashToAccount}  />
        </div>
        </Col>
    </Row>
    <Row>
        <Col>
        <div className="form-group">
            <label>Account To Cash :</label>
            <input type="text" className="form-control" value={list.transferPercentageForAccountToCash || ''}  ref={transferPercentageForAccountToCash}  />
        </div>
        </Col>
        <Col>
        <div className="form-group">
            <label> Account To Account :</label>
            <input type="test" className="form-control"    
             value={list.transferPercentageForAccountToAccount || ''} 
             onChange={ (event) => transferPercentageForAccountToAccount=event.target.value }  ref={transferPercentageForAccountToAccount}   />
        </div>
        </Col>
  </Row>
        
        <br></br>
        <div className="form-group">
            <button className="btn btn-secondary btn-lg btn-block" onClick={postData}> Update  </button>
        </div>
        <br></br>
    
      </div>
    </div>
  );
}
 
  export default Setting;
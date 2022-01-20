import React, { useRef, useState, useEffect } from "react";
import { getListAccounts } from "../../services/AccountService";
import { baseURL } from "../../services/CardDataService";
import Swal from "sweetalert2";
import { Plus } from "react-bootstrap-icons";
function CardForm() {
  const [list, setList] = useState([]);

  useEffect(() => {
    getListAccounts().then((items) => setList(items));
  }, []);

  const accountId = useRef(null);
  const cardNumber = useRef(null);
  const csv = useRef(null);
  const dateExpiration = useRef(null);
  const type = useRef(null);

  async function postData() {
    try {
      const res = await fetch(baseURL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postData),
      });

      if (!res.ok) {
        const message = `An error has occured: ${res.status} - ${res.statusText}`;
        throw new Error(message);
      }

      Swal.fire({
        title: "Saved!",
        text: "New card has been saved",
        icon: "success",
        confirmButtonText: "Ok",
      });
    } catch (err) {
      Swal.fire({
        title: "Try again!",
        text: "Card has not been saved:" + err.message,
        icon: "info",
        confirmButtonText: "Ok",
      });
    }
  }

  return (
    <div className="card">
      <div className="card-header">
        <Plus /> Add New Card
      </div>
      <div className="card-body">
        <div className="form-group">
          <label>Select Account Number : </label>
          <select className="form-control">
            {list.map((item) => (
              <option ref={accountId} value={item.id} key={item.id}>
                {item.accountNumber}
              </option>
            ))}
          </select>
        </div>
        <br></br>
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            ref={cardNumber}
            placeholder="cardNumber "
          />
        </div>
        <br></br>
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            ref={csv}
            placeholder="csv "
          />
        </div>
        <br></br>
        <div className="form-group">
          <input
            type="date"
            className="form-control"
            ref={dateExpiration}
            placeholder="dateExpiration "
          />
        </div>
        <br></br>
        <div className="form-group">
          <label>Select Card Type :</label>
          <select className="form-control">
            <option ref={type} value={"MASTERCARD"}>
              MASTERCARD
            </option>
            <option ref={type} value={"VISA"}>
              VISA
            </option>
            <option ref={type} value={"VIRTUAL"}>
              VIRTUAL
            </option>
          </select>
        </div>
        <br></br>
        <button className="btn btn-sm btn-primary" onClick={postData}>
          Add Card
        </button>
      </div>
    </div>
  );
}

export default CardForm;

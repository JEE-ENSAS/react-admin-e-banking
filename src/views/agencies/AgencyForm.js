import React, { useRef, useState, useEffect } from "react";
import { getListUsers, baseURL } from "../../services/AccountService";
import { Plus } from "react-bootstrap-icons";
import Swal from "sweetalert2";

function AgencyForm() {
  const accountNumber = useRef(null);
  const balance = useRef(null);
  const currency = useRef(null);
  const userId = useRef(null);

  const [list, setList] = useState([]);

  useEffect(() => {
    getListUsers().then((items) => setList(items));
  }, []);

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
        text: "New account has been added",
        icon: "success",
        confirmButtonText: "Ok",
      });
    } catch (err) {
      Swal.fire({
        title: "Try again!",
        text: "Account has not been saved:" + err.message,
        icon: "info",
        confirmButtonText: "Ok",
      });
    }
  }

  return (
    <div className="card">
      <div className="card-header">
        <Plus /> Add New Agency
      </div>
      <div className="card-body">
        <div className="form-group">
          <label>Select Agent : </label>
          <select className="form-control">
            {list.map((item) => (
              <option ref={userId} value={item.id} key={item.id}>
                {item.username}
              </option>
            ))}
          </select>
        </div>
        <br></br>
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            ref={accountNumber}
            placeholder="Name"
          />
        </div>
        <br></br>
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            ref={balance}
            placeholder="Location "
          />
        </div>
        <br></br>
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            ref={currency}
            placeholder="City "
          />
        </div>
        <br></br>
        <button className="btn btn-sm btn-primary" onClick={postData}>
          Add Agency
        </button>
      </div>
    </div>
  );
}

export default AgencyForm;

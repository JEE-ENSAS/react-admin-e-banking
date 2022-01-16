/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { CSmartTable } from "@coreui/react-pro";
import { useDispatch, useSelector } from "react-redux";
import { CButton } from "@coreui/react";
import {
  FETCH_USER,
  SET_DATA_DESTINATAIRE,
  SET_DATA_SOURCE,
} from "src/actions/types";
import ModalComptes from "../transfer/ModalComptes";
import CIcon from "@coreui/icons-react";
import { cilTransfer, cilUser } from "@coreui/icons";
import ModalTransferFromUser from "./ModalTransferFromUser";
import classNames from "classnames";
import UserForm from "./UserForm";
import { fetchAccountByUser } from "src/actions/accountAction";

function UserList({ from, step, setStep }) {
  const userState = useSelector((state) => state["userReducer"]);

  const [modalCompteVisible, setModalCompteVisible] = useState(false);
  const [modalStep, setModalStep] = useState(1);
  const [displayClientInfoModal, setDisplayClientInfoModal] = useState(false);

  const [users, setUsers] = useState([...userState.users]);
  const [visibleFullScreenUsers, setVisibleFullScreenUsers] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    let clients = [];
    userState.users.forEach((item) => {
      const { id, cin, firstname, lastname, email } = item;
      clients = [
        ...clients,
        {
          id,
          cin,
          firstname,
          lastname,
          email,
          actions: false,
        },
      ];
    });
    setUsers([...clients]);
  }, []);

  const getClickedClient = (client) => {
    if (step === undefined || step === 0) {
      dispatch({
        type: SET_DATA_SOURCE,
        payload: { client },
      });
    } else {
      dispatch({
        type: SET_DATA_DESTINATAIRE,
        payload: { client },
      });
    }
    setModalCompteVisible(true);
  };

  const handelFullModal = (value) => {
    setModalStep(1);
    setVisibleFullScreenUsers(value);
  };

  const displayClientInfo = async (client) => {
    let myClient = userState["users"].find((user) => user.id === client.id);
    dispatch(fetchAccountByUser(client.id));
    dispatch({ type: FETCH_USER, payload: { user: myClient } });
    setDisplayClientInfoModal(!!client);
  };
  return (
    <>
      <CSmartTable
        items={users}
        columnFilter
        columnSorter
        pagination
        tableProps={{
          hover: true,
        }}
        clickableRows
        scopedColumns={{
          actions: (client) => (
            <td
              className={classNames("td-actions", {
                "d-flex justify-content-around align-items-center": !from,
                "text-center": from,
              })}
            >
              <CButton
                size="sm"
                color="outline-success"
                className="mx-1"
                onClick={() => getClickedClient(client)}
              >
                <CIcon icon={cilTransfer} />
              </CButton>

              {!from && (
                <CButton
                  size="sm"
                  color="outline-success"
                  onClick={() => displayClientInfo(client)}
                >
                  <CIcon icon={cilUser} />
                </CButton>
              )}
            </td>
          ),
        }}
      />
      {modalCompteVisible && (
        <ModalComptes
          from={from ? from : "userList"}
          step={step}
          setStep={setStep}
          visible={modalCompteVisible}
          setVisible={setModalCompteVisible}
          handelFullModal={handelFullModal}
        />
      )}
      {visibleFullScreenUsers && (
        <ModalTransferFromUser
          visible={visibleFullScreenUsers}
          setVisible={setVisibleFullScreenUsers}
          step={modalStep}
          setStep={setModalStep}
        />
      )}

      {displayClientInfoModal === true && (
        <UserForm
          visible={displayClientInfoModal}
          setVisible={setDisplayClientInfoModal}
        />
      )}
    </>
  );
}

export default UserList;

import React, { useState } from "react";
import { CSmartTable } from "@coreui/react-pro";
import { useDispatch, useSelector } from "react-redux";
import { CButton, CFormCheck } from "@coreui/react";
import { SET_DATA_DESTINATAIRE, SET_DATA_SOURCE } from "src/actions/types";
import ModalComptes from "../transfer/ModalComptes";
import CIcon from "@coreui/icons-react";
import { cilUser } from "@coreui/icons";
import ModalTransferFromUser from "./ModalTransferFromUser";
import classNames from "classnames";
import UserForm from "./UserForm";

function UserList({ from, step, setStep }) {
  const userState = useSelector((state) => state["userReducer"]);

  const [modalCompteVisible, setModalCompteVisible] = useState(false);
  const [modalStep, setModalStep] = useState(1);
  const [displayClientInfoModal, setDisplayClientInfoModal] = useState(false);

  const [users, setUsers] = useState([...userState.users]);
  const [visibleFullScreenUsers, setVisibleFullScreenUsers] = useState(false);

  const dispatch = useDispatch(null);

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

    const myUsers = users.map((user) =>
      user.id === client.id
        ? { ...user, status: true }
        : { ...user, status: false }
    );
    setUsers(myUsers);
    setModalCompteVisible(true);
  };

  const handelFullModal = (value) => {
    setModalStep(1);
    setVisibleFullScreenUsers(value);
  };

  const displayClientInfo = (client) => {
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
          status: (client) => (
            <td
              className={classNames("", {
                "d-flex justify-content-around align-items-center": !from,
                "text-center": from,
              })}
            >
              <CFormCheck
                type="checkbox"
                checked={client.status}
                onChange={() => getClickedClient(client)}
              />
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
      <ModalComptes
        from={from ? from : "userList"}
        step={step}
        setStep={setStep}
        visible={modalCompteVisible}
        setVisible={setModalCompteVisible}
        handelFullModal={handelFullModal}
      />
      <ModalTransferFromUser
        visible={visibleFullScreenUsers}
        setVisible={setVisibleFullScreenUsers}
        step={modalStep}
        setStep={setModalStep}
      />

      <UserForm
        visible={displayClientInfoModal}
        setVisible={setDisplayClientInfoModal}
      />
    </>
  );
}

export default UserList;

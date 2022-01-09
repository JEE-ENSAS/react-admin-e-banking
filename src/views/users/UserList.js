import React, { useState } from "react";
import { CSmartTable } from "@coreui/react-pro";
import { useDispatch, useSelector } from "react-redux";
import { CFormCheck } from "@coreui/react";
import { SET_DATA_DESTINATAIRE, SET_DATA_SOURCE } from "src/actions/types";
import ModalComptes from "../transfer/ModalComptes";
import ModalTransfer from "../transfer/ModalTransfer";

function UserList({ from, step, setStep }) {
  const userState = useSelector((state) => state["userReducer"]);

  const [modalCompteVisible, setModalCompteVisible] = useState(false);

  const [users, setUsers] = useState([...userState.users]);
  const [visibleFullScreen, setVisibleFullScreen] = useState(false);

  const dispatch = useDispatch(null);

  const getClickedClient = (client) => {
    if (typeof step !== "undefined") {
      dispatch({
        type: step === 0 ? SET_DATA_SOURCE : SET_DATA_DESTINATAIRE,
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
    console.log("handelFullModal", value);
    // setVisibleFullScreen(true);
  }

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
            <td className="text-center">
              <CFormCheck
                type="checkbox"
                checked={client.status}
                onChange={() => getClickedClient(client)}
              />
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
      <ModalTransfer
        visible={visibleFullScreen}
        setVisible={setVisibleFullScreen}
        step={step}
        setStep={setStep}
      />
    </>
  );
}

export default UserList;

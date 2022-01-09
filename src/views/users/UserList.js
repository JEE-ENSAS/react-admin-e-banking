import React, { useState } from "react";
import { CSmartTable } from "@coreui/react-pro";
import { useDispatch, useSelector } from "react-redux";
import {
  CButton,
  CFormCheck,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
} from "@coreui/react";
import { SET_DATA_DESTINATAIRE, SET_DATA_SOURCE } from "src/actions/types";
import ModalComptes from "../transfer/ModalComptes";
import { Stepper } from "react-form-stepper";
import Step0 from "../transfer/Step0";
import Step1 from "../transfer/Step1";
import Step2 from "../transfer/Step2";
import NextStepFooter from "../transfer/NextStepFooter";

function UserList({ from, step, setStep }) {
  const userState = useSelector((state) => state["userReducer"]);

  const [modalCompteVisible, setModalCompteVisible] = useState(false);
  const [modalStep, setModalStep] = useState(1);

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
      <ModalTransferFromUser
        visible={visibleFullScreenUsers}
        setVisible={setVisibleFullScreenUsers}
        step={modalStep}
        setStep={setModalStep}
      />
    </>
  );
}

export default UserList;

const ModalTransferFromUser = ({ visible, setVisible, step, setStep }) => {
  const { dataSource, dataDestination, transferInfo } = useSelector(
    (state) => state["transferReducer"]
  );

  const closeModal = () => {
    setVisible(false);
  };

  return (
    <>
      <CModal fullscreen visible={visible} onClose={() => setVisible(false)}>
        <CModalHeader
          closeButton={false}
          style={{ display: "block", padding: "0" }}
        >
          <Stepper
            steps={[
              { label: "Source" },
              { label: "Destainataire" },
              { label: "confirmation" },
            ]}
            activeStep={step}
          />
        </CModalHeader>
        <CModalBody>
          {step === 0 && <Step0 step={step} setStep={setStep} />}
          {step === 1 && <Step1 step={step} setStep={setStep} />}
          {step === 2 && (
            <Step2
              setStep={setStep}
              dataSource={dataSource}
              dataDestination={dataDestination}
              transferInfo={transferInfo}
            />
          )}
        </CModalBody>
        <CModalFooter>
          <div>
            <CButton color="secondary" onClick={() => closeModal()}>
              Close
            </CButton>
          </div>
          <div>
            <NextStepFooter step={step} setStep={setStep} />
          </div>
        </CModalFooter>
      </CModal>
    </>
  );
};

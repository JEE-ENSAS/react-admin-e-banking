import React from "react";
import {
  CButton,
  CForm,
  CFormInput,
  CInputGroup,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
} from "@coreui/react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { transferFromCashToAccountAction } from "src/actions/transfertActions";
import { useSelector } from "react-redux";

export default function CashToAccountModal({ visible, setVisible }) {
  const [transferInfo, setTransferInfo] = useState({
    cin: "",
    accountNumber: "",
    amount: 0,
  });

  const dispatch = useDispatch();
  const transferState =  useSelector((state) => state["transferReducer"] )
  
  
  const closeModal = () => {
    setVisible(false);
  };

  const setTransferInfoHandler = (e, field) => {
    setTransferInfo({ ...transferInfo, [field]: e.target.value });
  };

  const transferFromCashToAccount = () => {

    const myTransaction = {
      accountFrom: transferInfo.cin,
      accountTo: transferInfo.accountNumber,
      amount: parseInt(transferInfo.amount),
      transferType: transferState.transferInfo["operationType"],
      costType: transferState.transferInfo["soustraction"],
    };
    console.log(myTransaction);
    dispatch(transferFromCashToAccountAction(myTransaction));
    setVisible(false);
  };

  return (
    <>
      <CModal alignment="center" visible={visible} onClose={() => closeModal()}>
        <CModalHeader>
          <CModalTitle> Transfer from Cash to Account</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CForm>
            <CInputGroup className="mb-3">
              <CFormInput
                placeholder="cin of sender"
                value={transferInfo.cin}
                onChange={(e) => setTransferInfoHandler(e, "cin")}
              />
            </CInputGroup>
            <CInputGroup className="mb-4">
              <CFormInput
                placeholder="account of reciever"
                value={transferInfo.accountNumber}
                onChange={(e) => setTransferInfoHandler(e, "accountNumber")}
              />
            </CInputGroup>
            <CInputGroup className="mb-4">
              <CFormInput
                placeholder="amount to send"
                value={transferInfo.amount}
                onChange={(e) => setTransferInfoHandler(e, "amount")}
              />
            </CInputGroup>
          </CForm>
        </CModalBody>
        <CModalFooter>
          <CButton color="primary" onClick={() => transferFromCashToAccount()}>
            Enregistrer
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  );
}

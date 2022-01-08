import { CButton, CFormCheck, CListGroup, CListGroupItem, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle } from '@coreui/react';
import React, { useState } from 'react'

const ModalComptes = ({ visible, setVisible, setSelectedCompteHandler }) => {
  const [comptes, setComptes] = useState([
    { id: 1, label: "Pricipal Compte", isPrincipal: true, checked: true },
    { id: 2, label: "Second Compte", isPrincipal: false, checked: false },
    { id: 3, label: "Third Compte", isPrincipal: false, checked: false },
  ]);

  const changeCompte = (item) => {
    const myComptes = comptes.map((e) =>
      e.id === item.id
        ? { ...item, checked: !e.checked }
        : { ...e, checked: false }
    );
    setComptes(myComptes);
  };

  const closeModal = () => {
    const myComptes = comptes.map((item) => {
      return { ...item, checked: item.isPrincipal };
    });
    setComptes(myComptes);
    setSelectedCompteHandler(null);
    setVisible(false);
  };

  const saveCompteSelected = () => {
    const compte = comptes.find((item) => item.checked === true);
    if (compte) {
      setSelectedCompteHandler(compte);
    }
    setVisible(false);
  };

  return (
    <>
      <CModal alignment="center" visible={visible} onClose={() => closeModal()}>
        <CModalHeader>
          <CModalTitle>Choisir un compte </CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CListGroup>
            {comptes &&
              comptes.map((item, index) => (
                <CListGroupItem key={index}>
                  <CFormCheck
                    type="radio"
                    name="compte"
                    label={item.label}
                    checked={item.checked}
                    onChange={() => changeCompte(item)}
                  />
                </CListGroupItem>
              ))}
          </CListGroup>
        </CModalBody>
        <CModalFooter>
          <CButton onClick={() => saveCompteSelected()} color="primary">
            Save changes
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  );
};
  
 
export default ModalComptes;

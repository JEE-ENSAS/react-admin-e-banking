import {
  cilCreditCard,
  cilLockLocked,
  cilPencil,
  cilSave,
  cilSettings,
  cilUser,
} from "@coreui/icons";
import CIcon from "@coreui/icons-react";
import {
  CButton,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CNav,
  CNavItem,
  CNavLink,
  CRow,
  CTabContent,
  CTabPane,
} from "@coreui/react";
import React, { useState } from "react";

function UserForm({ visible, setVisible }) {
  const [activeTab, setActiveTab] = useState(1);
  const [editMode, setEditMode] = useState(false);

  const activeTabHandler = (tabIndex) => {
    setActiveTab(tabIndex);
  };

  return (
    <>
      <CModal fullscreen visible={visible} onClose={() => setVisible(false)}>
        <CModalHeader
          closeButton={false}
          style={{
            display: "block",
            paddingBottom: "1rem",
            textAlign: "center",
          }}
        >
          <CContainer>
            <CRow>
              <CCol md={8} lg={6} xl={6}>
                <CForm>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilUser} />
                    </CInputGroupText>
                    <CFormInput
                      placeholder="First Name"
                      autoComplete="First Name"
                      disabled={!editMode}
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>@</CInputGroupText>
                    <CFormInput
                      disabled={!editMode}
                      placeholder="Email"
                      autoComplete="email"
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText>
                    <CFormInput
                      disabled={!editMode}
                      placeholder="CIN"
                      autoComplete="CIN"
                    />
                  </CInputGroup>
                </CForm>
              </CCol>
              <CCol md={8} lg={6} xl={6}>
                <CForm>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilUser} />
                    </CInputGroupText>
                    <CFormInput
                      disabled={!editMode}
                      placeholder="Last Name"
                      autoComplete="Last Name"
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>@</CInputGroupText>
                    <CFormInput
                      disabled={!editMode}
                      placeholder="Telephone"
                      autoComplete="Telephone"
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText>
                    <CFormInput
                      disabled={!editMode}
                      placeholder="Password"
                      autoComplete="new-password"
                    />
                  </CInputGroup>
                </CForm>
              </CCol>
            </CRow>
          </CContainer>
          <div style={{ textAlign: "right" }}>
            {editMode && (
              <CButton
                className="mx-2"
                color="primary"
                onClick={() => setEditMode(!editMode)}
              >
                <CIcon icon={cilSave} />
              </CButton>
            )}
            <CButton
              className="mx-2"
              color="warning"
              onClick={() => setEditMode(!editMode)}
            >
              <CIcon icon={cilPencil} />
            </CButton>
          </div>
        </CModalHeader>
        <CModalBody>
          <CNav variant="pills" className="user-tabs">
            <CNavItem>
              <CNavLink
                className="cursor-pointer"
                active={activeTab === 1}
                onClick={() => activeTabHandler(1)}
              >
                <CIcon icon={cilCreditCard} className="me-2" />
                Comptes
              </CNavLink>
            </CNavItem>
            <CNavItem>
              <CNavLink
                className="cursor-pointer"
                active={activeTab === 2}
                onClick={() => activeTabHandler(2)}
              >
                <CIcon icon={cilSettings} className="me-2" />
                Setting
              </CNavLink>
            </CNavItem>
          </CNav>
          <CTabContent className="rounded-bottom">
            <CTabPane className="p-3 preview" visible={activeTab === 1}>
              {"activeTab: " + activeTab}
            </CTabPane>
            <CTabPane className="p-3 preview" visible={activeTab === 2}>
              {"activeTab: " + activeTab}
            </CTabPane>
          </CTabContent>
        </CModalBody>
        <CModalFooter>
          <div>
            <CButton color="secondary">Close</CButton>
          </div>
        </CModalFooter>
      </CModal>
    </>
  );
}

export default UserForm;

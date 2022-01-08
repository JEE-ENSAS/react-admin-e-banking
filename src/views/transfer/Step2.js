import {
  CButton,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCardText,
  CCardTitle,
  CCol,
  CRow,
  CInputGroupText,
  CInputGroup,
  CFormInput,
} from "@coreui/react";
import React from "react";

const Step2 = ({ dataSource, dataDestaination, setStep }) => {
  return (
    <>
      <CRow className="mt-5">
        <CCol style={{ padding: "1rem 1rem" }}>
          <CardConfirmation
            setStep={setStep}
            header="Source"
            data={dataSource}
          />
        </CCol>
        <CCol style={{ padding: "1rem 1rem" }}>
          <CardConfirmation
            setStep={setStep}
            header="Destainataire"
            data={dataDestaination}
          />
        </CCol>
        <CCol style={{ padding: "1rem 1rem" }}>
          <CardPrice />
        </CCol>
      </CRow>
    </>
  );
};

export default Step2;

const CardConfirmation = ({ data, header, setStep }) => {
  return (
    <>
      {data && data.client && data.compte && (
        <CCard className="text-center">
          <CCardHeader> {header} </CCardHeader>
          <CCardBody>
            <CCardTitle>{data.client.name}</CCardTitle>
            <CCardText className="py-5">
              With supporting text below as a natural lead-in to additional
              content.
            </CCardText>
            <CButton
              onClick={() => setStep(header && header === "Source" ? 0 : 1)}
            >
              Modfier
            </CButton>
          </CCardBody>

          <CCardFooter className="text-medium-emphasis">
            {data.compte.label}
          </CCardFooter>
        </CCard>
      )}
    </>
  );
};

const CardPrice = () => {
  return (
    <>
      <CCard className="text-center">
        <CCardHeader> Prix&Motif </CCardHeader>
        <CCardBody>
          {/* <CCardTitle> </CCardTitle> */}
          <CCardText className="py-5">
            <CInputGroup size="sm" className="mb-4">
              <CInputGroupText id="inputGroup-sizing-sm">Prix</CInputGroupText>
              <CFormInput
                aria-label="Sizing example input"
                aria-describedby="inputGroup-sizing-sm"
              />
            </CInputGroup>
            <CInputGroup className="">
              <CInputGroupText id="inputGroup-sizing-default">
                Motif
              </CInputGroupText>
              <CFormInput
                aria-label="Sizing example input"
                aria-describedby="inputGroup-sizing-default"
              />
            </CInputGroup>
          </CCardText>
          {/* <CButton>Modfier</CButton> */}
        </CCardBody>

        <CCardFooter className="text-medium-emphasis">2 days ago</CCardFooter>
      </CCard>
    </>
  );
};
  
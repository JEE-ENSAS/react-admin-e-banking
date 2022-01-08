import React from "react";
import {
  CButton,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
} from "@coreui/react";
import { Stepper } from "react-form-stepper";
import Step0 from "./Step0";
import Step1 from "./Step1";
import Step2 from "./Step2";
import NextStepFooter from "./NextStepFooter";

const ModalTransfer = ({
  visible,
  setVisible,
  step,
  setStep,
  dataSource,
  setDataSource,
  dataDestaination,
  setDataDestaination,
}) => {
  const getClientSource = (client) => {
    setDataSource({ ...dataSource, client });
  };
  const getCompteSource = (compte) => {
    if (compte) {
      setDataSource({ ...dataSource, compte });
    }
  };

  const getClientDestaination = (client) => {
    setDataDestaination({ ...dataDestaination, client });
  };
  const getCompteDestaination = (compte) => {
    if (compte) {
      setDataDestaination({ ...dataDestaination, compte });
    }
  };

  const closeModal = () => {
    setVisible(false);
    setStep(0);
    console.log("closeModal", dataSource, dataDestaination);
  };

  return (
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
        {step === 0 && (
          <Step0
            setClientSource={(e) => getClientSource(e)}
            setCompteSourceHandler={(e) => getCompteSource(e)}
          />
        )}
        {step === 1 && (
          <Step1
            setClientDestaination={(e) => getClientDestaination(e)}
            setCompteDestainationHandler={(e) => getCompteDestaination(e)}
          />
        )}
        {step === 2 && (
          <Step2
            setStep={setStep}
            dataSource={dataSource}
            dataDestaination={dataDestaination}
          />
        )}
      </CModalBody>
      <CModalFooter style={{ justifyContent: "space-between" }}>
        <div>
          <CButton color="secondary" onClick={() => closeModal()}>
            Close
          </CButton>
        </div>
        <div>
          <NextStepFooter
            dataSource={dataSource}
            dataDestaination={dataDestaination}
            step={step}
            setStep={setStep}
          />
        </div>
      </CModalFooter>
    </CModal>
  );
};

export default ModalTransfer;

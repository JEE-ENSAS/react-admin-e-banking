import { CButton } from "@coreui/react";
import React from "react";

const NextStepFooter = ({ dataSource, dataDestaination, step, setStep }) => {
    if (step === 0) {
      return (
        <CButton
          disabled={!dataSource.compte}
          color="primary"
          onClick={() => setStep(step + 1)}
        >
          Suivant
        </CButton>
      );
    }
    if (step === 1) {
      return (
        <CButton
          disabled={!dataDestaination.compte}
          color="primary"
          onClick={() => setStep(step + 1)}
        >
          Suivant
        </CButton>
      );
    }
    if (step === 2) {
      return (
        <CButton color="primary" onClick={() => console.log("Confirmed")}>
          Enregistrer
        </CButton>
      );
    }
  };
  

  export default NextStepFooter;
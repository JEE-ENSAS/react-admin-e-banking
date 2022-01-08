import React, { useState } from "react";
import UserList from "../users/UserList";
import ModalComptes from "./ModalComptes";

const Step1 = ({ setClientDestaination, setCompteDestainationHandler }) => {
  const [visible, setVisible] = useState(false);

  const setSelectedCompteHandler = (compte) => {
    setCompteDestainationHandler(compte);
  };

  const clientSource = (item) => {
    if (item) {
      setVisible(true);
      setClientDestaination(item);
    }
  };

  return (
    <>
      <UserList from={"modal"} clientSource={clientSource} />
      <ModalComptes
        visible={visible}
        setVisible={setVisible}
        setSelectedCompteHandler={(e) => setSelectedCompteHandler(e)}
      />
    </>
  );
};

export default Step1;

import React, { useState } from "react";
import UserList from "../users/UserList";
import ModalComptes from "./ModalComptes";

const Step0 = ({ setClientSource, setCompteSourceHandler }) => {
    const [visible, setVisible] = useState(false);
  
    const setSelectedCompteHandler = (compte) => {
      setCompteSourceHandler(compte);
    };
  
    const clientSource = (item) => {
      if (item) {
        setVisible(true);
        setClientSource(item);
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

export default Step0;

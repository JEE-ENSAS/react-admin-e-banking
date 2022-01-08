import React, { useState, memo } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  CSidebar,
  CSidebarBrand,
  CSidebarNav,
  CSidebarToggler,
  CButton,
} from "@coreui/react";
import { AppSidebarNav } from "./AppSidebarNav";
import SimpleBar from "simplebar-react";
import "simplebar/dist/simplebar.min.css";

import navigation from "../_nav";
import { Link } from "react-router-dom";
import ModalTransfer from "src/views/transfer/ModalTransfer";

const AppSidebar = () => {
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);

  const [dataSource, setDataSource] = useState({ client: null, compte: null });

  const [dataDestaination, setDataDestaination] = useState({
    client: null,
    compte: null,
  });
  const [step, setStep] = useState(dataSource.compte ? 1 : 0);
  const { sidebarShow, sidebarUnfoldable } = useSelector(
    (state) => state["userReducer"]
  );

  return (
    <>
      <CSidebar
        position="fixed"
        unfoldable={sidebarUnfoldable}
        visible={sidebarShow}
        onVisibleChange={(visible) => {
          dispatch({ type: "set", sidebarShow: visible });
        }}
      >
        <CSidebarBrand className="d-none d-md-flex" to="/">
          <Link to="/">
            <p className="banking-logo">E-banking</p>
          </Link>
        </CSidebarBrand>
        <CSidebarNav>
          <SimpleBar>
            <div className="text-center py-3">
              <CButton
                color="primary"
                className="cursor-pointer text-center  px-5"
                onClick={() => setVisible(true)}
              >
                Transfer Money
              </CButton>
            </div>
            <AppSidebarNav items={navigation} />
          </SimpleBar>
        </CSidebarNav>
        <CSidebarToggler
          className="d-none d-lg-flex"
          onClick={() => dispatch({ type: "set", payload: sidebarShow })}
        />
      </CSidebar>
      <ModalTransfer
        visible={visible}
        setVisible={setVisible}
        dataSource={dataSource}
        setDataSource={setDataSource}
        dataDestaination={dataDestaination}
        setDataDestaination={setDataDestaination}
        step={step}
        setStep={setStep}
      />
    </>
  );
};

export default memo(AppSidebar);

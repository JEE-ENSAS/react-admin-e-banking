import React, { useEffect, useState } from "react";
import { CSmartTable } from "@coreui/react-pro";
import { getListAccounts } from "../../services/AccountService";
import Button from "react-bootstrap/Button";
import { Plus } from "react-bootstrap-icons";
import { CCollapse, CButton, CBadge, CCardBody } from "@coreui/react";
import { useHistory } from "react-router-dom";
import Swal from "sweetalert2";

function AgenciesList() {
  const history = useHistory();

  const [list, setList] = useState([]);
  const [details, setDetails] = useState([]);

  useEffect(() => {
    getListAccounts().then((items) => setList(items));
  }, []);

  const columns = [
    { key: "accountNumber" },
    { key: "balance" },
    { key: "Type" },
    { key: "currency", _style: { width: "40%" } },
    { key: "creationDate", _style: { width: "20%" } },
    {
      key: "show_details",
      label: "",
      _style: { width: "1%" },
      filter: false,
      sorter: false,
      _props: { color: "", className: "fw-semibold" },
    },
  ];
  const getBadge = (isEnabled) => {
    return isEnabled ? "success" : "warning";
  };

  const toggleDetails = (index) => {
    const position = details.indexOf(index);
    let newDetails = details.slice();
    if (position !== -1) {
      newDetails.splice(position, 1);
    } else {
      newDetails = [...details, index];
    }
    setDetails(newDetails);
  };

  const deleteAccount = (index) => {
    Swal.fire({
      title: "Do you want to delete this account?",

      showCancelButton: true,
      confirmButtonText: "Delete",
    }).then((result) => {
      if (result.isConfirmed) {
        //  deleteAccount(index);
      }
    });
  };
  return (
    <div>
      <div className="d-flex justify-content-end">
        <a href="/cards#/account">
          <Button>
            <Plus /> New Agency
          </Button>
        </a>
      </div>

      <h3> Agencies List</h3>
      <hr></hr>
      <CSmartTable
        activePage={3}
        cleaner
        clickableRows
        columns={columns}
        columnFilter
        columnSorter
        footer
        items={list}
        itemsPerPageSelect
        itemsPerPage={5}
        pagination
        scopedColumns={{
          status: (item) => (
            <td>
              <CBadge color={getBadge(item.isEnabled)}>
                {item.isEnabled ? "data" : "null"}
              </CBadge>
            </td>
          ),
          show_details: (item) => {
            return (
              <td className="py-2">
                <CButton
                  color="primary"
                  variant="outline"
                  shape="square"
                  size="sm"
                  onClick={() => {
                    toggleDetails(item.id);
                  }}
                >
                  {details.includes(item.id) ? "Hide" : "Action"}
                </CButton>
              </td>
            );
          },
          details: (item) => {
            return (
              <CCollapse visible={details.includes(item.id)}>
                <CCardBody>
                  <p className="text-muted">
                    Creation Date : {item.creationDate}
                  </p>
                  <CButton
                    size="sm"
                    color="info"
                    onClick={() => {
                      history.push({
                        pathname: "/editAccount",
                        id: item.id,
                      });
                    }}
                  >
                    Update
                  </CButton>
                  {"    "}

                  <CButton
                    size="sm"
                    color="danger"
                    className="ml-1"
                    onClick={() => {
                      deleteAccount(item.id);
                    }}
                  >
                    Delete
                  </CButton>
                </CCardBody>
              </CCollapse>
            );
          },
        }}
        selectable
        sorterValue={{ column: "name", state: "asc" }}
        tableFilter
        tableHeadProps={{
          color: "",
        }}
        tableProps={{
          striped: true,
          hover: true,
        }}
      />
    </div>
  );
}

export default AgenciesList;

import React, { useEffect, useState } from "react";
import { CSmartTable } from "@coreui/react-pro";
import { getListTransfers } from "../../services/TransferService";

function CardList() {
  const [list, setList] = useState([]);

  useEffect(() => {
    getListTransfers().then((items) => setList(items));
  }, []);
  const columns = [
    { key: "date", _style: { width: "20%" } },
    { key: "amount", _style: { width: "20%" } },
    { key: "accountFrom", _style: { width: "20%" } },
    { key: "accountTo", _style: { width: "20%" } },
    { key: "transferType", _style: { width: "20%" } },
    { key: "costType", _style: { width: "20%" } },
  ];
  return (
    <div>
      <h3> Transfers List</h3>
      <hr />
      <CSmartTable
        columns={columns}
        items={list}
        itemsPerPage={8}
        columnFilter
        columnSorter
        footer
        itemsPerPageSelect
        pagination
        clickableRows
      />
    </div>
  );
}

export default CardList;

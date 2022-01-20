import React, { useEffect, useState } from 'react';
import { CSmartTable } from '@coreui/react-pro'
import { getListTransfers } from '../../services/TransferService';
 

function CardList() {
  const [list, setList] = useState([]);

  useEffect(() => {
    let mounted = true;
    getListTransfers()
      .then(items => {
        if(mounted) {
          setList(items)
          console.log(`transfers list`);
        }
      })
    return () => mounted = false;
  }, [])
  const columns = [
    {key: 'date', _style: { width: '20%' } },
    {key: 'amount', _style: { width: '20%' } },
    {key: 'accountFrom', _style: { width: '20%' } },
    { key: 'accountTo', _style: { width: '20%' } },
    { key: 'transferType', _style: { width: '20%' } },
    {key: 'costType', _style: { width: '20%' } },
    
  ]
  return (
    <div>
        
      
        <h3> Transfers List</h3>
        <hr></hr>
        <CSmartTable

          columns={columns}
          columnFilter
          columnSorter
          footer
          items={list}
          itemsPerPageSelect
          itemsPerPage={5}
          pagination
          
          clickableRows
        />
    </div>
)
}

export default CardList;
 
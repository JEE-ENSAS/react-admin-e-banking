import React, { useEffect, useState } from 'react';
import { CSmartTable } from '@coreui/react-pro'
import { getList } from '../../services/CardDataService';
import Button from "react-bootstrap/Button";
import 'bootstrap/dist/css/bootstrap.min.css';
import '@coreui/coreui/dist/css/coreui.min.css';
import { Plus } from "react-bootstrap-icons";
import { CCollapse ,CButton,CBadge,CCardBody} from '@coreui/react';


function CardList() {
  const [list, setList] = useState([]);
  const [details, setDetails] = useState([])
  useEffect(() => {
    let mounted = true;
    getList()
      .then(items => {
        if(mounted) {
          setList(items)
          console.log(`card list`);
        }
      })
    return () => mounted = false;
  }, [])
  const columns = [
    {key: 'accountId',},
    {key: 'cardNumber',},
    {key: 'csv',},
    { key: 'dateExpiration', _style: { width: '40%' } },
    { key: 'type', _style: { width: '20%' } },
    {key: 'isEnabled',},

    {
      key: 'show_details',
      label: '',
      _style: { width: '1%' },
      filter: false,
      sorter: false,
      _props: { color: 'primary', className: 'fw-semibold' },
    },
  ]
  const getBadge = (isEnabled) => {
    switch (isEnabled) {
      case 'true':
        return 'success'
      case 'false':
        return 'warning'
      
    }
  }
  const toggleDetails = (index) => {
    const position = details.indexOf(index)
    let newDetails = details.slice()
    if (position !== -1) {
      newDetails.splice(position, 1)
    } else {
      newDetails = [...details, index]
    }
    setDetails(newDetails)
  }
  return (
    <div>
        
        <div className="d-flex justify-content-end">
           <a href="/cards#/card" >
                <Button   variant="info">  <Plus /> New Card  </Button>
            </a>
        </div>
       
        <h3>Cards List</h3>
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
          <CBadge color={getBadge(item.isEnabled)}>{item.id}</CBadge>
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
                toggleDetails(item.id)
              }}
            >
              {details.includes(item.id) ? 'Hide' : 'Action'}
            </CButton>
          </td>
        )
      },
      details: (item) => {
        return (
          <CCollapse visible={details.includes(item.id)}>
            <CCardBody>
              <h5>{item.cardHolderName}</h5>
              <p className="text-muted">Use since: {item.dateExpiration}</p>
              <CButton size="sm" color="info">
                Update
              </CButton>{'    '}
              <CButton size="sm" color="success" className="ml-1">
                 Activate
              </CButton>{'    '}
              <CButton size="sm" color="warning">
                Desactivate
              </CButton>{'    '}
              <CButton size="sm" color="danger" className="ml-1">
                Delete
              </CButton>
            </CCardBody>
          </CCollapse>
        )
      },
    }}
    selectable
    sorterValue={{ column: 'name', state: 'asc' }}
    tableFilter
    tableHeadProps={{
      color: 'primary',
    }}
    tableProps={{
      striped: true,
      hover: true,
    }} 
        />
    </div>
)
}

export default CardList;
 
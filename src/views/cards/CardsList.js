import React, { useEffect, useState } from 'react';
import { CSmartTable } from '@coreui/react-pro'
import { getList,enabledCard,disabledCard } from '../../services/CardDataService';
import Button from "react-bootstrap/Button";
import { Plus } from "react-bootstrap-icons";
import { CCollapse ,CButton,CBadge,CCardBody} from '@coreui/react';
import { useHistory  } from "react-router-dom";

function CardList() {

  const [list, setList] = useState([]);
  
  const [details, setDetails] = useState([])

  const Swal = require('sweetalert2')
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

 const history = useHistory();

  const columns = [
    
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
      _props: { color: '', className: 'fw-semibold' },
    },
  ]


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
  
  const enableCard = (index) => {
    Swal.fire({
      title: 'Do you want to enable this card?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Enable',
      denyButtonText: `Don't`,
    }).then((result) => {
       
      if (result.isConfirmed) {
        enabledCard(index);
       
      } else if (result.isDenied) {
        Swal.fire('This card is disabled', '', 'info')
      }
    })
  }
  const disableCard = (index) => {
    Swal.fire({
      title: 'Do you want to disable this card?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Enable',
      denyButtonText: `Don't`,
    }).then((result) => {
       
      if (result.isConfirmed) {
        disabledCard(index);
       
      } else if (result.isDenied) {
        Swal.fire('This card is enabled', '', 'info')
      }
    })
  }
  const deleteCard = (index) => {
    Swal.fire({
      title: 'Do you want to delete this card?',
      
      showCancelButton: true,
      confirmButtonText: 'Delete',
       
    }).then((result) => {
       
      if (result.isConfirmed) {
        enabledCard(index);
       
      }  
    })
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
      isEnabled: (item) => (
        
         
          <td><CBadge bg="danger"> </CBadge>{item.isEnabled ? 'Active' : 'Not Active'}  </td>
        //    <td><CBadge bg="danger">Success</CBadge></td>
        
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
              <CButton size="sm" color="info"  onClick={() => {
               let path = "/editCard"; 
               history.push({
                pathname: '/editCard',
                id: item.id,  // query string
             
              }); 
                
              }}>
                Update
              </CButton>{'    '}
              <CButton size="sm" color="success" className="ml-1"  onClick={() => {
                enableCard(item.id)
              }}> 
                 Activate
              </CButton>{'    '}
              <CButton size="sm" color="warning"  onClick={() => {
                disableCard(item.id)
              }}>
                Desactivate
              </CButton>{'    '}
              <CButton size="sm" color="danger" className="ml-1"  onClick={() => {
                deleteCard(item.id)
              }}>
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
      color: ' ',
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
 

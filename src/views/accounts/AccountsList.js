import React, { useEffect, useState } from 'react';
import { CSmartTable } from '@coreui/react-pro'
import { getListAccounts,enabledAccount,disabledAccount } from '../../services/AccountService';
import Button from "react-bootstrap/Button";
import { Plus } from "react-bootstrap-icons";
import { CCollapse ,CButton,CBadge,CCardBody} from '@coreui/react';
import { useHistory  } from "react-router-dom";

function AccountsList() {

  const Swal = require('sweetalert2')

  const history = useHistory();

  const [list, setList] = useState([]);
  const [details, setDetails] = useState([])

  useEffect(() => {
    let mounted = true;

    getListAccounts()
      .then(items => {
        if(mounted) {
          setList(items)
          console.log(`transfers list`);
        }
      })
      
    return () => mounted = false;


  }, [])
  const columns = [
    {key: 'accountNumber',},
    {key: 'balance', },
    {key: 'Type', }, 
    {key: 'currency', _style: { width: '40%' } },
    {key: 'creationDate', _style: { width: '20%' } },
    {
      key: 'show_details',
      label: '',
      _style: { width: '1%' },
      filter: false,
      sorter: false,
      _props: { color: '', className: 'fw-semibold' },
    },
  ]
  const getBadge = (isEnabled) => {
    switch (isEnabled) {
      case true:
        return 'success'
      case false:
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
  
  const enableAccount = (index) => {
    Swal.fire({
      title: 'Do you want to enable this account?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Enable',
      denyButtonText: `Don't`,
    }).then((result) => {
       
      if (result.isConfirmed) {
      //  enabledAccount(index);
      enabledAccount(index);
      } else if (result.isDenied) {
        Swal.fire('This account is disabled', '', 'info')
      }
    })
  }
  const disableAccount = (index) => {
    Swal.fire({
      title: 'Do you want to disable this account?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Disable',
      denyButtonText: `Don't`,
    }).then((result) => {
       
      if (result.isConfirmed) {
     
     disabledAccount(index);
      } else if (result.isDenied) {
        Swal.fire('This account is enabled', '', 'info')
      }
    })
  }
  const deleteAccount = (index) => {
    Swal.fire({
      title: 'Do you want to delete this account?',
      
      showCancelButton: true,
      confirmButtonText: 'Delete',
       
    }).then((result) => {
       
      if (result.isConfirmed) {
      //  deleteAccount(index);
       
      }  
    })
  }
  return (
    <div>
        <div className="d-flex justify-content-end">
           <a href="/cards#/account" >
           <Button> <Plus /> New Account </Button>
            </a>
        </div>

     
        <h3> Accounts List</h3>
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
                 <CBadge color={getBadge(item.isEnabled)}>{
                  item.isEnabled == true? 'data' : 'null' }    </CBadge>
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
                      
                     <p className="text-muted">Creation Date  : {item.creationDate}</p>
                     <CButton size="sm" color="info"  onClick={() => {
             
               history.push({
                pathname: '/editAccount',
                id: item.id,  // query string
             
              }); 
                
              }}>
                       Update
                     </CButton>{'    '}
                     <CButton size="sm" color="success" className="ml-1"  onClick={() => {
                       enableAccount(item.id)
                     }}> 
                        Activate
                     </CButton>{'    '}
                     <CButton size="sm" color="warning"  onClick={() => {
                       disableAccount(item.id)
                     }}>
                       Desactivate
                     </CButton>{'    '}
                     <CButton size="sm" color="danger" className="ml-1"  onClick={() => {
                       deleteAccount(item.id)
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

export default AccountsList;
 
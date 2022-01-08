import React, { useState } from 'react'
import { CSmartTable } from '@coreui/react-pro'
import { useSelector, } from 'react-redux'
import { CFormCheck } from '@coreui/react'


function UserList({ from, clientSource }) {

    const userState = useSelector(state => state['userReducer'])
    
    const [users, setUsers] = useState([...userState.users])

    const getClickedRow = (row) => {
        if (from === 'modal') {
            const myUsers = users.map(user => user.id === row.id ? { ...user, status: true } : { ...user, status: false })
            setUsers(myUsers)
            clientSource(row)
        }
    }


    return (
        <div>
            <CSmartTable
                items={users}
                columnFilter
                columnSorter
                pagination
                tableProps={{
                    hover: true,
                }}
                clickableRows
                // onRowClick={(row) => getClickedRow(row)}
                // selectable={selectable}
                // onSelectedItemsChange={(items) => getFirstItem(items)  }
                scopedColumns={{
                    status: (item) => (
                        <td className="text-center" >
                            <CFormCheck type="checkbox" checked={item.status} onChange={() => getClickedRow(item) } />
                        </td>
                    ),
                }}
            />
        </div>
    )
}

export default UserList

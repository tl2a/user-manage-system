import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from './redux/store';
import { Button, Table } from 'react-bootstrap';
import EditModal from './shared/EditModal';
import AddModal from './shared/AddModal';
import './App.css'

function App() {
  const [modalAdd, setModalAdd] = useState(false);
  const [modalEdit, setModalEdit] = useState(false);
  const [userDetails, setUserDetails] = useState<any>();
  const users = useSelector((state: RootState) => state.user.value);
  const dispatch = useDispatch();
  return (
    <div className="App">
      <div className="container p-2">
      <Button variant="primary" onClick={() => setModalAdd(true)}>
        Add User
      </Button>

      <Table bordered hover className='mt-2'>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>User Group</th>
            <th>User Authorization</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (<tr key={user.userId} onClick={() => {setUserDetails(user); setModalEdit(true);}}>
              <td>{user.firstName}</td>
              <td>{user.lastName}</td>
              <td>{user.userGroup}</td>
              <td>{((user.userAuthorizations).map(it => {if(it.granted) return it.authorizationKey})).toString().replace(/(^,)|(,$)/g, "")}</td>
            </tr>))
          }
        </tbody>
      </Table>

      <EditModal
        show={modalEdit}
        onHide={() => setModalEdit(false)}
        details={userDetails}
      />

      <AddModal
        show={modalAdd}
        onHide={() => setModalAdd(false)}
      />
      </div>

    </div>
  )
}

export default App

import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from './redux/store';
import { Button, Table } from 'react-bootstrap';
import EditModal from './shared/EditModal';
import AddModal from './shared/AddModal';
import './App.css'
import axios from 'axios';
import { getUser } from './redux/user';

function App() {
  const [modalAdd, setModalAdd] = useState(false);
  const [modalEdit, setModalEdit] = useState(false);
  const [userDetails, setUserDetails] = useState<any>();
  let userList = useSelector((state: RootState) => state.user.value);
  const [users, setUsers] = useState<any>([]);
  const dispatch = useDispatch();

  useEffect(() => {
    axios .get('http://127.0.0.1:3002/')
    .then(res => {
      dispatch(getUser(res.data))
    })
    .catch(err => console.log(err))
  }, [])

  useEffect(() => {
    setUsers(userList)
  }, [userList])
  
  
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
          {users.length!==0 && users.map((user:any) => (<tr key={user.userId} onClick={() => {setUserDetails(user); setModalEdit(true);}}>
              <td>{user.firstName}</td>
              <td>{user.lastName}</td>
              <td>{user.userGroup}</td>
              <td>{((user.userAuthorizations).map((it:any) => {if(it.granted) return it.authorizationKey})).toString().replace(/(^,)|(,$)/g, "")}</td>
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

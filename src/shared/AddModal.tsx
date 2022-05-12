import { useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { addUser } from "../redux/user";
import { v4 as uuidv4 } from 'uuid';

interface modal {
    show: boolean;
    onHide: () => void;
}

const options1 = [
    {
      label: "Operator",
      value: "Operator",
    },
    {
      label: "Administrator",
      value: "Administrator",
    },
    {
      label: "Service",
      value: "Service",
    },
  ];

function AddModal(props:modal) {
  const dispatch = useDispatch();

  const [userAuthorizations, setUserAuthorizations] = useState([
    {
      "authorizationKey": "jumping",
      "granted": false
    },
    {
      "authorizationKey": "standing",
      "granted": false
    },
    {
      "authorizationKey": "sitting",
      "granted": false
    },
    {
      "authorizationKey": "running",
      "granted": false
    }
  ]);

  const [user, setUser] = useState<any>({
    "userId": uuidv4(),
    "firstName": "",
    "lastName": "",
    "userGroup": "",
    "userAuthorizations": [
      {
        "authorizationKey": "jumping",
        "granted": false
      },
      {
        "authorizationKey": "standing",
        "granted": false
      },
      {
        "authorizationKey": "sitting",
        "granted": false
      },
      {
        "authorizationKey": "running",
        "granted": false
      }
    ]
  });

  useEffect(() => {
    setUser({...user, userAuthorizations: userAuthorizations.filter(st => st.granted)});
  }, [userAuthorizations]);
  

  const adduser = (e:any) => {
      e.preventDefault();
      dispatch(addUser(user));
      setUser({
        "userId": uuidv4(),
        "firstName": "",
        "lastName": "",
        "userGroup": "",
        "userAuthorizations": [
          {
            "authorizationKey": "jumping",
            "granted": false
          },
          {
            "authorizationKey": "standing",
            "granted": false
          },
          {
            "authorizationKey": "sitting",
            "granted": false
          },
          {
            "authorizationKey": "running",
            "granted": false
          }
        ]
      });
      props.onHide();
  }
  

    return (
      <Modal
        show={props.show}
        onHide={props.onHide}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Add User
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        {user && <Form onSubmit={adduser}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>First Name</Form.Label>
                <Form.Control required onChange={(val) => {setUser({...user, firstName: `${val.target.value}`})}} type="text" placeholder="Enter First Name" value={user?.firstName} />
                <Form.Label>Last Name</Form.Label>
                <Form.Control required onChange={(val) => {setUser({...user, lastName: `${val.target.value}`})}} type="text" placeholder="Enter Last Name"  value={user?.lastName}/>
            </Form.Group>
            

            <Form.Group className="mb-3" controlId="formBasicCheckbox">
                <Form.Label>Group</Form.Label>
                <Form.Select aria-label="Default select" value={user?.userGroup} onChange={(val) => {setUser({...user, userGroup: `${val.target.value}`})}}>
                    <option defaultValue="Default" disabled>Choose a option</option>
                    {options1.map(op => (
                        <option key={op.value} value={op.value}>{op.label}</option>
                    ))}
                </Form.Select>
                <Form.Label className="mt-3">Permissions</Form.Label>
                
                <Form.Check onChange={(val) => {
                    setUserAuthorizations([...userAuthorizations.filter(st => st.authorizationKey!==val.target.value),{authorizationKey: val.target.value, granted: val.target.checked}]);
                }} type="checkbox" value={"jumping"} label={"jumping"} />
                <Form.Check onChange={(val) => {
                    setUserAuthorizations([...userAuthorizations.filter(st => st.authorizationKey!==val.target.value),{authorizationKey: val.target.value, granted: val.target.checked}]);
                }} type="checkbox" value={"standing"} label={"standing"} />
                <Form.Check onChange={(val) => {
                    setUserAuthorizations([...userAuthorizations.filter(st => st.authorizationKey!==val.target.value),{authorizationKey: val.target.value, granted: val.target.checked}]);
                }} type="checkbox" value={"sitting"} label={"sitting"} />
                <Form.Check onChange={(val) => {
                    setUserAuthorizations([...userAuthorizations.filter(st => st.authorizationKey!==val.target.value),{authorizationKey: val.target.value, granted: val.target.checked}]);
                }} type="checkbox" value={"running"} label={"running"} />

            </Form.Group>
            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form>}
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Cancel</Button>
        </Modal.Footer>
      </Modal>
    );
  }

  export default AddModal;
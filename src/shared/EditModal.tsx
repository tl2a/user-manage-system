import { useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { updateUser } from "../redux/user";

interface modal {
    show: boolean;
    onHide: () => void;
    details: {
        "userId": string,
        "firstName": string,
        "lastName": string,
        "userGroup": string,
        "userAuthorizations":
        {
          "authorizationKey": string,
          "granted": boolean
        }[]
      };
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

function EditModal(props:modal) {
  const dispatch = useDispatch();

  const [userAuthorizations,setUserAuthorizations] = useState([
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
    "userId": "",
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
    setUser(props.details);
    props.details && setUserAuthorizations(props.details.userAuthorizations);
  }, [props.details])
  
  useEffect(() => {
    setUser({...user, userAuthorizations: userAuthorizations.filter(st => st.granted)});
  }, [userAuthorizations])
  
  const editUser = (e:any) => {
    e.preventDefault();
    dispatch(updateUser(user));
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
            Edit User
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        {user && <Form onSubmit={editUser}>
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

                <Form.Check checked={(userAuthorizations.filter(st => st.authorizationKey=="jumping" && st.granted).length==1)} onChange={(val) => {
                    setUserAuthorizations([...userAuthorizations.filter(st => st.authorizationKey!==val.target.value),{authorizationKey: val.target.value, granted: val.target.checked}]);
                }} type="checkbox" value={"jumping"} label={"jumping"} />
                <Form.Check checked={(userAuthorizations.filter(st => st.authorizationKey=="standing" && st.granted).length==1)} onChange={(val) => {
                    setUserAuthorizations([...userAuthorizations.filter(st => st.authorizationKey!==val.target.value),{authorizationKey: val.target.value, granted: val.target.checked}]);
                }} type="checkbox" value={"standing"} label={"standing"} />
                <Form.Check checked={(userAuthorizations.filter(st => st.authorizationKey=="sitting" && st.granted).length==1)} onChange={(val) => {
                    setUserAuthorizations([...userAuthorizations.filter(st => st.authorizationKey!==val.target.value),{authorizationKey: val.target.value, granted: val.target.checked}]);
                }} type="checkbox" value={"sitting"} label={"sitting"} />
                <Form.Check checked={(userAuthorizations.filter(st => st.authorizationKey=="running" && st.granted).length==1)} onChange={(val) => {
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

  export default EditModal;
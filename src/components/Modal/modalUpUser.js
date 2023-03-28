import { Modal, Form, Button } from 'react-bootstrap';
import { FaRegEdit } from "react-icons/fa";
import { useState } from "react";
import axios from 'axios';
import UseAdminUsers from '../../utils/useAdminUsers';
import Swal from 'sweetalert2';

let styles = {
    fontWeight: "bold",
    color: "#dc3545"
}



function ModalUpUsers({ name, lastname, age, email, admin, id }) {

    const { url, user } = UseAdminUsers();

    const [showUp, setShowUp] = useState(false);
    const handleCloseUp = () => setShowUp(false);
    const handleShowUp = () => setShowUp(true)

    const [errorsUp, setErrorsUp] = useState({});


    let initialFormUp = {
        name: `${name}`,
        lastname: `${lastname}`,
        age: `${age}`,
        email: `${email}`,
        admin: `${admin}`,
    }


    // Funcion para Actualizar Usuarios en tabla:
    const [update, setupdate] = useState({})


    function OnChangeUpdate(e) {
        const { name, value } = e.target;
        const response = { ...update, [name]: value };
        setupdate(response);
        console.log(response);
    }


    async function PutUsers(id) {
        try {

            let admin = user.find(user => user.email === "esteban@gmail.com");


            if (!update.name || !update.lastname || !update.age || !update.email || !update.admin) {
                Swal
                    .fire({
                        title: "No se pudo Actualizar !!",
                        text: "Debes completar todos los campos.",
                        icon: 'warning',
                        //showCancelButton: true,
                        confirmButtonText: "Aceptar",
                        //cancelButtonText: "Cancelar",
                    })
                    .then(resultado => {
                        if (resultado.value) {
                            // Hicieron click en "Sí"
                            setShowUp(false);
                        } else {
                            // Dijeron que no
                        }
                    });
            }


            else if (id !== admin._id) {

                const { data } = await axios.put(`${url}/user/${id}`, update)
                setShowUp(false);
                window.location.reload();

            } else {
                Swal
                    .fire({
                        title: "Este Usuario No se puede Modificar !!",
                        icon: 'warning',
                        //showCancelButton: true,
                        confirmButtonText: "Aceptar",
                        //cancelButtonText: "Cancelar",
                    })
                    .then(resultado => {
                        if (resultado.value) {
                            // Hicieron click en "Sí"
                            setShowUp(false);
                        } else {
                            // Dijeron que no
                        }
                    });
            }
        } catch (error) {
            alert('No se pudo.');
            console.error(error);
        }
    }



    // Validaciones de Inputs (Formulario para Actualizar Usuario):
    const validationsFormUp = (update) => {
        let errorsUp = {};
        let regexName = /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$/;
        let regexComments = /^.{1,10}$/;
        let regexComments1 = /^.{1,15}$/;
        let regexComments2 = /^.{1,2}$/;
        let regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;


        if (!regexComments.test(update.name.trim())) {
            errorsUp.name = "'Nombre' solo debe tener hasta 10 caracteres"
            setupdate(initialFormUp)
        }

        else if (!regexComments1.test(update.lastname.trim())) {
            errorsUp.lastname = "'Apellido' solo debe tener hasta 15 caracteres"
            setupdate(initialFormUp)
        }

        else if (!regexComments2.test(update.age.trim())) {
            errorsUp.age = "'Edad' solo debe tener hasta 2 cifras"
            setupdate(initialFormUp)
        }

        else if (!regexEmail.test(update.email.trim())) {
            errorsUp.email = "Tu 'Email' no es valido."
            setupdate(initialFormUp)
        }

        else if (update.admin != "true" && update.admin != "false") {
            errorsUp.admin = "Solo 'true' o 'false'"
            setupdate(initialFormUp)
        }


        return errorsUp;
    }


    const handleBlurUp = (e) => {
        OnChangeUpdate(e);
        setErrorsUp(validationsFormUp(update));
    };

    const modalUserUp = () => {
        handleShowUp();
        setupdate(initialFormUp)
    }



    return (
        <div>

            <Button variant="primary" onClick={modalUserUp}><FaRegEdit /></Button>

            <Modal show={showUp} onHide={handleCloseUp}>
                <Modal.Header closeButton>
                    <Modal.Title>Actualizar Usuario</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Form>

                        <div className='d-flex'>
                            <Form.Group className="mb-2 px-2 w-50" controlId="formBasicEmail">
                                <Form.Label>Nombre</Form.Label>
                                <Form.Control
                                    name='name'
                                    type='text'
                                    onChange={OnChangeUpdate}
                                    onBlur={handleBlurUp}
                                    value={update.name}
                                    placeholder={name} />
                                {errorsUp.name && <p style={styles}>{errorsUp.name}</p>}
                            </Form.Group>

                            <Form.Group className="mb-2 px-2 w-50" controlId="formBasicEmail">
                                <Form.Label>Apellido</Form.Label>
                                <Form.Control
                                    name='lastname'
                                    type='text'
                                    onChange={OnChangeUpdate}
                                    onBlur={handleBlurUp}
                                    value={update.lastname}
                                    placeholder={lastname} />
                                {errorsUp.lastname && <p style={styles}>{errorsUp.lastname}</p>}
                            </Form.Group>
                        </div>

                        <div className='d-flex'>
                            <Form.Group className="mb-2 px-2 w-25" controlId="formBasicEmail">
                                <Form.Label>Edad</Form.Label>
                                <Form.Control
                                    name='age'
                                    type="number"
                                    onChange={OnChangeUpdate}
                                    onBlur={handleBlurUp}
                                    value={update.age}
                                    placeholder={age} />
                                {errorsUp.age && <p style={styles}>{errorsUp.age}</p>}
                            </Form.Group>

                            <Form.Group className="mb-2 px-2 w-50" controlId="formBasicEmail">
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    name='email'
                                    type="email"
                                    onChange={OnChangeUpdate}
                                    onBlur={handleBlurUp}
                                    value={update.email}
                                    placeholder={email} />
                                {errorsUp.email && <p style={styles}>{errorsUp.email}</p>}
                            </Form.Group>

                            <Form.Group className="mb-2 px-2 w-25" controlId="formBasicEmail">
                                <Form.Label>Admin</Form.Label>
                                <Form.Control
                                    name='admin'
                                    type="text"
                                    onChange={OnChangeUpdate}
                                    onBlur={handleBlurUp}
                                    value={update.admin}
                                    placeholder={admin} />
                                {errorsUp.admin && <p style={styles}>{errorsUp.admin}</p>}
                            </Form.Group>

                        </div>

                    </Form>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="primary w-100" onClick={() => PutUsers(id)}>
                        Actualizar
                    </Button>
                </Modal.Footer>

            </Modal>

        </div >
    )
};

export default ModalUpUsers;
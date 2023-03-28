import React, { useContext, useState, useEffect } from "react";
import "./LoginPage.css";
import { Container, Nav, Navbar, Button, Form, Modal, } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse, faStar, faCartShopping, faUser, faCircleInfo, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import logo from "../../img/rollinglogo.png";
import Swal from 'sweetalert2';
import axios from 'axios';
import UseAdminUsers from "../../utils/useAdminUsers";


function LoginPage() {


    const { user, GetUsers } = UseAdminUsers();
    const token = localStorage.getItem("token");

    const [show, setShow] = useState(false);


    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    function singOut() {
        localStorage.removeItem("token");
        window.location.href = "/login";
    }


    const [form, setform] = useState();

    function onChange(e) {
        const { name, value } = e.target;
        const response = { ...form, [name]: value }
        setform(response)

        //setvalidate(false)
    }



    useEffect(() => {
        GetUsers()
    }, []);
    console.log(user)

   function logueate(){
    Swal.fire({
        title: "Aun no estas logueado",
        icon: "error",
        button: "Ir al formulario de login",
    })
   }
    async function LoginPost() {

        try {
            let url = `https://backendproject-4ds1.onrender.com/api/auth`
            const { data } = await axios.post(url, form)
            console.log(data);
            

            localStorage.setItem('token', data)

            function goAdminProducts() {
                GetUsers()
                console.log(user)
                let response = user.find(item => item.email == form.email)
                console.log(response)
                console.log(response.admin)
                if (response.admin == "true") {
                    window.location.href = '/adminProducts'
                } else if (response.admin == "false") {
                    window.location.href = '/'
                }
            }

            Swal.fire({
                title: "Inicio de sesion exitoso",
                icon: "success",
                button: "Ir a la Homepage",
            }).then(resultado => {
                if (resultado.value) {
                    window.location.href = '/'
                    goAdminProducts();
                } else {
                    //nada
                }
            })
        } catch (error) {
            console.error('error')
            Swal.fire({
                title: "Inicio de sesion defectuoso",
                icon: "error",
                text: "chequea que ambos campos esten correctos y completos",
                button: "Aceptar",
            }).then(resultado => {
                if (resultado.value) {
                    window.location.reload();
                } else {
                    //nada
                }
            })
            //setvalidate(true)
            //npm console.log(validate)

        }
    }


    // //Register:
    const [showReg, setShowReg] = useState(false);

    const handleCloseReg = () => setShowReg(false);
    const handleShowReg = () => setShowReg(true);

    //const [form, setform] = useState({});

    let url1 = 'https://backendproject-4ds1.onrender.com/api'

    function OnChange(e) {
        const { name, value } = e.target;
        const response = { ...form, [name]: value, admin: false };
        setform(response);
    }

    async function Registrar() {
        try {
            const response = await axios.post(`${url1}/user`, form);
            console.log(response);
            Swal.fire({
                title: "Se registro con exito !!!",
                icon: "success",
                button: "Ir a la Homepage",
            }).then(resultado => {
                if (resultado.value) {
                    window.location.href = '/';
                } else {
                    //nada
                }
            })
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div>

            {/* NAVBAR DE LOGIN */}
            <Navbar className="navbar1" id="navContainer" bg="orange" expand="lg">
                <Container className="container-3" fluid p-5>
                    <Navbar.Brand className="logo-navbar" href="/"><img className="logo-img" src={logo} alt="LOGO" srcset="" /></Navbar.Brand>
                    <Navbar.Toggle className="me-3" aria-controls="navbarScroll" />
                    <Navbar.Collapse className="container-search-icons " id="navbarScroll">

                        <Nav
                            className=" icons-hamburguer my-2 my-lg-0"
                            style={{ maxHeight: '100px' }}
                            navbarScroll>
                            <Link className="links-icons m-2 p-1" id="home" onClick={logueate}> <FontAwesomeIcon color="black" fontSize={26} icon={faHouse} /> </Link>
                            <Link className="links-icons m-2 p-1" id="favs" to="/InfoPage"> <FontAwesomeIcon color="black" fontSize={26} icon={faCircleInfo} />  </Link>
                        </Nav>

                    </Navbar.Collapse>
                </Container>

            </Navbar>

            {/* Login */}
            <div className="loginForm d-flex justify-content-center m-5">
                <Form className="col-lg-3 col-sm-6 bg-light px-5 py-4">
                    <h4 className="text-center">Ingresa para ver nuestros productos</h4>

                    <Form.Group className="FGroupLoginEmail mb-3 p-2" controlId="formBasicEmail">
                        <Form.Label>Ingrese su email</Form.Label>
                        <Form.Control
                            // id="emailLogin"
                            classname="border border-danger border-1"
                            //    classname = {validate? "border border-danger" : ""}
                            name="email"
                            type="email"
                            placeholder="juan@gmail.com"
                            onChange={onChange}
                            required
                        />
                    </Form.Group>

                    <Form.Group className="FGroupLoginPassword  mb-3 p-2" controlId="formBasicPassword">
                        <Form.Label className="p-2">Ingrese su contraseña</Form.Label>
                        <Form.Control
                            // id="passwordLogin"
                            //classname={validate ? " border border-danger" : ""}
                            name="password"
                            type="password"
                            placeholder="************"
                            onChange={onChange}
                            required
                        />
                    </Form.Group>
                    <div id="ConteinerForgottenPassword">
                        <p className="me-2">¿Olvidaste tu contraseña?</p>
                        <a href="http://">Recuperar contraseña</a>
                    </div>
                    <div id="ConteinerForgottenPassword">
                        <p className="me-2">¿Aun no estas registrado?</p>

                        <Link onClick={handleShowReg}>
                            Registrate Aqui !!!
                        </Link>

                    </div>



                    <div className="d-flex justify-content-center ">


                        <Button id="ReadyLoginButton" onClick={LoginPost}>Listo!
                        </Button>
                    </div>

                </Form>
            </div>
             {/* MODAL REGISTER */}
           

             <Modal show={showReg} onHide={handleCloseReg}>
                <Modal.Header closeButton>
                    <Modal.Title>Register:</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="w-100 d-flex justify-content-center">
                        <div className="w-100 px-2">
                            <Form>

                                <Form.Group className="mb-1">
                                    <Form.Label>Nombre</Form.Label>
                                    <Form.Control
                                        name='name'
                                        type='text'
                                        onChange={OnChange}
                                        placeholder="Juan"
                                    />
                                </Form.Group>

                                <Form.Group className="mb-1">
                                    <Form.Label>Apellido</Form.Label>
                                    <Form.Control
                                        name='lastname'
                                        type='text'
                                        onChange={OnChange}
                                        placeholder="Perez"
                                    />
                                </Form.Group>

                                <Form.Group className="mb-1">
                                    <Form.Label>Edad</Form.Label>
                                    <Form.Control
                                        name='age'
                                        type='number'
                                        onChange={OnChange}
                                        placeholder="25"
                                    />
                                </Form.Group>

                                <Form.Group className="mb-1">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control
                                        name='email'
                                        type='email'
                                        onChange={OnChange}
                                        placeholder="juan@gmail.com"
                                    />
                                </Form.Group>

                                <Form.Group className="mb-1">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control
                                        name='password'
                                        type='password'
                                        onChange={OnChange}
                                        placeholder="*************"
                                    />
                                </Form.Group>

                            </Form>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={Registrar} className="w-100">
                        Registrar
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default LoginPage;
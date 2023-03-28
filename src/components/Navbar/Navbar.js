import "./Navbar.css";
import {
  Container,
  Nav,
  Navbar,
  Button,
  NavDropdown,
  Form,
  Modal,
  Offcanvas,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import React, { useContext, useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faStar,
  faCartShopping,
  faUser,
  faCircleInfo,
  faMagnifyingGlass,
  faSignOutAlt
} from "@fortawesome/free-solid-svg-icons";
import { CartContext } from "../CartProvider/CartProvider";
import { CartModal } from "../CartModal/CartModal";
import { useCart } from "../../utils/useCart";
import SubNavbar from "../SubNav/subNav"
import Buscador from "../Buscador/Buscador"
import favoritos from "../../pages/Favorites/favorites"
import logo from "../../img/rollinglogo.png"
import UseAdminProducts from '../../utils/useAdminProducts';
import "../CartModal/CartModal.css"
import cartpage from "../../pages/CartPage/CartPage"
import Swal from 'sweetalert2'
import axios from 'axios'



function NavBarComponent() {

  const { cart, setCart, deleteItem } = useContext(CartContext);

  const cartTotalSum = cart.reduce((acc, item) => acc + item.precio, 0);
  const cartItemCount = cart.length;

  const { url } = UseAdminProducts();

  const token = localStorage.getItem("token");

  const [smShow, setSmShow] = useState(false);
  const [lgShow, setLgShow] = useState(false);
  const [show, setShow] = useState(false);

  const { CartOpen, setCartOpen } = useCart();
  const { itemCount } = useContext(CartContext);
  const [active, setActive] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  const initialForm = {
    email: "",
    password: ""
  }


  const [form, setform] = useState(initialForm);
  const [errors, setErrors] = useState({});


  function onChange(e) {
    const { name, value } = e.target;
    const response = { ...form, [name]: value }
    setform(response)
  }

  const [user, setUser] = useState([])

  useEffect(() => {
    GetUsers()
  }, []);


  async function GetUsers() {

    const response = await axios.get(`https://backendproject-4ds1.onrender.com/api/user`)
    //console.log(response.data)
    setUser(response.data)
  }
  //console.log(user)


  // Validaciones de Inputs (Formulario - Login):
  const validationsForm = (form) => {
    let errors = {};
    let regexName = /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$/;
    let regexComments = /^.{1,15}$/;
    let regexComments1 = /^.{1,10}$/;
    let regexComments2 = /^.{1,2}$/;
    let regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;


    if (!form.email.trim()) {
      errors.email = "'Email' es requerido"
    } else if (!regexEmail.test(form.email.trim())) {
      errors.email = "Tu 'Email' no es valido."
      setform(initialForm)
    }

    else if (!form.password.trim()) {
      errors.password = "'Password' es requerido"
    } else if (form.password.length < 4 || form.password.length > 8) {
      errors.password = "Tu 'Password' no es valido."
      setform(initialForm)
    }


    return errors;
  }

  const handleBlur = (e) => {
    onChange(e);
    setErrors(validationsForm(form));
  };



  async function LoginPost() {

    console.log(form.email)
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
          goAdminProducts();
        } else {
          //nada
        }
      })
    } catch (error) {
      let response = user.find(item => item.email == form.email)
      if (response) {
        Swal.fire({
          title: "Inicio de sesion defectuoso",
          icon: "error",
          text: "Estas registrado, tu password es incorrecto.",
          button: "Aceptar",
        }).then(resultado => {
          if (resultado.value) {
            window.location.reload();
          } else {
            //nada
          }
        })
      } else {
        Swal.fire({
          title: "Inicio de sesion defectuoso",
          icon: "error",
          text: "Registrate para poder Iniciar Sesion",
          button: "Aceptar",
        }).then(resultado => {
          if (resultado.value) {
            window.location.reload();
          } else {
            //nada
          }
        })
      }

    }
  }


  // //Register:
  const [showReg, setShowReg] = useState(false);

  const handleCloseReg = () => setShowReg(false);
  const handleShowReg = () => setShowReg(true);

  const initialFormReg = {
    name: "",
    lastname: "",
    age: "",
    email: "",
    password: ""
  }

  const [formReg, setFormReg] = useState(initialFormReg);
  const [errorsReg, setErrorsReg] = useState({});

  let url1 = 'https://backendproject-4ds1.onrender.com/api'


  let styles = {
    fontWeight: "bold",
    color: "#dc3545"
  }


  function OnChangeReg(e) {
    const { name, value } = e.target;
    const response = { ...formReg, [name]: value, admin: false };
    setFormReg(response);
  }


  // Validaciones de Inputs (Formulario para crear o ingresar nuevo Usuario - Register):
  const validationsFormReg = (formReg) => {
    let errorsReg = {};
    let regexName = /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$/;
    let regexComments = /^.{1,15}$/;
    let regexComments1 = /^.{1,10}$/;
    let regexComments2 = /^.{1,2}$/;
    let regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if (!formReg.name.trim()) {
      errorsReg.name = "'Nombre' es requerido"
    } else if (!regexComments1.test(formReg.name.trim())) {
      errorsReg.name = "'Nombre' solo debe tener hasta 10 caracteres"
      setFormReg(initialFormReg)
    }

    else if (!formReg.lastname.trim()) {
      errorsReg.lastname = "'Apellido' es requerido"
    } else if (!regexComments.test(formReg.lastname.trim())) {
      errorsReg.lastname = "'Apellido' solo debe tener hasta 15 caracteres"
      setFormReg(initialFormReg)
    }

    else if (!formReg.age.trim()) {

    } else if (!regexComments2.test(formReg.age.trim())) {
      errorsReg.age = "'Edad' solo debe tener hasta 2 cifras"
      setFormReg(initialFormReg)
    }

    else if (!formReg.email.trim()) {
      errorsReg.email = "'Email' es requerido"
    } else if (!regexEmail.test(formReg.email.trim())) {
      errorsReg.email = "Tu 'Email' no es valido."
      setFormReg(initialFormReg)
    }

    else if (!formReg.password.trim()) {
      errorsReg.password = "'Password' es requerido"
    } else if (formReg.password.length < 4 || formReg.password.length > 8) {
      errorsReg.password = "Tu 'Password' no es valido, debe tener entre 4 y 8 caracteres."
      setFormReg(initialFormReg)
    }


    return errorsReg;
  }

  const handleBlurReg = (e) => {
    OnChangeReg(e);
    setErrorsReg(validationsFormReg(formReg));
  };


  // Funcion para crear o ingresar Usuarios en la Base de Datos:
  async function Registrar() {
    try {
      const existentUser = user.find((user) => user.email === formReg.email)

      if (formReg.name === "" || formReg.lastname === "" || formReg.email === "" || formReg.password === "") {

        Swal
          .fire({
            title: "Importante !!",
            text: "Debes completar todos los campos requeridos",
            icon: 'warning',
            //showCancelButton: true,
            confirmButtonText: "Aceptar",
            //cancelButtonText: "Cancelar",
          })

      } else if (!existentUser) {

        const response = await axios.post(`${url1}/user`, formReg)
        console.log(response);

        Swal
          .fire({
            title: "Listo !!",
            text: "Ingreso exitoso",
            icon: 'warning',
            //showCancelButton: true,
            confirmButtonText: "Aceptar",
            //cancelButtonText: "Cancelar",
          })
          .then(resultado => {
            if (resultado.value) {
              // Hicieron click en "Sí"
              window.location.reload();
            } else {
              // Dijeron que no
            }
          });

      } else {

        Swal
          .fire({
            title: "Importante !!",
            text: "El Usuario ya existe.",
            icon: 'warning',
            //showCancelButton: true,
            confirmButtonText: "Aceptar",
            //cancelButtonText: "Cancelar",
          })
          .then(resultado => {
            if (resultado.value) {
              // Hicieron click en "Sí"
              window.location.reload();
            } else {
              // Dijeron que no
            }
          });
      }
    } catch (error) {
      console.error(error);
    }
  }

  function removeSesion() {
    localStorage.removeItem('token');
    window.location.href = '/';
    setCart([]);
  }


  function verifySesion() {
    if (token != null) {
      setCartOpen(false)
      window.location.href = '/cartpage'
    } else {
      Swal.fire({
        title: "Inicia Sesion !!",
        text: "Para poder realizar tu compra debes Iniciar Sesion, si no tienes una cuenta, primero debes Registrarte y luego Iniciar Sesion.",
        icon: "warning",
        button: "Aceptar",
      }).then(resultado => {
        if (resultado.value) {
          setCart([]);
          setCartOpen(false);
        } else {
          //nada
        }
      })
    }
  }



  return (
    <div>
      <div className=" pre-navbar  ">
        <h2>3 <small>CUOTAS SIN INTERES </small><strong>-ENVIOS GRATIS</strong> <small>DESDE $20.000</small></h2>

        {/* MODAL CONTACTO */}

        <div className="contact-navb">
          <Button className="button-nav" onClick={() => setLgShow(true)}>Contact Us</Button>
          <Modal
            size="lg"
            show={lgShow}
            onHide={() => setLgShow(false)}
            aria-labelledby="example-modal-sizes-title-lg">
            <Modal.Header closeButton>
              <Modal.Title id="example-modal-sizes-title-lg">
                Contactate !
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>...</Modal.Body>
          </Modal>
        </div>
      </div>

      {/* NAVBAR  */}
      <Navbar className="navbar1" id="navContainer" bg="orange" expand="lg">
        <Container className="container-3" fluid p-5>
          <Navbar.Brand className="logo-navbar" href="/"><img className="logo-img" src={logo} alt="LOGO" srcset="" /></Navbar.Brand>
          <Navbar.Toggle className="me-3" aria-controls="navbarScroll" />
          <Navbar.Collapse className="container-search-icons " id="navbarScroll">
            <Nav onMouseLeave={() => setCartOpen(false)}
              className=" icons-hamburguer my-2 my-lg-0"
              style={{ maxHeight: '100px' }}
              navbarScroll>
              <Link className="links-icons m-2 p-1" id="home" to="/"> <FontAwesomeIcon className="icon" color="black" fontSize={26} icon={faHouse} /> </Link>
              <Link className="links-icons m-2 p-1" id="favs" to="/favoritos"> <FontAwesomeIcon className="icon" color="black" fontSize={26} icon={faStar} /> </Link>
              <Link className="links-icons m-2 p-1" id="carrito"  >
                {" "}
                <span className="itemcount">{itemCount}</span>

                <FontAwesomeIcon className="icon" color="black" fontSize={26} icon={faCartShopping}
                  onClick={() => setCartOpen(true)}
                   
                  />

                {/* <CartModal/> */}
                {CartOpen && (
                  <div className="cart">

                    <h5>Mi carrito [{cartItemCount}]</h5>

                    {cartItemCount === 0 ?
                      <p className="cartVacio">Tu carrito esta vacio</p> :
                      (

                        <div className="cart__container">
                          {cart.map((item) => {
                            return (
                              <div key={item._id} class="cart__producto">
                                <img src={item.imgUrl} alt='' />
                                <div className="col-1">
                                  <p>{item.producto}</p>


                                </div>
                                <div className="col-2">
                                  <p>${item.precio}</p>
                                  <button onClick={() => deleteItem(item._id)}>Borrar</button>

                                </div>
                              </div>
                            );
                          })}
                          <h5 className="total">Subtotal: ${cartTotalSum}</h5>
                          <button className="comprar" onClick={() => verifySesion()}>Comprar</button>
                        </div>
                      )}

                  </div>
                )}

              </Link>

              <Link className="links-icons m-2 p-1" id="info" to="/">
                {token != null ?
                  <FontAwesomeIcon className="icon" color="black" fontSize={26} icon={faSignOutAlt} onClick={removeSesion} />
                  :
                  <FontAwesomeIcon className="icon" color="black" fontSize={26} icon={faUser} onClick={handleShow} />
                }
              </Link>


              {/* Modal Login */}
              <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
              >
                <Modal.Header closeButton onClick={handleClose}>
                  <Modal.Title className="FirstButton">Iniciar Sesion</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <h2>Bienvenid@s a Rolling Shoes</h2>
                  <div className="ConteinerInputLogin">
                    <div className="ConteinerInputLogin">

                      <Form>

                        <Form.Group className="FGroupLoginEmail mb-1 p-2" controlId="formBasicEmail">
                          <Form.Label>Ingrese su email</Form.Label>
                          <Form.Control
                            // id="emailLogin"
                            classname="border border-danger border-1"
                            //    classname = {validate? "border border-danger" : ""}
                            name="email"
                            type="email"
                            placeholder="juan@gmail.com"
                            onChange={onChange}
                            onBlur={handleBlur}
                            value={form.email}
                          />
                          {errors.email && <p style={styles}>{errors.email}</p>}
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
                            onBlur={handleBlur}
                            value={form.password}
                          />
                          {errors.password && <p style={styles}>{errors.password}</p>}
                        </Form.Group>

                      </Form>

                      <div id="ConteinerForgottenPassword">
                        <p className="me-2">¿Olvidaste tu contraseña?</p>
                        <a href="http://">Recuperar contraseña</a>
                      </div>
                      <div className="d-flex justify-content-center me-5">
                        <p className="me-2">No tienes una cuenta?</p>
                        <Link onClick={handleShowReg}>
                                Registrate Aqui !!!
                        </Link>
                      </div>

                    </div>
                  </div>
                </Modal.Body>
                <Modal.Footer>
                  <Button id="CloseLoginButton" onClick={handleClose}>
                    Cerrar
                  </Button>
                  <Button id="ReadyLoginButton" onClick={LoginPost}>Listo!
                  </Button>
                </Modal.Footer>
              </Modal>

              <Link className="links-icons m-2 p-1" id="favs" to="/InfoPage"> <FontAwesomeIcon color="black" fontSize={26} icon={faCircleInfo} />  </Link>
            </Nav>

            {/* BUSCADOR  */}

            <Buscador />

          </Navbar.Collapse>
        </Container>

      </Navbar>
      <SubNavbar />


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
                    onChange={OnChangeReg}
                    onBlur={handleBlurReg}
                    value={formReg.name}
                    placeholder="Juan"
                  />
                  {errorsReg.name && <p style={styles}>{errorsReg.name}</p>}
                </Form.Group>

                <Form.Group className="mb-1">
                  <Form.Label>Apellido</Form.Label>
                  <Form.Control
                    name='lastname'
                    type='text'
                    onChange={OnChangeReg}
                    onBlur={handleBlurReg}
                    value={formReg.lastname}
                    placeholder="Perez"
                  />
                  {errorsReg.lastname && <p style={styles}>{errorsReg.lastname}</p>}
                </Form.Group>

                <Form.Group className="mb-1">
                  <Form.Label>Edad</Form.Label>
                  <Form.Control
                    name='age'
                    type='number'
                    onChange={OnChangeReg}
                    onBlur={handleBlurReg}
                    value={formReg.age}
                    placeholder="25"
                  />
                  {errorsReg.age && <p style={styles}>{errorsReg.age}</p>}
                </Form.Group>

                <Form.Group className="mb-1">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    name='email'
                    type='email'
                    onChange={OnChangeReg}
                    onBlur={handleBlurReg}
                    value={formReg.email}
                    placeholder="juan@gmail.com"
                  />
                  {errorsReg.email && <p style={styles}>{errorsReg.email}</p>}
                </Form.Group>

                <Form.Group className="mb-1">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    name='password'
                    type='password'
                    onChange={OnChangeReg}
                    onBlur={handleBlurReg}
                    value={formReg.password}
                    placeholder="*************"
                  />
                  {errorsReg.password && <p style={styles}>{errorsReg.password}</p>}
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

export default NavBarComponent;
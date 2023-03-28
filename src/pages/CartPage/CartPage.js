import { useState, useEffect, useContext } from "react";
import { CartContext } from "../../components/CartProvider/CartProvider";
import { Modal, Form, Button, Table } from "react-bootstrap";
import axios from "axios";
import './CartPage.css';
import Swal from "sweetalert2";



export const CartPage = () => {

  const { cart, setCart, deleteItem } = useContext(CartContext);

  const cartTotalSum = cart.reduce((acc, item) => acc + item.precio, 0);
  const cartItemCount = cart.length;
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const token = localStorage.getItem("token");
  const product = JSON.parse(localStorage.getItem("cart")) || [];
  const headers = { "x-auth-token": token }
  console.log(token)


  const [user, setUser] = useState({});


  useEffect(() => {
    GetUser();
  }, [])


  async function GetUser() {
    try {
      const response = await axios.get('https://backendproject-4ds1.onrender.com/api/auth', { headers });
      console.log(response)
      setUser(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  // Creo el Array compra:
  let compra = [];

  if (product !== []) {

    for (let i = 0; i < product.length; i++) {

      compra.push(

        product[i].producto,
        product[i].marca,
        product[i].precio

      )
    }
  }

  // Creo el Objeto compra:
  let objectCompra = { ...compra, total: cartTotalSum };


  async function cartMethod() {
    try {
      const response = await axios.put(
        `https://backendproject-4ds1.onrender.com/api/user/${user._id}`,
        { "product": objectCompra },
        { headers }
      )
      console.log(response)
      GetUser();
    } catch (error) {
      console.log(error)
      
    }
  }



  function DetailsPay() {
    cartMethod();
    handleShow();
  }


  // REGISTRO DE VENTAS:

  console.log(user.name)
  console.log(user.lastname)


  const initialForm = {
    dni: "",
    provincia: "",
    localidad: "",
    direccion: "",
    tarjeta: "",
    nroTarjeta: "",
  }


  const [form, setform] = useState(initialForm);


  // Capturamos los inputs del formulario:
  function OnChange(e) {
    const { name, value } = e.target;
    if (!objectCompra[3]) {
      const response = {
        name: user.name, lastname: user.lastname,
        producto1: objectCompra[0], marca1: objectCompra[1], precio1: objectCompra[2],
        total: objectCompra.total,
        ...form, [name]: value
      };
      setform(response);

    } else if (!objectCompra[6]) {
      const response = {
        name: user.name, lastname: user.lastname,
        producto1: objectCompra[0], marca1: objectCompra[1], precio1: objectCompra[2],
        producto2: objectCompra[3], marca2: objectCompra[4], precio2: objectCompra[5],
        total: objectCompra.total,
        ...form, [name]: value
      };
      setform(response);
    } else {
      const response = {
        name: user.name, lastname: user.lastname,
        producto1: objectCompra[0], marca1: objectCompra[1], precio1: objectCompra[2],
        producto2: objectCompra[3], marca2: objectCompra[4], precio2: objectCompra[5],
        producto3: objectCompra[6], marca3: objectCompra[7], precio3: objectCompra[8],
        total: objectCompra.total,
        ...form, [name]: value
      };
      setform(response);
    }
  }


  let url1 = 'https://backendproject-4ds1.onrender.com/api'


  // Funcion para ingresar Ventas en la Base de Datos:

  async function RegistrarVenta() {
    try {

      if (form.dni === "" || form.provincia === "" || form.localidad === "" || form.direccion === "" || form.tarjeta === "" || form.nroTarjeta === "") {

        Swal
          .fire({
            title: "Importante !!",
            text: "Debes completar todos los campos requeridos",
            icon: 'warning',
            //showCancelButton: true,
            confirmButtonText: "Aceptar",
            //cancelButtonText: "Cancelar",
          })

      } else {

        const response = await axios.post(`${url1}/adminShopping`, form)

        Swal
          .fire({
            title: "Listo !!",
            text: "Tu compra se Registro correctamente !!",
            icon: 'warning',
            //showCancelButton: true,
            confirmButtonText: "Aceptar",
            //cancelButtonText: "Cancelar",
          })
          .then(resultado => {
            if (resultado.value) {
              // Hicieron click en "Sí"
              setCart([]);
              window.location.href = '/'
            } else {
              // Dijeron que no
            }
          });

      }
    } catch (error) {
      console.error(error);
    }
  }


  // Validaciones de Inputs (Formulario para ingresar ventas):

  const [errors, setErrors] = useState({})


  const validationsForm = (form) => {
    let errors = {};
    let regexName = /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$/;
    let regexComments = /^.{1,8}$/;
    let regexComments1 = /^.{1,15}$/;
    let regexComments2 = /^.{1,20}$/;
    let regexComments3 = /^.{1,30}$/;
    let regexComments4 = /^.{1,16}$/;


    if (!form.dni.trim()) {
      errors.dni = "'DNI' es requerido"
    } else if (!regexComments.test(form.dni.trim())) {
      errors.dni = "'DNI' solo debe tener hasta 8 numeros"
      setform(initialForm)
    }

    else if (!form.provincia.trim()) {
      errors.provincia = "'Provincia' es requerido"
    } else if (!regexComments1.test(form.provincia.trim())) {
      errors.provincia = "'Provincia' solo debe tener hasta 15 caracteres."
      setform(initialForm)
    }

    else if (!form.localidad.trim()) {
      errors.localidad = "'Localidad' es requerido"
    } else if (!regexComments2.test(form.localidad.trim())) {
      errors.localidad = "'Localidad' solo debe tener hasta 20 caracteres."
      setform(initialForm)
    }

    else if (!form.direccion.trim()) {
      errors.direccion = "'Direccion' es requerido"
    } else if (!regexComments3.test(form.direccion.trim())) {
      errors.direccion = "'Direccion' solo debe tener hasta 30 caracteres."
      setform(initialForm)
    }

    else if (!form.tarjeta.trim()) {
      errors.tarjeta = "'Tarjeta' es requerido"
    } else if (!regexComments1.test(form.tarjeta.trim())) {
      errors.tarjeta = "'Tarjeta' solo debe tener hasta 15 caracteres."
      setform(initialForm)
    }

    else if (!form.nroTarjeta.trim()) {
      errors.nroTarjeta = "'Nro de Tarjeta' es requerido"
    } else if (!regexComments4.test(form.nroTarjeta.trim())) {
      errors.nroTarjeta = "'Nro de Tarjeta' solo debe tener hasta 16 numeros"
      setform(initialForm)
    }



    return errors;
  }

  const handleBlur = (e) => {
    OnChange(e);
    setErrors(validationsForm(form));
  };


  let styles = {
    fontWeight: "bold",
    color: "#dc3545"
  }


  return (

    <>
      <div className="container_padre">
        <div className="container_carrito ">
          <div>
            <h1>TU CARRITO</h1>
            <p>TOTAL ({cartItemCount} productos) ${cartTotalSum}</p>
            <p>Los articulos de tu carrito no estan reservados.termnina el proceso de comprar para hacerte con ellos.</p>
          </div>
          <div className="container_promo">

            <p>POR $1099 RECIBI TU PEDIDO AL SIGUIENTE DIA HABIL.</p>
            <p>Aprovecha el envio express y recibi tus compras en 24H.<strong>Aplica para pedidos con pago confirmado hasta las 11:59pm en ciertas localidades de Buenos Aires. *Pedidos con pago confirmado recibidos los viernes, sábados y domingos, serán entregados el siguiente día hábil. **No aplica para productos personalizados</strong></p>
          </div>
          {cartItemCount === 0 ?
            <p className="cartVacio">Tu carrito esta vacio</p> :
            (
              <div className="card_carrito">
                {cart.map((item) => {
                  return (
                    <div key={item._id} class="producto_carrito">
                      <div className="imagen_producto">
                        <img src={item.imgUrl} alt='' />
                      </div>
                      <div className="nombre_producto">
                        <p>{item.producto}</p>
                        <h6>Talle: 38</h6>
                        <h6>Cantidad:

                        </h6>
                        <select>
                          <option>
                            1
                          </option>
                        </select>

                      </div>
                      <div className="precio_producto">
                        <p>${item.precio}</p>
                        <button onClick={() => deleteItem(item._id)}>🗑</button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
        </div>

        <div className="container_pedido">
          <div className="container_resumen">
            <h4>RESUMEN DEL PEDIDO:</h4>
            <p>
              {cartItemCount} productos
              <span>
                ${cartTotalSum}
              </span>
            </p>
            <p className="linea">Entrega:
              <span>
                GRATIS
              </span>
            </p>
            <p className="linea">
              Total (IVA incluido)
              <span>
                ${cartTotalSum}
              </span>
            </p>

          </div>
          <div className="container_pagar" >


            <button onClick={DetailsPay}>Ir a pagar </button>



            {/* MODAL DE FINALIZACION DE VENTA */}

            <Modal show={show} onHide={handleClose}>

              <Modal.Body>
                <h4>Finaliza tu compra:</h4>
                <Form>
                  <section className="d-flex mb-2">
                    <Form.Group className=" me-2 w-25" controlId="formBasicEmail">
                      <Form.Label>Nombre</Form.Label>
                      <Form.Control
                        name="name"
                        type="text"
                        value={user.name}
                        disabled
                      />
                    </Form.Group>

                    <Form.Group className=" me-2 w-50" controlId="formBasicEmail">
                      <Form.Label>Apellido</Form.Label>
                      <Form.Control
                        name="lastname"
                        type="text"
                        value={user.lastname}
                        disabled
                      />
                    </Form.Group>

                    <Form.Group className=" me-2 w-25" controlId="formBasicEmail">
                      <Form.Label>DNI</Form.Label>
                      <Form.Control
                        name="dni"
                        type="number"
                        onChange={OnChange}
                        onBlur={handleBlur}
                        placeholder="20220320"
                      />
                      {errors.dni && <p style={styles}>{errors.dni}</p>}
                    </Form.Group>
                  </section>

                  <section className="d-flex mb-2">
                    <Form.Group className=" me-2 w-50" controlId="formBasicEmail">
                      <Form.Label>Producto</Form.Label>
                      <Form.Control
                        name="producto1"
                        type="text"
                        value={objectCompra[0]}
                        disabled
                      />
                    </Form.Group>

                    <Form.Group className=" me-2 w-25" controlId="formBasicEmail">
                      <Form.Label>Marca</Form.Label>
                      <Form.Control
                        name="marca1"
                        type="text"
                        value={objectCompra[1]}
                        disabled
                      />
                    </Form.Group>

                    <Form.Group className=" w-25" controlId="formBasicEmail">
                      <Form.Label>Precio</Form.Label>
                      <Form.Control
                        name="precio1"
                        type="number"
                        value={objectCompra[2]}
                        disabled
                      />
                    </Form.Group>
                  </section>

                  <section className="d-flex mb-2">
                    <Form.Group className=" me-2 w-50" controlId="formBasicEmail">
                      <Form.Control
                        name="producto2"
                        type="text"
                        value={objectCompra[3]}
                        disabled
                      />
                    </Form.Group>

                    <Form.Group className=" me-2 w-25" controlId="formBasicEmail">
                      <Form.Control
                        name="marca2"
                        type="text"
                        value={objectCompra[4]}
                        disabled
                      />
                    </Form.Group>

                    <Form.Group className=" w-25" controlId="formBasicEmail">
                      <Form.Control
                        name="precio2"
                        type="number"
                        value={objectCompra[5]}
                        disabled
                      />
                    </Form.Group>
                  </section>

                  <section className="d-flex mb-2">
                    <Form.Group className=" me-2 w-50" controlId="formBasicEmail">
                      <Form.Control
                        name="producto3"
                        type="text"
                        value={objectCompra[6]}
                        disabled
                      />
                    </Form.Group>

                    <Form.Group className=" me-2 w-25" controlId="formBasicEmail">
                      <Form.Control
                        name="marca3"
                        type="text"
                        value={objectCompra[7]}
                        disabled
                      />
                    </Form.Group>

                    <Form.Group className=" w-25" controlId="formBasicEmail">
                      <Form.Control
                        name="precio3"
                        type="number"
                        value={objectCompra[8]}
                        disabled
                      />
                    </Form.Group>
                  </section>

                  <h6>Datos de Envio:</h6>

                  <section className="d-flex mb-2">
                    <Form.Group className=" me-2 w-25" controlId="formBasicEmail">
                      <Form.Label>Provincia</Form.Label>
                      <Form.Control
                        name="provincia"
                        type="text"
                        placeholder='Tucuman'
                        onChange={OnChange}
                        onBlur={handleBlur}
                      />
                      {errors.provincia && <p style={styles}>{errors.provincia}</p>}
                    </Form.Group>


                    <Form.Group className=" me-2 w-25" controlId="formBasicEmail">
                      <Form.Label>Localidad</Form.Label>
                      <Form.Control
                        name="localidad"
                        type="text"
                        placeholder='Capital'
                        onChange={OnChange}
                        onBlur={handleBlur}
                      />
                      {errors.localidad && <p style={styles}>{errors.localidad}</p>}
                    </Form.Group>

                    <Form.Group className=" w-50" controlId="formBasicEmail">
                      <Form.Label>Direccion</Form.Label>
                      <Form.Control
                        name="direccion"
                        type="text"
                        placeholder='Calle Junin 123 - Dpto 2A'
                        onChange={OnChange}
                        onBlur={handleBlur}
                      />
                      {errors.direccion && <p style={styles}>{errors.direccion}</p>}
                    </Form.Group>
                  </section>

                  <h6>Datos de Pago:</h6>

                  <section className="d-flex">
                    <Form.Group className="me-2 w-25" controlId="formBasicEmail">
                      <Form.Label>Total Compra</Form.Label>
                      <Form.Control
                        name="total"
                        type="number"
                        value={objectCompra.total}
                        disabled
                      />
                    </Form.Group>
                    <Form.Group className=" me-2 w-25" controlId="formBasicEmail">
                      <Form.Label>Tarjeta</Form.Label>
                      <Form.Control
                        name="tarjeta"
                        type="text"
                        placeholder='Visa'
                        onChange={OnChange}
                        onBlur={handleBlur}
                      />
                      {errors.tarjeta && <p style={styles}>{errors.tarjeta}</p>}
                    </Form.Group>

                    <Form.Group className="w-50" controlId="formBasicEmail">
                      <Form.Label>Nro de Tarjeta</Form.Label>
                      <Form.Control
                        maxLength='16'
                        name="nroTarjeta"
                        type="number"
                        placeholder='Introduce tus 16 numeros'
                        onChange={OnChange}
                        onBlur={handleBlur}
                      />
                      {errors.nroTarjeta && <p style={styles}>{errors.nroTarjeta}</p>}
                    </Form.Group>
                  </section>

                </Form>

                <section className="d-flex mt-2">
                  <Button variant="secondary" onClick={handleClose} className="mt-2 me-2 w-50">
                    Cancelar
                  </Button>
                  <Button variant="primary" className="mt-2 w-50" onClick={RegistrarVenta}>
                    Comprar
                  </Button>
                </section>

              </Modal.Body>

            </Modal>

          </div>
        </div>
      </div>
    </>
  );
};

export default CartPage;
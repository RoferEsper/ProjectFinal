import { Modal, Form, Button } from 'react-bootstrap';
import UseAdminProducts from '../../utils/useAdminProducts';
import { FaRegEdit } from "react-icons/fa";
import { useState } from "react";
import axios from 'axios';
import Swal from 'sweetalert2';

let styles = {
    fontWeight: "bold",
    color: "#dc3545"
}


function ModalUpProducts({ producto, imagen, precio, marca, categoria, sex, id, publicado, color, tseis, tsiete, tocho, tnueve, ccero, cuno, cdos, ctres }) {

    const { showUp, handleCloseUp, handleShowUp, url, setShowUp } = UseAdminProducts();


    const [errorsUp, setErrorsUp] = useState({});


    const initialFormUp = {
        producto: `${producto}`,
        imgUrl: `${imagen}`,
        sex: `${sex}`,
        marca: `${marca}`,
        color: `${color}`,
        precio: `${precio}`,
        tseis: `${tseis}`,
        tsiete: `${tsiete}`,
        tocho: `${tocho}`,
        tnueve: `${tnueve}`,
        ccero: `${ccero}`,
        cuno: `${cuno}`,
        cdos: `${cdos}`,
        ctres: `${ctres}`,
        categoria: `${categoria}`,
        publicado: `${publicado}`
    }


    // Funcion para Actualizar productos en tabla:
    const [update, setupdate] = useState({})


    function OnChangeUpdate(e) {
        const { name, value } = e.target;
        const response = { ...update, [name]: value };
        setupdate(response);
        console.log(response);
    }
    console.log(update)


    async function PutProducts(id) {
        try {
            if (!update.producto || !update.imgUrl || !update.sex || !update.marca || !update.color || !update.precio || !update.tseis || !update.tsiete || !update.tocho || !update.tnueve || !update.ccero || !update.cuno || !update.cdos || !update.ctres || !update.categoria || !update.publicado) {
                Swal
                    .fire({
                        title: "No se pudo Actualizar !!",
                        text: "Debes completar los campos requeridos.",
                        icon: 'warning',
                        showCancelButton: true,
                        confirmButtonText: "Aceptar",
                        cancelButtonText: "Cancelar",
                    })
                    .then(resultado => {
                        if (resultado.value) {
                            // Hicieron click en "Sí"
                            //setShowUp(false);
                        } else {
                            // Dijeron que no
                        }
                    });
            } else {
                const { data } = await axios.put(`${url}/adminProducts/${id}`, update)
                console.log(data);
                setShowUp(false);
                window.location.reload();
            }
        } catch (error) {
            alert('No se pudo.');
            console.error(error);
        }
    }


    // Validaciones de Inputs (Formulario para Actualizar Producto):
    const validationsFormUp = (update) => {
        let errorsUp = {};
        let regexName = /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$/;
        let regexComments = /^.{1,20}$/;
        let regexComments1 = /^.{1,10}$/;
        let regexComments2 = /^.{1,6}$/;
        let regexComments3 = /^.{1,3}$/;



        if (!regexComments.test(update.producto.trim())) {
            errorsUp.producto = "'Producto' solo debe tener hasta 20 caracteres"
            setupdate(initialFormUp)
        }

        else if (update.sex != "Mujer" && update.sex != "Hombre") {
            errorsUp.sex = "Solo 'Mujer' u 'Hombre'"
            setupdate(initialFormUp)
        }

        else if (update.marca != "Adidas" && update.marca != "Nike" && update.marca != "Fila" && update.marca != "Reebok") {
            errorsUp.marca = "Solo Adidas, Nike, Fila o Reebok"
            setupdate(initialFormUp)
        }

        else if (!regexComments1.test(update.color.trim())) {
            errorsUp.color = "'Color' solo debe tener hasta 10 caracteres"
            setupdate(initialFormUp)
        }

        else if (!regexComments2.test(update.precio.trim())) {
            errorsUp.precio = "'Precio' solo puede tener hasta 6 cifras"
            setupdate(initialFormUp)
        }

        else if (!regexComments3.test(update.tseis.trim())) {
            errorsUp.tseis = "'T-36' solo puede tener hasta 3 cifras"
            setupdate(initialFormUp)
        }

        else if (!regexComments3.test(update.tsiete.trim())) {
            errorsUp.tsiete = "'T-37' solo puede tener hasta 3 cifras"
            setupdate(initialFormUp)
        }

        else if (!regexComments3.test(update.tocho.trim())) {
            errorsUp.tocho = "'T-38' solo puede tener hasta 3 cifras"
            setupdate(initialFormUp)
        }

        else if (!regexComments3.test(update.tnueve.trim())) {
            errorsUp.tnueve = "'T-39' solo puede tener hasta 3 cifras"
            setupdate(initialFormUp)
        }

        else if (!regexComments3.test(update.ccero.trim())) {
            errorsUp.ccero = "'T-40' solo puede tener hasta 3 cifras"
            setupdate(initialFormUp)
        }

        else if (!regexComments3.test(update.cuno.trim())) {
            errorsUp.cuno = "'T-41' solo puede tener hasta 3 cifras"
            setupdate(initialFormUp)
        }

        else if (!regexComments3.test(update.cdos.trim())) {
            errorsUp.cdos = "'T-42' solo puede tener hasta 3 cifras"
            setupdate(initialFormUp)
        }

        else if (!regexComments3.test(update.ctres.trim())) {
            errorsUp.ctres = "'T-43' solo puede tener hasta 3 cifras"
            setupdate(initialFormUp)
        }

        else if (update.categoria != "Trainning" && update.categoria != "Running" && update.categoria != "Outdoor") {
            errorsUp.categoria = "Solo Trainning, Running u Outdoor"
            setupdate(initialFormUp)
        }

        else if (update.publicado != 1 && update.publicado != 0) {
            errorsUp.publicado = "Solo '1' o '0'"
            setupdate(initialFormUp)
        }

        return errorsUp;
    }

    const handleBlurUp = (e) => {
        OnChangeUpdate(e);
        setErrorsUp(validationsFormUp(update));
    };


    const modalUpProducts = () => {
        handleShowUp();
        setupdate(initialFormUp);
    }


    return (
        <div>

            <Button variant="primary" onClick={modalUpProducts}><FaRegEdit /></Button>

            <Modal show={showUp} onHide={handleCloseUp}>
                <Modal.Header closeButton>
                    <Modal.Title>Actualizar Producto</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Form>

                        <div className='d-flex'>
                            <Form.Group className="mb-2 px-2 w-50" controlId="formBasicEmail">
                                <Form.Label>Producto</Form.Label>
                                <Form.Control
                                    name='producto'
                                    type='text'
                                    onChange={OnChangeUpdate}
                                    onBlur={handleBlurUp}
                                    value={update.producto}
                                    placeholder={producto} />
                                {errorsUp.producto && <p style={styles}>{errorsUp.producto}</p>}
                            </Form.Group>

                            <Form.Group className="mb-2 px-2 w-50" controlId="formBasicEmail">
                                <Form.Label>Imagen</Form.Label>
                                <Form.Control
                                    name='imgUrl'
                                    type='text'
                                    onChange={OnChangeUpdate}
                                    onBlur={handleBlurUp}
                                    value={update.imgUrl}
                                    placeholder={imagen} />
                                {errorsUp.imgUrl && <p style={styles}>{errorsUp.imgUrl}</p>}
                            </Form.Group>
                        </div>

                        <div className='d-flex'>
                            <Form.Group className="mb-2 px-2 w-25" controlId="formBasicEmail">
                                <Form.Label>Sexo</Form.Label>
                                <Form.Control
                                    name='sex'
                                    type="text"
                                    onChange={OnChangeUpdate}
                                    onBlur={handleBlurUp}
                                    value={update.sex}
                                    placeholder={sex} />
                                {errorsUp.sex && <p style={styles}>{errorsUp.sex}</p>}
                            </Form.Group>

                            <Form.Group className="mb-2 px-2 w-25" controlId="formBasicEmail">
                                <Form.Label>Marca</Form.Label>
                                <Form.Control
                                    name='marca'
                                    type="text"
                                    onChange={OnChangeUpdate}
                                    onBlur={handleBlurUp}
                                    value={update.marca}
                                    placeholder={marca} />
                                {errorsUp.marca && <p style={styles}>{errorsUp.marca}</p>}
                            </Form.Group>

                            <Form.Group className="mb-2 px-2 w-25" controlId="formBasicEmail">
                                <Form.Label>Color</Form.Label>
                                <Form.Control
                                    name='color'
                                    type="text"
                                    onChange={OnChangeUpdate}
                                    onBlur={handleBlurUp}
                                    value={update.color}
                                    placeholder={color} />
                                {errorsUp.color && <p style={styles}>{errorsUp.color}</p>}
                            </Form.Group>

                            <Form.Group className="mb-2 px-2 w-25" controlId="formBasicEmail">
                                <Form.Label>Precio ($)</Form.Label>
                                <Form.Control
                                    name='precio'
                                    type="number"
                                    onChange={OnChangeUpdate}
                                    onBlur={handleBlurUp}
                                    value={update.precio}
                                    placeholder={precio} />
                                {errorsUp.precio && <p style={styles}>{errorsUp.precio}</p>}
                            </Form.Group>
                        </div>

                        <div className='d-flex'>
                            <Form.Group className="mb-2 px-2 w-25" controlId="formBasicEmail">
                                <Form.Label>T-36</Form.Label>
                                <Form.Control
                                    name='tseis'
                                    type="number"
                                    onChange={OnChangeUpdate}
                                    onBlur={handleBlurUp}
                                    value={update.tseis}
                                    placeholder={tseis} />
                                {errorsUp.tseis && <p style={styles}>{errorsUp.tseis}</p>}
                            </Form.Group>

                            <Form.Group className="mb-2 px-2 w-25" controlId="formBasicEmail">
                                <Form.Label>T-37</Form.Label>
                                <Form.Control
                                    name='tsiete'
                                    type="number"
                                    onChange={OnChangeUpdate}
                                    onBlur={handleBlurUp}
                                    value={update.tsiete}
                                    placeholder={tsiete} />
                                {errorsUp.tsiete && <p style={styles}>{errorsUp.tsiete}</p>}
                            </Form.Group>

                            <Form.Group className="mb-2 px-2 w-25" controlId="formBasicEmail">
                                <Form.Label>T-38</Form.Label>
                                <Form.Control
                                    name='tocho'
                                    type="number"
                                    onChange={OnChangeUpdate}
                                    onBlur={handleBlurUp}
                                    value={update.tocho}
                                    placeholder={tocho} />
                                {errorsUp.tocho && <p style={styles}>{errorsUp.tocho}</p>}
                            </Form.Group>

                            <Form.Group className="mb-2 px-2 w-25" controlId="formBasicEmail">
                                <Form.Label>T-39</Form.Label>
                                <Form.Control
                                    name='tnueve'
                                    type="number"
                                    onChange={OnChangeUpdate}
                                    onBlur={handleBlurUp}
                                    value={update.tnueve}
                                    placeholder={tnueve} />
                                {errorsUp.tnueve && <p style={styles}>{errorsUp.tnueve}</p>}
                            </Form.Group>
                        </div>

                        <div className='d-flex'>
                            <Form.Group className="mb-2 px-2 w-25" controlId="formBasicEmail">
                                <Form.Label>T-40</Form.Label>
                                <Form.Control
                                    name='ccero'
                                    type="number"
                                    onChange={OnChangeUpdate}
                                    onBlur={handleBlurUp}
                                    value={update.ccero}
                                    placeholder={ccero} />
                                {errorsUp.ccero && <p style={styles}>{errorsUp.ccero}</p>}
                            </Form.Group>

                            <Form.Group className="mb-2 px-2 w-25" controlId="formBasicEmail">
                                <Form.Label>T-41</Form.Label>
                                <Form.Control
                                    name='cuno'
                                    type="number"
                                    onChange={OnChangeUpdate}
                                    onBlur={handleBlurUp}
                                    value={update.cuno}
                                    placeholder={cuno} />
                                {errorsUp.cuno && <p style={styles}>{errorsUp.cuno}</p>}
                            </Form.Group>

                            <Form.Group className="mb-2 px-2 w-25" controlId="formBasicEmail">
                                <Form.Label>T-42</Form.Label>
                                <Form.Control
                                    name='cdos'
                                    type="number"
                                    onChange={OnChangeUpdate}
                                    onBlur={handleBlurUp}
                                    value={update.cdos}
                                    placeholder={cdos} />
                                {errorsUp.cdos && <p style={styles}>{errorsUp.cdos}</p>}
                            </Form.Group>

                            <Form.Group className="mb-2 px-2 w-25" controlId="formBasicEmail">
                                <Form.Label>T-43</Form.Label>
                                <Form.Control
                                    name='ctres'
                                    type="number"
                                    onChange={OnChangeUpdate}
                                    onBlur={handleBlurUp}
                                    value={update.ctres}
                                    placeholder={ctres} />
                                {errorsUp.ctres && <p style={styles}>{errorsUp.ctres}</p>}
                            </Form.Group>
                        </div>

                        <div className='d-flex'>
                            <Form.Group className="mb-2 px-2 w-50" controlId="formBasicEmail">
                                <Form.Label>Categoria</Form.Label>
                                <Form.Control
                                    name='categoria'
                                    type="text"
                                    onChange={OnChangeUpdate}
                                    onBlur={handleBlurUp}
                                    value={update.categoria}
                                    placeholder={categoria} />
                                {errorsUp.categoria && <p style={styles}>{errorsUp.categoria}</p>}
                            </Form.Group>

                            <Form.Group className="mb-2 px-2 w-50" controlId="formBasicEmail">
                                <Form.Label>Publicado</Form.Label>
                                <Form.Control
                                    name='publicado'
                                    type="number"
                                    onChange={OnChangeUpdate}
                                    onBlur={handleBlurUp}
                                    value={update.publicado}
                                    placeholder={publicado} />
                                {errorsUp.publicado && <p style={styles}>{errorsUp.publicado}</p>}
                            </Form.Group>
                        </div>

                    </Form>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="primary w-100" onClick={() => PutProducts(id)}>
                        Actualizar Producto
                    </Button>
                </Modal.Footer>

            </Modal>

        </div >
    )
};

export default ModalUpProducts;
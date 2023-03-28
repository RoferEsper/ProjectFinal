import React, { useState, useContext } from 'react';
import { Modal, Form, Button, Container, Col, Row } from 'react-bootstrap';
import useProducts from '../../utils/useProducts';
import ProductCard from '../ProductCard/ProductCard';
import './ModalProductDetails.css'


import { FaCartPlus } from "react-icons/fa";
import { CartContext } from "../CartProvider/CartProvider";
import { display } from '@mui/system';


function ModalProduct({item}) {
   
 
    const [ShowProduct, setShowProd] = useState(false);
    const closeModal = () => {

        setShowProd(false)};
    const openModal = () =>  setShowProd(true);
   
    
  
    const { addItem } = useContext(CartContext);

    

    // Talles:


    
    function Talle36() {
        if (item.tseis > 0) {
            document.getElementById("talle").innerHTML = '36'
        } else {
            document.getElementById("talle").innerHTML = ' '
            alert('No tenemos stock en este momento')
        }
    }
    function Talle37() {
        if (item.tsiete > 0) {
            document.getElementById("talle").innerHTML = '37'
        } else {
            document.getElementById("talle").innerHTML = ' '
            alert('No tenemos stock en este momento')
        }
    }
    function Talle38() {
        if (item.tocho > 0) {
            document.getElementById("talle").innerHTML = '38'
        } else {
            document.getElementById("talle").innerHTML = ' '
            alert('No tenemos stock en este momento')
        }
    }
    function Talle39() {
        if (item.tnueve > 0) {
            document.getElementById("talle").innerHTML = '39'
        } else {
            document.getElementById("talle").innerHTML = ' '
            alert('No tenemos stock en este momento')
        }
    }
    function Talle40() {
        if (item.ccero > 0) {
            document.getElementById("talle").innerHTML = '40'
        } else {
            document.getElementById("talle").innerHTML = ' '
            alert('No tenemos stock en este momento')
        }
    }
    function Talle41() {
        if (item.cuno > 0) {
            document.getElementById("talle").innerHTML = '41'
        } else {
            document.getElementById("talle").innerHTML = ' '
            alert('No tenemos stock en este momento')
        }
    }
    function Talle42() {
        if (item.cdos > 0) {
            document.getElementById("talle").innerHTML = '42'
        } else {
            document.getElementById("talle").innerHTML = ' '
            alert('No tenemos stock en este momento')
        }
    }
    function Talle43() {
        if (item.ctres > 0) {
            document.getElementById("talle").innerHTML = '43'
        } else {
            document.getElementById("talle").innerHTML = ' '
            alert('No tenemos stock en este momento')
        }
    }

    function sendProduct(id) {
        addItem(id)
        closeModal()
    }



    return (
        <>   
        <i onClick={openModal} ><FaCartPlus /></i>
            <Modal show={ShowProduct} onHide={closeModal}  >
                <Modal.Body>
                    <div className='modal__container'>

                        <div className='img__modal'>
                            <img className="img__1" src={item.imgUrl} alt='' />
                            
                        </div>
                        <div className='box__modal'>
                            <div className='row__box'>
                                <h2>{item.producto}</h2>
                                <span>${item.precio}</span>
                                
                            </div>
                            <p>
                                {item.sex} - {item.categoria}
                            </p>
                            
                            <div className='talles'>
                                <h2>Talles disponibles:</h2>
                                <button onClick={Talle36}>36</button>
                                <button onClick={Talle37}>37</button>
                                <button onClick={Talle38}>38</button>
                                <button onClick={Talle39}>39</button>
                                <button onClick={Talle40}>40</button>
                                <button onClick={Talle41}>41</button>
                                <button onClick={Talle42}>42</button>
                                <div className='d-flex'>
                                        <p className='me-2'>Elegiste Talle:</p> <p className="mt-4" id='talle'></p>
                                </div>
                               

                            </div>
                            <div className='thumb'>
                               { [item.imgUrl, item.imgUrl,item.imgUrl].flatMap((img)=>(
                                <img src={img} alt=""/>
                               ))}
                               </div>
                                
                            
                            <div className='modal__buttons'>
                            <button className='add__tocart' onClick={() => sendProduct(item)}>
                                Agregar al carrito
                            </button>
                            <button className='salir__modal' onClick={closeModal}>
                                Salir
                            </button>
                            </div>
                            
                        </div>

                    </div>
                </Modal.Body>


                {/*<Modal.Body >               
                    <Container className="container__modal">
                        <Row>
                            <Col lg='6' md='5' >
                            <Modal.Title className="modal__title">{item.producto}</Modal.Title>
                                <Row className="modal__img" lg='15' md='5' >
                                    <img
                                        style={{ width: '100%' }}
                                        src={item.imgUrl} />
                                </Row>
                                <Row className="modal__imgs" lg='15' md='1'>
                                    <Col lg='4' md='1'>
                                        <img
                                            style={{ width: '100%', cursor: 'pointer' }}
                                            src={item.imgUrl} />
                                    </Col>
                                    <Col lg='4' md='1'>
                                        <img
                                            style={{ width: '100%', cursor: 'pointer' }}
                                            src={item.imgUrl} />
                                    </Col>
                                    <Col lg='4' md='1'>
                                        <img
                                            style={{ width: '100%', cursor: 'pointer' }}
                                            src={item.imgUrl} />
                                    </Col>

                                </Row>
                            </Col>
                            <Col lg='6' md='5' >
                                
                                <Row className="cuotas__" lg='10' md='15' >
                                    <h4>
                                        ${item.precio} <br></br>
                                        <span style={{ fontSize: '15px' }} font>Hasta 6 cuotas sin interes!<br></br>
                                            {item.color}
                                        </span>
                                    </h4>
                                </Row>
                                <h6>Talles disponibles:</h6>
                                <Row lg='10' md='1' className="talles__inputs">
                                    <div className='d-flex'>
                                        <div className='mx-2'>
                                            <div>
                                                <label className='labelTalles'>T-36</label>
                                            </div>
                                            <div>
                                                <button className="botonTalle" onClick={Talle36}>{item.tseis} u.</button>
                                            </div>
                                        </div>
                                        <div className='mx-2'>
                                            <div>
                                                <label className='labelTalles'>T-37</label>
                                            </div>
                                            <div>
                                                <button className="botonTalle" onClick={Talle37}>{item.tsiete} u.</button>
                                            </div>
                                        </div>
                                        <div className='mx-2'>
                                            <div>
                                                <label className='labelTalles'>T-38</label>
                                            </div>
                                            <div>
                                                <button className="botonTalle" onClick={Talle38}>{item.tocho} u.</button>
                                            </div>
                                        </div>
                                        <div className='mx-2'>
                                            <div>
                                                <label className='labelTalles'>T-39</label>
                                            </div>
                                            <div>
                                                <button className="botonTalle" onClick={Talle39}>{item.tnueve} u.</button>
                                            </div>
                                        </div>
                                    </div>

                                    <div className='d-flex'>
                                        <div className='mx-2'>
                                            <div>
                                                <label className='labelTalles'>T-40</label>
                                            </div>
                                            <div>
                                                <button className="botonTalle" onClick={Talle40}>{item.ccero} u.</button>
                                            </div>
                                        </div>
                                        <div className='mx-2'>
                                            <div>
                                                <label className='labelTalles'>T-41</label>
                                            </div>
                                            <div>
                                                <button className="botonTalle" onClick={Talle41}>{item.cuno} u.</button>
                                            </div>
                                        </div>
                                        <div className='mx-2'>
                                            <div>
                                                <label className='labelTalles'>T-42</label>
                                            </div>
                                            <div>
                                                <button className="botonTalle" onClick={Talle42}>{item.cdos} u.</button>
                                            </div>
                                        </div>
                                        <div className='mx-2'>
                                            <div>
                                                <label className='labelTalles'>T-43</label>
                                            </div>
                                            <div>
                                                <button className="botonTalle" onClick={Talle43}>{item.ctres} u.</button>
                                            </div>
                                        </div>
                                    </div>

                                    <div className='d-flex'>
                                        <p className='me-2 mt-4'>Elegiste Talle:</p> <p className="mt-4" id='talle'></p>
                                    </div>

                                </Row>
                                

                                <span lg='10' md='1' className="talles__inputs__responsive">

                                    <select style={{ width: 'auto', margin: 'auto' }}>
                                        {['36', '37', '38', '39', '40', '41', '42'].map((talle) =>
                                        (
                                            <option key={`${talle}`} className="mb-3"
                                                value={`${talle}`}
                                                id={`${talle}`}
                                                label={`${talle}`}>

                                            </option>
                                        ))}
                                    </select>


                                    <div className='d-flex'>
                                        <p className='me-2 mt-4'>Elegiste Talle:</p> <p className="mt-4" id='talle'>36 </p>
                                    </div>

                                </span>

                            </Col>

                        </Row>

                    </Container>
                </Modal.Body>
                <Modal.Footer >
                    <Button style={{ fontSize:"10px", background: "black" }} onClick={closeModal}>
                        Salir
                    </Button>
                    <Button style={{ fontSize:"10px", background: '#FF6E31' }} onClick={() => addToCart(item)}>
                        Agregar al carrito
                    </Button>
                                        </Modal.Footer>*/}
            </Modal>     
        </>
        
    );
}
export default ModalProduct;

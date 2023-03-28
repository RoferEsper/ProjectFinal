
import { Card, ListGroup, Col, Container, Row } from "react-bootstrap";
import {useContext, useState } from "react";
import { Modal, Form, Button } from 'react-bootstrap';
import { FaHeart } from "react-icons/fa";
import { FaCartPlus } from "react-icons/fa";

import { motion } from "framer-motion";


import  "./ProductCard.css";
import { Link } from "react-router-dom";
//import products from "../../assets/data/ProductsData";

import useProducts from "../../utils/useProducts";
import { map } from "doom/lib/collection";
import { addClass } from "doom/lib/presentation";
import { display } from "@mui/system";
import { Visibility } from "@mui/icons-material";
import ModalProduct from "../Modal/ModalProductDetails";
import {CartContent} from "../CartProvider/CartProvider";


function ProductCard({ item }) {

    const [addFav, setAddFav] = useState(false);
    const favIn = () => setAddFav(true);


    return (
        <>
            <Col lg='3' md='4' mb-2  >
                <Card style={{
                    width: "100%",
                    border: 'none'
                }} className="product__item">

                    <Card.Img
                        className="product__img"
                        src={item.imgUrl} />

                    <Card.Title className=" product__info">

                        <i className="add__cart"><ModalProduct item={item}/></i>
                        <i className="add__fav" onClick={favIn} ><FaHeart /></i>

                        <Card.Text className="product__card-bottom d-flex align-items-center justify-content-between">
                            <h3 className="product__name">
                                {item.producto}<br></br>
                                <span className="product__sex text-center d-inline-block">{item.sex}</span>
                            </h3>
                            <h2 className="price">${item.precio}</h2>
                        </Card.Text>



                    </Card.Title>

                </Card>
            </Col>

        </>
    );

}
export default ProductCard;
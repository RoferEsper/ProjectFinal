import React, { useEffect, useState } from 'react';
import axios from "axios";
import UseAdminProducts from '../../utils/useAdminProducts';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Buscador.css"
import { Link } from 'react-router-dom';
import { Container, Nav, Navbar, Button, NavDropdown, Form, Modal, Offcanvas } from 'react-bootstrap';
import useProducts from "../../utils/useProducts";






const Buscador = () => {
    const [productos, setProductos] = useState([])
    const [buscar, setBuscar] = useState("")
    const [resultadosBusqueda, setResultadosBusqueda] = useState([])
    const { url } = UseAdminProducts();

    // const { handleFilter } = useProducts()




    useEffect(() => {
        GetProductos()
    }, []);

    async function GetProductos() {
        let getProducts = await axios.get(`${url}/adminProducts`);
        setProductos(getProducts.data);
    }

    const handleChange = e => {
        setBuscar(e.target.value)
    }

    useEffect(() => {
        const filter = (productoBuscado) => {
            if (buscar.length < 1) {
                setResultadosBusqueda([])
            } else {
                setResultadosBusqueda(
                    productos.filter((elemento) => {
                        if (elemento.marca
                            .toString()
                            .toLowerCase()
                            .includes(productoBuscado.toLowerCase())) {

                            return elemento;

                        }
                        return null;
                    })
                )
            }
        }
        filter(buscar)

    }, [buscar, productos])
    // console.log(resultadosBusqueda !== [])
    // console.log(resultadosBusqueda.length == 0)

    return (

        <div className="container-search d-flex dropdown ">

            <input
                type="text"
                className="input-search form-control col-2 dropdown-toggle"
                placeholder="Adidas, Nike"
                data-bs-toggle="dropdown"
                arial-expanded="false"
                aria-label="Recipient's username"
                aria-describedby="basic-addon2"
                onChange={handleChange}
            />
            <button type="submit" className="button-search"><FontAwesomeIcon color="grey" fontSize={28} icon={faMagnifyingGlass} /></button>

            <ul className='dropdown-menu container py-5'>
                <li>
                    {

                        resultadosBusqueda.length == 0 ? (
                            <p className='text-uppercase fw-bold my-0'> sin resultados </p>
                        ) : (
                            resultadosBusqueda.map((product) => {
                               
                                return <Link className='dropdown-item' key={product.id} to="/manpage" > {product.marca} </Link>
                            })

                        )

                    }
                </li>
            </ul>

        </div>

    )
}

export default Buscador
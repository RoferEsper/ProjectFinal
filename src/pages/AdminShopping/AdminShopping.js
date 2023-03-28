import { Button, Table } from 'react-bootstrap';
import { FaSearch } from "react-icons/fa";
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'



function AdminShoppingCart () {


    var url = 'https://backendproject-4ds1.onrender.com/api'


    // Funcion para mostrar Compras en tabla:
    const [shopping, setShopping] = useState([]);

    useEffect(() => {
        GetShopping()
    }, []);

    async function GetShopping() {
        let getShopping = await axios.get(`${url}/adminShopping`);
        setShopping(getShopping.data);
        setBuscador(getShopping.data);
    }


    // Buscador:
    const [busqueda, setBusqueda] = useState('')
    const [buscador, setBuscador] = useState([])

    const handleChange = e => {
        setBusqueda(e.target.value)
        filtrar(e.target.value)
    }

    const filtrar = (terminoBusqueda) => {
        var response = buscador.filter((elemento) => {
            if (elemento.name.toLowerCase().includes(terminoBusqueda.toLowerCase())
                || elemento.lastname.toLowerCase().includes(terminoBusqueda.toLowerCase())
                || elemento.dni.toString().includes(terminoBusqueda)
            ) {
                return elemento;
            }
        });
        setShopping(response);
    }


    const mapShopping = shopping.map((item, i) => (
        <tr key={i}>
            <td>{i + 1}</td>
            <td>{item.name}</td>
            <td>{item.lastname}</td>
            <td>{item.dni}</td>
            <td>{item.total}</td>
            <td>{item.producto1}</td>
            <td>{item.marca1}</td>
            <td>{item.precio1}</td>
            <td>{item.producto2}</td>
            <td>{item.marca2}</td>
            <td>{item.precio2}</td>
            <td>{item.producto3}</td>
            <td>{item.marca3}</td>
            <td>{item.precio3}</td>
            <td>{item.provincia}</td>
            <td>{item.localidad}</td>
            <td>{item.direccion}</td>
        </tr>
    ))



    return (
        <div className='container-fluid'>
            <div className=''>

                <div className='ms-4 mt-3'>
                    <Link to="/adminProducts">
                        Ir a Productos
                    </Link>
                </div>
                <div className='ms-4 mt-3'>
                    <Link to="/adminUsers">
                        Ir a Usuarios
                    </Link>
                </div>

                <div className='d-flex justify-content-center w-100 ms-2' >
                    <input
                        className='form-control w-75 mb-3 mt-3 me-3'
                        value={busqueda}
                        placeholder='Buscar'
                        onChange={handleChange}
                    />
                    <Button className='btn btn-primary mb-3 mt-3'>
                        <FaSearch />
                    </Button>
                </div>
            </div>

            {/* ----------------- Tabla ---------------- */}

            <Table striped bordered hover responsive className=''>
                <thead>
                    <tr>
                        <th>#</th>
                        <th><div>Nombre</div></th>
                        <th>Apellido</th>
                        <th>DNI</th>
                        <th>Total Compra</th>
                        <th>Producto</th>
                        <th>Marca</th>
                        <th>Precio</th>
                        <th>Producto</th>
                        <th>Marca</th>
                        <th>Precio</th>
                        <th>Producto</th>
                        <th>Marca</th>
                        <th>Precio</th>
                        <th>Provincia</th>
                        <th>Localidad</th>
                        <th>Direccion</th>
                    </tr>
                </thead>
                <tbody>
                    {mapShopping}
                </tbody>
            </Table >

        </div >
    )
}

export default AdminShoppingCart;

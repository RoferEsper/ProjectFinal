import React, { useState } from "react";
import { useEffect } from "react";
//import products from "../../assets/data/ProductsData";
import ProductsList from "../../components/ProductCard/ProductsList";
import CartModal from "../../components/CartModal/CartModal";
import {
  Badge,
  Col,
  Container,
  Row,

} from "react-bootstrap";
import { FaHeart } from "react-icons/fa";
import "./ProductsPage.css";
import useProducts from '../../utils/useProducts';

import axios from "axios";
import Form from "react-bootstrap/Form";
import { Contrast } from "@mui/icons-material";
import { Link } from "react-router-dom";


function WomanPage() {

  const {
    productos,
    handleFilter,
    Filter,
  } = useProducts();

  return (
    <Container className='products__page'>
      
      <section className="filter__widget">
        <Container>

          <Row data={Filter}>
            <h2 style={{ fontSize: "35px", color: "#243763" }}>MUJER

              <span style={{ fontSize: "20px", color: "#243763" }}> [{Filter.length}] </span>

            </h2>

          </Row>
          <Row >
            <h5>FILTRAR/ORDENAR</h5>
          </Row>
          <Row>
            <div>
              <select >
                <option>Ordenar por:</option>
                <option value="Menor">Menor precio</option>
                <option value="Mayor">Mayor precio</option>
     
              </select>

            </div>

          </Row>
          <Row>
            <div>
              <h5>CATEGORIAS</h5>
              <Form>
                {['Todas las categorias', 'Running', 'Trainning', 'Outdoor', 'Footbal', 'Clasicas', 'Ojotas',].map((cat) => (
                  <div key={`${cat}`} className="mb-3">
                    <Form.Check
                      onChange={handleFilter}
                      value={`${cat}`}
                      id={`${cat}`}
                      label={`${cat}`}
                    />
                  </div>
                ))}
              </Form>
              <h5>MARCAS</h5>
              <Form >
                {['Todas las marcas', 'Adidas', 'Nike', 'Fila', 'Reebok'].map((marca) => (
                  <div key={`${marca}`} className="mb-3">
                    <Form.Check type="checkbox"
                      onChange={handleFilter}
                      value={`${marca}`}
                      id={`${marca}`}
                      label={`${marca}`}
                    />
                  </div>
                ))}
              </Form>
              
            </div>
          </Row>
          <Row className="publicidad">
            <a href="https://rollingcode.co/"> <div className="div_publicidad">
              <img src="https://th.bing.com/th/id/R.85b5f64c23f4e0a9562a828c1501c864?rik=XX8b0wJziJlKYg&pid=ImgRaw&r=0"/>
            </div></a>
            <a href="https://rollingcode.co/"> <div className="div_publicidad">
              <img src="https://th.bing.com/th/id/R.85b5f64c23f4e0a9562a828c1501c864?rik=XX8b0wJziJlKYg&pid=ImgRaw&r=0"/>
            </div></a>
            <a href="https://rollingcode.co/"> <div className="div_publicidad">
              <img src="https://th.bing.com/th/id/R.85b5f64c23f4e0a9562a828c1501c864?rik=XX8b0wJziJlKYg&pid=ImgRaw&r=0"/>
            </div></a>
          </Row>
        </Container>

      </section>


      <section className="filter__widget__responsive">
        <div className="filter__container" data={Filter}>
          <div>
            
            <h2 style={{ fontSize: "35px", color: "#243763" }}>MUJER
              <span style={{ fontSize: "20px", color: "#243763" }}> [{Filter.length}] </span>
            </h2>
          </div>
            
          <div>
              <select onChange={handleFilter}>
              {['Filtrar por categoria', 'Running', 'Trainning', 'Outdoor', 'Footbal', 'Clasicas', 'Ojotas',].map((cat) =>
              (
                <option key={`${cat}`} className="mb-3"
                value={`${cat}`}
                id={`${cat}`}
                label={`${cat}`}>
                  
                </option>
              ))}
              </select>
              </div>
            <div>
              <select onChange={handleFilter}>
              {['Filtrar por marca', 'Adidas', 'Nike', 'Fila', 'Reebok'].map((marca) => (
                  <option key={`${marca}`} className="mb-3" value={`${marca}`}
                  id={`${marca}`}
                  label={`${marca}`}>
                    
                  </option>
                ))}
              </select>
              </div>
          
        </div>
      </section>
      <section className="products__list">
        <Container>
          <Row>

          
        {Filter.length === 0 ? (
                  <h2>No hay productos para mostrar </h2>
                ) : (
                  <ProductsList data={Filter} />)}
          </Row>
        </Container>
      </section>
          
     
    </Container>

  );
}

export default WomanPage;

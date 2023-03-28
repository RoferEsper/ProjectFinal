import { useState } from "react";
import { useEffect } from "react";
//import products from "../assets/data/ProductsData";
import UseAdminProducts from '../utils/useAdminProducts';
import axios from "axios";


function useProducts() {

// Enlace con Pagina adminProducts:
  const { url } = UseAdminProducts();
  const [products, setproducts] = useState([]);

  useEffect(() => {
    GetProducts()
  }, []);
  useEffect(() => {
    GetProductsMan()
  }, []);


  async function GetProducts() {
    let getProducts = await axios.get(`${url}/adminProducts`);
    setproducts(getProducts.data);
    SetFilter(getProducts.data.filter((item, i) => (item.publicado > 0 && item.sex === 'Mujer'))
    
    );
  }
  async function GetProductsMan() {
    let getProducts = await axios.get(`${url}/adminProducts`);
    setproducts(getProducts.data);
    SetFilterMan(getProducts.data.filter((item, i) => (item.publicado > 0 && item.sex === 'Hombre'))
    
    );
  }
  const productsMan = products.filter((item, i) => (item.publicado > 0 && item.sex === 'Hombre'))
  const productsWoman = products.filter((item, i) => (item.publicado > 0 && item.sex === 'Mujer'))

//const productos = products; (se reemplaza => productos, por => productsWoman)
  const [Filter, SetFilter] = useState([]);
  const [Search, SetSearch] = useState('');

  const [FilterMan, SetFilterMan] = useState([]);


// Aplico los filtros a productsWoman:
  const handleFilter = (e) => {

    const filterValue = e.target.value;
    SetSearch(filterValue);

    
    if (filterValue !== Search){
      if (filterValue === 'Nike') {
        const filteredProducts = productsWoman.filter(
          (item) => item.marca === 'Nike');

        SetFilter(filteredProducts)
        
      }
      else if (filterValue === 'Adidas') {
        const filteredProducts = productsWoman.filter(
          (item) => item.marca === 'Adidas');

        SetFilter(filteredProducts)
      }
      else if (filterValue === 'Fila') {
        const filteredProducts = productsWoman.filter(
          (item) => item.marca === 'Fila');

        SetFilter(filteredProducts)
      }
      else if (filterValue === 'Reebok') {
        const filteredProducts = productsWoman.filter(
          (item) => item.marca === 'Reebok');

        SetFilter(filteredProducts)
      }
      else if (filterValue === 'Todas las marcas') {
        SetFilter(productsWoman)
      }
      else if (filterValue === 'Running') {
        const filteredProducts = productsWoman.filter(
          (item) => item.categoria === 'Running');

        SetFilter(filteredProducts)
      }
      else if (filterValue === 'Footbal') {
        const filteredProducts = productsWoman.filter(
          (item) => item.categoria === 'Footbal');

        SetFilter(filteredProducts)
      }
      else if (filterValue === 'Trainning') {
        const filteredProducts = productsWoman.filter(
          (item) => item.categoria === 'Trainning');

        SetFilter(filteredProducts)
      }
      else if (filterValue === 'Outdoor') {
        const filteredProducts = productsWoman.filter(
          (item) => item.categoria === 'Outdoor');

        SetFilter(filteredProducts)
      }
      else if (filterValue === 'Clasicas') {
        const filteredProducts = productsWoman.filter(
          (item) => item.categoria === 'Clasicas');

        SetFilter(filteredProducts)
      }
      else if (filterValue === 'Ojotas') {
        const filteredProducts = productsWoman.filter(
          (item) => item.categoria === 'Ojotas');

        SetFilter(filteredProducts)
      }
      else if (filterValue === 'Todas las categorias') {

        SetFilter(productsWoman)
      }
      else (
        SetFilter(productsWoman)
      )
      console.log(filterValue)
      console.log(Search)
    }
    else (
      SetFilter(productsWoman)
    )
    console.log(productsWoman)
  };
 
// Aplico filtros a productsMan
const handleFilterMan = (e) => {
  const filterValue = e.target.value;
  SetSearch(filterValue);

  if (filterValue !== Search){
    if (filterValue === 'Nike') {
      const filteredProducts = productsMan.filter(
        (item) => item.marca === 'Nike');

      SetFilterMan(filteredProducts)
      
    }
    else if (filterValue === 'Adidas') {
      const filteredProducts = productsMan.filter(
        (item) => item.marca === 'Adidas');

      SetFilterMan(filteredProducts)
    }
    else if (filterValue === 'Fila') {
      const filteredProducts = productsMan.filter(
        (item) => item.marca === 'Fila');

      SetFilterMan(filteredProducts)
    }
    else if (filterValue === 'Reebok') {
      const filteredProducts = productsMan.filter(
        (item) => item.marca === 'Reebok');

      SetFilterMan(filteredProducts)
    }
    else if (filterValue === 'Todas las marcas') {
      SetFilter(productsWoman)
    }
    else if (filterValue === 'Running') {
      const filteredProducts = productsMan.filter(
        (item) => item.categoria === 'Running');

      SetFilterMan(filteredProducts)
    }
    else if (filterValue === 'Footbal') {
      const filteredProducts = productsMan.filter(
        (item) => item.categoria === 'Footbal');

      SetFilterMan(filteredProducts)
    }
    else if (filterValue === 'Trainning') {
      const filteredProducts = productsMan.filter(
        (item) => item.categoria === 'Trainning');

      SetFilterMan(filteredProducts)
    }
    else if (filterValue === 'Outdoor') {
      const filteredProducts = productsMan.filter(
        (item) => item.categoria === 'Outdoor');

      SetFilterMan(filteredProducts)
    }
    else if (filterValue === 'Clasicas') {
      const filteredProducts = productsMan.filter(
        (item) => item.categoria === 'Clasicas');

      SetFilterMan(filteredProducts)
    }
    else if (filterValue === 'Ojotas') {
      const filteredProducts = productsMan.filter(
        (item) => item.categoria === 'Ojotas');

      SetFilterMan(filteredProducts)
    }
    else if (filterValue === 'Todas las categorias') {
      SetFilterMan(productsMan)
    }
    else (
      SetFilterMan(productsMan)
    )
    console.log(filterValue)
    console.log(Search)
  }
  else (
    SetFilterMan(productsMan)
  )
  console.log(productsMan)
};



  return {
    handleFilter,
    //productos,
    productsMan,
    productsWoman,
    Filter,
    productsWoman,
    FilterMan,
    handleFilterMan
    
  }


}
export default useProducts;
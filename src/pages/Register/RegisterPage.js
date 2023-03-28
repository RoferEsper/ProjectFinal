import "./RegisterPage.css";
import { Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import swal from "sweetalert";


function RegisterPage() {
  const [form, setForm] = useState({});

  var url = "https://backendproject-4ds1.onrender.com/api";

  function OnChange(e) {
    const { name, value, imagen } = e.target;
    const response = {
      ...form,
      [name]: value,
    };
    setForm(response);
  }

  //↓Es async ya que hago una llamada al servidor
  async function Register() {
    try {

      const response = await axios.post(`${url}/user`, form)

      const exitAlert = () => {
        swal({
          title: "Registro Exitoso",
          text: "Bienvenido/a !!!",
          icon: "success",
          button: "Aceptar"
        }).then(respuesta => {
          if (respuesta) {
            window.location.href = "/login"
          }
        })
      };

      exitAlert();

    } catch (error) {
      console.error(error)

      const errorAlert = () => {
        swal({
          title: "Hubo un Error",
          text: "Verifica si completaste todos los campos obligatorios (*)",
          icon: "error",
          button: "Aceptar"
        })
      };

      errorAlert();

    }
  }
  return (
    <div className="container-fluid" >
      hola soy el register
    </div >
  );
}

export default RegisterPage;

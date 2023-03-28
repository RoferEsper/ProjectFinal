import { useState, useEffect } from "react";
import axios from "axios";
import CardComponent from "../components/ProductCard/ProductCard";

function UseAdmin() {
    
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    
    const [body, setbody] = useState({});

    function onChange(e) {
        const { name, value } = e.target;
        const response = { ...body, [name]: value }
        setbody(response);
    }

   

  
    const url = "https://backendproject-4ds1.onrender.com/api";
    const token = localStorage.getItem("token") ?? "";
    const headers = { "x-auth-token": token }

    async function PostMethod() {
        try {
            const { data } = await axios.post(`${url}/post`, body, { headers });
            console.log(data)
            GetMethod()
            handleClose(false)
        } catch (error) {
            alert("error")
            console.log(error)
        }
    }

    
    const [posts, setposts] = useState([]);

    useEffect(() => {
        GetMethod();
    }, []);

    async function GetMethod() {
        try {
            const { data } = await axios.get(`${url}/post`)
            setposts(data)
            console.log("Solo para verificar commit")
        } catch (error) {
            console.error(error)
        }
    }

    const MapComponent = posts.map((item, i) => (
        <CardComponent
            key={i}
            id={item._id}
            image={item.image}
            DeleteMethod={DeleteMethod}
            PutMethod={PutMethod}
            OnChangeUpdate={OnChangeUpdate}
            author={item.authorName}
            description={item.description}
        />));

   
    async function DeleteMethod(id) {
        try {
            const { data } = await axios.delete(`${url}/post/${id}`)
            console.log(data)
            GetMethod()
            handleClose(false)
        } catch (error) {
            console.error(error)
        }
    }

  
    const [update, setupdate] = useState({
        image: "http://localhost",
        description: "en llamas"
    });

    function OnChangeUpdate(e) {
        const { name, value } = e.target;
        const response = { ...update, [name]: value }
        setupdate(response);
        console.log(response);
    }

    async function PutMethod(id) {
        try {
            const { data } = await axios.put(`${url}/post/${id}`, update, { headers })
            console.log(data)
            GetMethod()
            setShow(false)
        } catch (error) {
            alert("No se pudo");
            console.error(error);
        }
    }

    return {
        show,
        onChange,
        PostMethod,
        handleShow,
        handleClose,
        MapComponent,
        DeleteMethod,
        OnChangeUpdate,
        PutMethod
    }
}
export default UseAdmin;
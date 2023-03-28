import { useState, useEffect } from "react";
import axios from "axios";
import CardPost from "../../src/components/CardPost/CardPost";
import CardProfile from "../../src/components/CardProfile/CardProfile";

function UseHome() {
  const token = localStorage.getItem("token") ?? "";
  const headers = { "x-auth-token": token };
  const [post, setpost] = useState([]);
  const [body, setbody] = useState([]);

  const url = "https://backendproject-4ds1.onrender.com/api";

  useEffect(() => {
    GetPost();
  }, []);

 
  async function GetPost() {
    try {
      const { data } = await axios.get(`${url}/post`, { headers });
      setpost(data);
      console.log(data)
    } catch (error) {
      console.error(error);
    }
  }

  
  function OnChange(e) {
    const { name, value } = e.target;
    const response = { ...body, [name]: value };
    setbody(response);
  }

  
  async function PostPost() {
    try {
      const { data } = await axios.post(`${url}/post`, body, { headers });
      setbody(data);
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  }
  
  const MapPost = post.map((item, i) => (
    <CardPost
      key={i}
      propAuthor={item.authorName}
      propAuthorLN={item.authorLastname}
      propPostImg={item.image}
      propDescription={item.description}
      propComments={item.comment}
      propId={item._id}
      propDeleteMethod={DeletePost}
      propPutMethod={PutPost}
      OnChangeUpdate={OnChangeUpdate}
    />
  ));

  
  const [updateBody, setUpdateBody] = useState({ description: "chau" });

  function OnChangeUpdate(e) {
    const { name, value } = e.target;
    const response = { ...updateBody, [name]: value };
    setUpdateBody(response);
  }

  async function PutPost(id) {
    try {
      const { data } = await axios.put(`${url}/post/${id}`, updateBody, data, {
        headers,
      });
      GetPost();
    } catch (error) {
      console.error(error);
    }
  }


  async function DeletePost(id) {
    try {
      const { data } = await axios.delete(`${url}/post/${id}`);
      GetPost();
    } catch (error) {
      console.error(error);
    }
  }
  return {
    PostPost,
    MapPost,
    CardProfile,
    OnChange,
  };
}
export default UseHome;

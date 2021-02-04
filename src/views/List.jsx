import React, { useState, useEffect } from "react";
import Axios from "axios";
import styled from 'styled-components';

const DIV = styled.div`
display: flex;
flex-direction: column;
text-align: center;

h1 {
  color: #A21717;
}
h2 {
  color: #A21717;
}
input {
  width: 300px;
    height: 60px;
    margin: 10px;
    align-self: center;
    border-radius: 5px;
    
}
button {
  
}
`;

const Profile = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [url, setUrl] = useState("");
  const [reviewList, setReviewList] = useState([]);
  const [submitList, setSubmitList] = useState("");

  const handleChangeName = (event) => {
    setName(event.target.value);
  };

  const handleChangePrice = (event) => {
    setPrice(event.target.value);
  };

  const handleChangeUrl = (event) => {
    setUrl(event.target.value);
  };

  

  useEffect(() => {
    Axios.get("http://localhost:3001/list").then((response) => {
      setReviewList(response.data);
      console.log(response)
    });
  }, []);


  const submitReview = (event) => {
    event.preventDefault();
    Axios.post("http://localhost:3001/list",
      {
        name,
        price,
        url,
      },
    )
    .then((res) => res.data)
    .then((data) => {
      console.log(data);

    })
    .catch((error) => console.error(error));
};
 

  return (
    <DIV>
      <h1 className="title">Ton Profile</h1>
      <form>
        <h2 className="label-wrapper">
          <label htmlFor="new-todo-input" className="label__lg">
            Créer ta liste
          </label>
        </h2>
        <input
          type="text"
          value={name}
          id="name"
          className="input name"
          name="text"
          placeholder="Nom"
          onChange={handleChangeName}
        />
        <input
          type="text"
          value={price}
          id="price"
          className="input price"
          name="text"
          placeholder="Prix en €"
          onChange={handleChangePrice}
        />
        <input
          type="url"
          value={url}
          id="url"
          className="input url"
          name="url"
          placeholder="https://example.com"
          onChange={handleChangeUrl}
        />
        <button type="submit" onClick={submitReview}>
          Enregistrer
        </button>
      </form>
      <div className='card-list'>
        {reviewList.map((value) => <li>{value.name}, {value.price + '€'}, {value.url}</li>)}
      </div>
    </DIV>
  );
};

export default Profile;

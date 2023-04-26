import styled from "styled-components"
import backArrow from "../assets/backArrow.png";

import useAppContext from '../hook/useAppContext'

import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios"

import { ThreeDots } from "react-loader-spinner";

export default function TransactionsPage() {

  const { transactions, setTransactions,
    username,
    token,
    idUser,
    operation } = useAppContext();

  const config = {
    headers: {
      authorization: `Bearer ${token}`,
    }
  }

  const [description, setDescription] = useState("");
  const [value, setValue] = useState("");

  const [disableInputs, setDisableInputs] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [save, setSave] = useState(`Salvar ${operation}`)

  const navigate = useNavigate();

  function transactionOperation(event) {
    event.preventDefault();

    setDisableInputs(true);

    setSave("");
    setIsLoading(true);

    if (value === "" || description === "") {
      alert("os campos não podem ficar em branco!")

      setDisableInputs(false);
      setIsLoading(false);
      setSave(`Salvar ${operation}`);
      return;
    }

    let auxOperation;
    if (operation === "entrada") {
      auxOperation = "incomeEntrees";
    } else {
      auxOperation = "expenses";
    }
    console.log(operation);
    console.log(auxOperation);


    const transaction = {
      value: value.trim(),
      description: description.trim(),
    }

    const request = axios.post(`https://mywallet-api-3sqt.onrender.com/newTransaction/${auxOperation}`, transaction, config)

    request.then(response => {
      console.log(response.data)


      navigate("/home");
    })

    request.catch(error => {
      console.log(error.response.status);
      let complementaryInfo;
      switch (error.response.status) {
        case 422:
          complementaryInfo = `\n\nO formato das informações estão inválidas!`
          break;

        default:
          complementaryInfo = error.response.status;
          break;
      }
      alert(`Não foi possível realizar a operação: ${complementaryInfo}`)

      setDisableInputs(false);
      setIsLoading(false);
      setSave(`Salvar ${operation}`)
    })
  }

  return (
    <TransactionsContainer>

      <Link to="/home">
        <img src={backArrow} alt="back home" />
      </Link>
      <h1>Nova {operation}</h1>



      <form onSubmit={transactionOperation}>
        <input
          type="text"
          disabled={disableInputs}
          value={value}
          placeholder="Valor"
          onChange={e => setValue(e.target.value)} />

        <input
          type="text"
          disabled={disableInputs}
          value={description}
          placeholder="Descrição"
          onChange={e => setDescription(e.target.value)} />

        <button
          type="submit"
          disabled={disableInputs}
          data-test="login-btn">

          {save}
          {isLoading && (
            <ThreeDots
              color="#FFFFFF"
              height="13px"
              width="51px"
              visible={isLoading} />
          )}
        </button>
      </form>
    </TransactionsContainer >
  )
}

const TransactionsContainer = styled.main`
  height: calc(100vh - 50px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  
  img{
    height: 50px;
    align-self: flex-start;
    position: absolute;

    left:25px;
    top:45px;
  }
  
  h1 {
    align-self: flex-start;
    margin-bottom: 40px;
    margin-left: 75px;
  }`

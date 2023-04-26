import styled from "styled-components"
import { BiExit } from "react-icons/bi"
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from "react-icons/ai"

import useAppContext from '../hook/useAppContext';

import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios"

export default function HomePage() {

  const { transactions, setTransactions,
    username,
    token,
    listTransactions, setListTransactions,
    balance, setBalance,
    idUser,
    operation, setOperation } = useAppContext();

  //console.log(token);
  //console.log(idUser);

  const config = {
    headers: {
      authorization: `Bearer ${token}`,
    }
  }

  useEffect(() => {
    const request = axios.get("https://mywallet-api-3sqt.onrender.com/home", config)
    request.then(response => {
      setListTransactions(response.data);

    })

  }, [transactions]);
  console.log(listTransactions);

  useEffect(() => {
    let newBalance = 0;
    listTransactions.forEach((transaction) => {
      if (transaction.operation === "incomeEntrees") {
        newBalance += transaction.value;
      } else {
        newBalance -= transaction.value;
      }
    });
    setBalance(newBalance);
  }, [listTransactions]);


  return (
    <HomeContainer>
      <Header>
        <h1>Olá, {username}</h1>
        <BiExit />
      </Header>

      <TransactionsContainer>
        <ul>
          {listTransactions.map((transaction) =>
            <ListItemContainer>
              <div>
                <span>{transaction.date}</span>
                <strong>{transaction.description}</strong>
              </div>
              <Value color={transaction.operation === "incomeEntrees" ? "positivo" : "negativo"}>{transaction.value.toFixed(2).replace(".", ",")}</Value>
            </ListItemContainer>
          )}
        </ul>

        <article>
          <strong>Saldo</strong>
          <Value color={balance >= 0 ? "positivo" : "negativo"}>{balance.toFixed(2).replace(".", ",")}</Value>
        </article>
      </TransactionsContainer>


      <ButtonsContainer>
        <button onClick={() => setOperation("entrada")}>
          <Link to="/newTransaction/incomeEntrees">
            <AiOutlinePlusCircle />
            <p>Nova <br /> entrada</p>
          </Link>
        </button>
        <button onClick={() => setOperation("saída")}>
          <Link to="/newTransaction/expenses">
            <AiOutlineMinusCircle />
            <p>Nova <br />saída</p>
          </Link>
        </button>
      </ButtonsContainer>

    </HomeContainer>
  )
}

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100vh - 50px);
`
const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2px 5px 2px;
  margin-bottom: 15px;
  font-size: 26px;
  color: white;
`
const TransactionsContainer = styled.article`
  flex-grow: 1;
  background-color: #fff;
  color: #000;
  border-radius: 5px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  article {
    display: flex;
    justify-content: space-between;   
    strong {
      font-weight: 700;
      text-transform: uppercase;
    }
  }
`
const ButtonsContainer = styled.section`
  margin-top: 15px;
  margin-bottom: 0;
  display: flex;
  gap: 15px;
  
  button {
    width: 50%;
    height: 115px;
    font-size: 22px;
    text-align: left;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    p {
      font-size: 18px;
    }
  }
`
const Value = styled.div`
  font-size: 16px;
  text-align: right;
  color: ${(props) => (props.color === "positivo" ? "green" : "red")};
`
const ListItemContainer = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
  color: #000000;
  margin-right: 10px;
  div span {
    color: #c6c6c6;
    margin-right: 10px;
  }
`
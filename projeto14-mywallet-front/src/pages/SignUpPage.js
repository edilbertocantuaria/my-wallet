import styled from "styled-components"
import MyWalletLogo from "../components/MyWalletLogo"

import useAppContext from '../hook/useAppContext';

import { useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios"

import { ThreeDots } from "react-loader-spinner";

export default function SignUpPage() {

  const [disableInputs, setDisableInputs] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const [registering, setRegistering] = useState("Cadastrar")

  const navigate = useNavigate();

  function register(event) {
    event.preventDefault();
    setDisableInputs(true);

    setRegistering("");
    setIsLoading(true);

    const user = {
      name: name,
      email: email,
      password: password,
      passwordConfirm: passwordConfirm
    }

    if (password === passwordConfirm) {
      const request = axios.post("https://mywallet-api-3sqt.onrender.com/singupUser", user);

      request.then(() => {
        alert("Cadastro realizado com sucesso!! Aproveite a plataforma do MyWallet 😉")
        navigate("/");
      });

      request.catch(error => {
        console.log(error.response.status);
        let complementaryInfo;
        switch (error.response.status) {
          case 409:
            complementaryInfo = "e-mail já cadastrado!";
            break;

          case 422:
            complementaryInfo = `\n\n⚫ há dados faltando ou as senhas não correspondem. \n⚫ Obs.: a senha deve possuir no mínimo 3 caracteres. `
            break;


          default:
            complementaryInfo = error.response.status;
            break;
        }
        alert(`Não foi possível realizar seu cadastro: ${complementaryInfo}`)
        setDisableInputs(false);
        setIsLoading(false);
        setRegistering("Cadastrar");
      })


    } else {
      alert("As senhas não correspondem!");

      setDisableInputs(false);
      setIsLoading(false);
      setRegistering("Cadastrar");
      setPassword("")
      setPasswordConfirm("");
    }

  }

  return (
    <SingUpContainer>
      <form onSubmit={register}>
        <MyWalletLogo />

        <input
          type="name"
          disabled={disableInputs}
          value={name}
          placeholder="nome"
          data-test="user-name-input"
          onChange={e => setName(e.target.value)}
        />

        <input
          type="email"
          disabled={disableInputs}
          value={email}
          placeholder="email"
          data-test="email-input"
          onChange={e => setEmail(e.target.value)} />

        <input
          type="password"
          disabled={disableInputs}
          value={password}
          placeholder="senha"
          data-test="password-input"
          onChange={e => setPassword(e.target.value.trim())} />

        <input
          type="password"
          disabled={disableInputs}
          value={passwordConfirm}
          placeholder="Confirme a senha"
          data-test="password-input"
          onChange={e => setPasswordConfirm(e.target.value.trim())} />

        <button
          type="submit"
          disabled={disableInputs}
          data-test="login-btn">

          {registering}
          {isLoading && (
            <ThreeDots
              color="#FFFFFF"
              height="13px"
              width="51px"
              visible={isLoading} />
          )}
        </button>

      </form>

      <Link to="/">
        Já tem uma conta? Entre agora!
      </Link>
    </SingUpContainer>
  )
}

const SingUpContainer = styled.section`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

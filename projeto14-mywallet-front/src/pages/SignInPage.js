import styled from "styled-components"
import MyWalletLogo from "../components/MyWalletLogo"

import { useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";

import axios from "axios"
import { ThreeDots } from "react-loader-spinner";

export default function SignInPage() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [disableInputs, setDisableInputs] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [enter, setEnter] = useState("Entrar")

  const navigate = useNavigate();

  function login(event) {
    event.preventDefault();

    setDisableInputs(true);

    setEnter("");
    setIsLoading(true);

    const user = {
      email: email.toLowerCase(),
      password: password
    }

    const request = axios.post("https://mywallet-api-3sqt.onrender.com/", user)

    request.then(response => {
      //setUsername(response.data.name);

      //setIsLoading(false);
      //setDisableInputs(false);
      console.log(response);
      console.log(response.data);



      navigate("/home");
    })

    request.catch(() => {
      alert("Os dados informados estão incorretos ou o usuário não está cadastrado!")
      setDisableInputs(false);
      setIsLoading(false);
      setEnter("Entrar");

    })



  }

  return (
    <SingInContainer>
      <form onSubmit={login}>
        <MyWalletLogo />

        <input type="email"
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
          onChange={e => setPassword(e.target.value.trim())}
        />

        <button
          type="submit"
          disabled={disableInputs}
          data-test="login-btn"
          colorOpacity={isLoading ? "0.7" : "1"}>

          {enter}
          {isLoading && (
            <ThreeDots
              color="#FFFFFF"
              height="13px"
              width="51px"
              visible={isLoading} />
          )}

        </button>
      </form>

      <Link to="/singupUser">
        Primeira vez? Cadastre-se!
      </Link>
    </SingInContainer>
  )
}

const SingInContainer = styled.section`
  width: auto;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

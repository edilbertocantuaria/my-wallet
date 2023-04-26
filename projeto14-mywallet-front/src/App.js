import { BrowserRouter, Routes, Route } from "react-router-dom"

import styled from "styled-components"

import HomePage from "./pages/HomePage"
import SignInPage from "./pages/SignInPage"
import SignUpPage from "./pages/SignUpPage"
import TransactionsPage from "./pages/TransactionPage"

import React, { useEffect } from 'react';
import axios from 'axios';

import AppProvider from './context/AppProvider'

export default function App() {

  const apiUrl = process.env.REACT_APP_API_URL;

  /*            <Route path="/" element={<SignInPage />} />
            <Route path="/singupUser" element={<SignUpPage />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/newTransaction/:operation" element={<TransactionsPage />} />*/

  return (
    <AppProvider>
      <PagesContainer>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<SignInPage />} />
            <Route path="/singupUser" element={<SignUpPage />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/newTransaction/:operation" element={<TransactionsPage />} />

          </Routes>
        </BrowserRouter>
      </PagesContainer>
    </AppProvider>
  )
}

const PagesContainer = styled.main`
  background-color: #8c11be;
  width: calc(100vw - 50px);
  max-height: 100vh;
  padding: 25px;
`

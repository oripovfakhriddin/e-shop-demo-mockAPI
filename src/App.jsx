import { Fragment, useState } from "react"
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"

import MainLayout from "./components/layout/main-layout/MainLayout"
import LoginPage from "./pages/loginPage/LoginPage"
import HomePage from "./pages/homePage/HomePage"
import ProductPage from "./pages/productPage/ProductPage"

import { TOKEN } from "./constants/const"


function App() {

  let isToken = localStorage.getItem(TOKEN)
  const [ isLogin, setIsLogin ] = useState(isToken === null ? false : true)

  const changeSetIsLogin = () => {
    setIsLogin(!isLogin)
  }

  return (
    <Fragment>
      <BrowserRouter>
        <Routes>
          <Route element = { <MainLayout /> } >
            <Route index element= { isLogin ?  <HomePage /> : <Navigate to="/login" /> } />
            <Route path="login"  element = { <LoginPage changeSetIsLogin = { changeSetIsLogin } /> } />
            <Route path="categories/:categoryId" element= { <ProductPage /> } />
          </Route>
        </Routes>
      </BrowserRouter>
    </Fragment>
  )
}

export default App

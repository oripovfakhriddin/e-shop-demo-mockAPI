
import { Fragment } from "react"

import "./loginpage.scss"
import { Button, Form } from "react-bootstrap"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import loginSchema from "../../schema/loginSchema"
import { useNavigate } from "react-router-dom"
import PropTypes from "prop-types"
import axios from "axios"
import { TOKEN } from "../../constants/const"
import { toast } from "react-toastify"


const LoginPage = ({ changeSetIsLogin }) => {

  const navigate = useNavigate()
  const { register, handleSubmit, formState: {errors} } = useForm({resolver: yupResolver(loginSchema)})
  
  const submit = async (data) => {
    try {
      let res = await axios.post("https://reqres.in/api/login", data)
      localStorage.setItem(TOKEN, res.data.token)
      changeSetIsLogin()
      navigate("/")
    } catch (error) {
      toast.error(error.response.data.error);
    }
  }

  return (
    <Fragment>
      <div className="vh-100 d-flex align-items-center justify-content-center bg-secondary">
        <Form onSubmit={handleSubmit(submit)} className="w-25 p-5 border border-primary shadow-lg p-3 mb-5 bg-body-tertiary rounded-4 bg-primary-subtle">

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control {...register("email")} placeholder="Enter email" />
            {errors.email ? <p className="text-danger"> {errors.email.message}</p> : null}
          </Form.Group>

          <Form.Group className="mb-3" >
            <Form.Label>Password</Form.Label>
            <Form.Control {...register("password")} type="password" placeholder="Password" />
            {errors.password ? <p className="text-danger" >{errors.password.message}</p> : null}
          </Form.Group>
          
          <Button className="w-100" variant="primary" type="submit">
            Login
          </Button>

        </Form>
      </div>
    </Fragment>
  )
}

LoginPage.propTypes = {
  changeSetIsLogin: PropTypes.func,
}

export default LoginPage
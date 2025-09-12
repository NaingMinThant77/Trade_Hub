import { Button, Form, Input, message, Select } from 'antd'
import { loginUser, registerUser } from "../../apicalls/auth"
import { useState } from 'react';
import { Link, useNavigate } from "react-router-dom"
import { useDispatch } from 'react-redux';
import { setUser } from "../../store/slices/userSlice"

const AuthForm = ({ isLoginPage }) => {
    const [submitting, isSubmitting] = useState(false);
    const navigate = useNavigate();

    const dispatch = useDispatch()

    const handleOnFinish = async (values) => {
        isSubmitting(true)
        if (isLoginPage) {
            try {
                const response = await loginUser(values)
                if (response.isSuccess) {
                    message.success(response.message)
                    localStorage.setItem("token", response.token)
                    dispatch(setUser(response.token))
                    navigate("/");
                } else {
                    throw new Error(response.message)
                }
            } catch (error) {
                message.error(error.message)
            }
        } else {
            try {
                const response = await registerUser(values)
                if (response.isSuccess) {
                    message.success(response.message)
                    navigate("/login");
                } else {
                    throw new Error(response.message)
                }
            } catch (error) {
                message.error(error.message)
            }
        }
        isSubmitting(false)
    }

    return (
        <section className='w-full flex justify-center mt-20 mb-14 '>
            <div className='w-[450px]'>
                <h1 className='text-3xl font-bold mb-4 text-blue-600 '>TradePoint - {isLoginPage ? "LOGIN" : "REGISTER"}</h1>
                <Form layout='vertical' onFinish={handleOnFinish}>
                    {
                        !isLoginPage && (
                            <Form.Item name="name" label="Name" rules={[
                                { required: true, message: "Name must be included" },
                                { min: 3, message: "Name must have at least 3 characters" }
                            ]} hasFeedback>
                                <Input placeholder='name ...'></Input>
                            </Form.Item>
                        )
                    }
                    <Form.Item name="email" label="Email" rules={[
                        { required: true, message: "Email must be included" },
                        { type: 'email', message: "Enter a valid E-mail;" }
                    ]} hasFeedback>
                        <Input placeholder='email ...'></Input>
                    </Form.Item>
                    <Form.Item name="password" label="Password" rules={[
                        { required: true, message: "Password must be included" },
                        { min: 3, message: "Password must have at least 3 characters" }
                    ]} hasFeedback>
                        <Input.Password placeholder='password ...'></Input.Password>
                    </Form.Item>
                    <Form.Item>
                        <Button block type='primary' htmlType="submit" disabled={submitting}>{submitting ? "Submitting ..." : isLoginPage ? "Login" : "Register"}</Button>
                    </Form.Item>
                    <p>{isLoginPage ? <p>Don't have an account ? <Link to={"/register"} className='font-medium text-blue-600 hover:text-blue-600'>Register Here</Link></p> : <p>Already have an account ? <Link to={"/login"} className='font-medium text-blue-600 hover:text-blue-600'>Login Here</Link></p>}</p>
                </Form>
            </div>
        </section>
    )
}

export default AuthForm

import { useFormik } from "formik";
import { Button } from "@mui/material";
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import axios from 'axios';
import { useState } from "react";
import { useCookies } from "react-cookie";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';





export default function UserLogin() {
    let navigate = useNavigate();
    const [cookies, setCookie, removeCookie] = useCookies('token');


    const formik = useFormik({
        initialValues: {
            email: "",
            password: ""
        },
        validationSchema: Yup.object({
            email: Yup.string().email('Invalid email address').required('Required'),
            password: Yup.string()
                .min(6, 'Password must be at least 6 characters')
                .matches(
                    /^(?=.*[A-Z])(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
                    'Password must contain at least one uppercase letter and one special character'
                )
                .required('Password is required'),
        }),

        onSubmit: (formData) => {
            const { email, password } = formData;
            axios.post("http://localhost:3500/user/get-user", { email, password })
                .then((res) => {// Log response data
                    toast.success("Login sucessful", {
                        autoClose: 2000
                    })
                    setCookie('token', res.data);
                    setTimeout(() => {
                        navigate("/dashboard")
                    }, 2500)
                }).catch((error) => {
                    toast.error(error.response.data)
                })
        }

    });


    return (
        <>
            <ToastContainer />
            <div style={{ height: '400px' }} className="me-4 pe-4 d-flex justify-content-end align-items-center">
                <div>
                    <h1 className="text-white bi bi-person-fill  text-center">User Login</h1>
                    <form onSubmit={formik.handleSubmit} className="bg-white text-dark p-4">
                        <dl>
                            <dt className="mb-2">Email Id</dt>
                            <dd><input type="text" name="email" onChange={formik.handleChange} className="form-control" value={formik.values.email} /></dd>
                            {formik.errors.email && formik.touched.email && <div className="text-danger"> {formik.errors.email}</div>}

                            <dt className="mb-2">Password</dt>
                            <dd><input type="password" name="password" onChange={formik.handleChange} className="form-control" value={formik.values.password} /></dd>
                            {formik.errors.password && formik.touched.password && <div className="text-danger"> {formik.errors.password}</div>}
                        </dl>
                        <Button type="submit" variant="contained" color="info" className="w-100" > Login </Button>
                        <Link className="btn btn-link w-100 mt-2" to='/register'> New User? Register </Link>
                    </form>
                </div>
            </div>

        </>
    );
}

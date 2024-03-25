import { Button } from "@mui/material";
import axios from "axios";
import { useFormik } from "formik";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import * as Yup from 'yup'


export default function UserSignup() {
    let navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            name: "",
            email: "",
            username: "",
            contactnumber: "",
            password: ""

        },
        validationSchema: Yup.object({
            name: Yup.string().min(4, 'Name must be at least 4 characters').required('Name is required'),
            email: Yup.string().email('Invalid email address').required('Email is required'),
            username: Yup.string().required('Username is required'),
            contactnumber: Yup.string()
                .matches(/^\d{10}$/, 'Contact number must be exactly 10 digits')
                .required('Contact number is required'),
            password: Yup.string()
                .min(6, 'Password must be at least 6 characters')
                .matches(
                    /^(?=.*[A-Z])(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
                    'Password must contain at least one uppercase letter and one special character'
                )
                .required('Password is required'),
        }),

        onSubmit: (FormData) => {
            const { name, email, username, contactnumber, password } = FormData;
            axios.post('http://localhost:3500/user/register-user', { name, email, username, contactnumber, password }).
                then((res) => {
                    toast.success("User registered successfully!");
                    setTimeout(()=>{
                        navigate("/login")
                    },2000)
                    

                }).catch((err) => {
                    toast.error(err.response.data)
                })
        }
    })


    return (

        <>
            <ToastContainer />
            <div className="me-4 pe-4 d-flex justify-content-end align-items-center pt-5">
                <div>
                    <h1 className=" bi bi-person-fill  text-center">User SignUp</h1>
                    <form onSubmit={formik.handleSubmit} className="bg-white text-dark p-4">
                        <dl>
                            <dt>Name</dt>
                            <dd><input type="text" className="form-control" onChange={formik.handleChange} value={formik.values.name} name="name" /></dd>
                            {formik.errors.name && formik.touched.name && <div className="text-danger"> {formik.errors.name}</div>}

                            <dt>Email</dt>
                            <dd><input type="text" name="email" onChange={formik.handleChange} value={formik.values.email} className="form-control" /></dd>
                            {formik.errors.email && formik.touched.email && <div className="text-danger"> {formik.errors.email}</div>}

                            <dt>User name</dt>
                            <dd><input type=" text" name="username" value={formik.values.username} onChange={formik.handleChange} className="form-control" /></dd>
                            {formik.errors.username && formik.touched.username && <div className="text-danger"> {formik.errors.username}</div>}

                            <dt>Contact number</dt>
                            <dd><input type="text" name="contactnumber" value={formik.values.contactnumber} onChange={formik.handleChange} className="form-control" /></dd>
                            {formik.errors.contactnumber && formik.touched.contactnumber && <div className="text-danger"> {formik.errors.contactnumber}</div>}

                            <dt>Password</dt>
                            <dd><input type="password" name="password" className="form-control" onChange={formik.handleChange} value={formik.values.password} /></dd>
                            {formik.errors.password && formik.touched.password && <div className="text-danger"> {formik.errors.password}</div>}


                            <Button type="submit" variant="contained" color="info" className="w-100" > Login </Button>
                            <Link className="btn btn-link w-100 mt-2" to='/login'> Already registred? Login </Link>
                        </dl>
                    </form>
                </div>
            </div>
        </>

    )
}
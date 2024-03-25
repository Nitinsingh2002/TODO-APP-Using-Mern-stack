import { Button } from "@mui/material";
import axios from "axios";
import { useFormik } from "formik";
import { useEffect } from "react";
import { useCookies } from "react-cookie";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import * as Yup from 'yup'


export default function AddTask() {
    let navigate = useNavigate();

    const [cookies, setCookie, removeCookie] = useCookies('token');
    const token = cookies['token'];
    console.log(token)
    const formik = useFormik({
        initialValues: {
            title: "",
            description: "",
            date: new Date()
        },
        validationSchema: Yup.object({
            title: Yup.string().required('Title is required'),
            description: Yup.string().required('Description is required'),
            date: Yup.date().required('Date is required'),
        }),

        onSubmit: (FormData) => {
            const { title, description, date } = FormData;
            axios.post('http://localhost:3500/appointment/add-task', { title, description, date }, {
                headers: {
                    Authorization: token
                }
            }).
                then((res) => {
                    toast.success("Task added successfully!");
                    setTimeout(() => {
                        navigate("/dashboard")
                    }, 2000)
                }).catch((err) => {
                    toast.error(err.response.data)
                })
        }
    })

    useEffect(() => {
        if (!token) {
            navigate("/login")
        }
    }, [])


    return (
        <>
            <ToastContainer />
            <div className="me-4 pe-4 d-flex justify-content-end align-items-center pt-5">
                <div>
                    <h3 className="text-center">Add Appointment</h3>
                    <form onSubmit={formik.handleSubmit} className="bg-white text-dark p-4">
                        <dl>
                            <dt>Title</dt>
                            <dd><input type="text" className="form-control" onChange={formik.handleChange} value={formik.values.title} name="title" /></dd>
                            {formik.errors.title && formik.touched.title && <div className="text-danger"> {formik.errors.title}</div>}

                            <dt>Description</dt>
                            <dd><input type="text" name="description" onChange={formik.handleChange} value={formik.values.description} className="form-control" /></dd>
                            {formik.errors.description && formik.touched.description && <div className="text-danger"> {formik.errors.description}</div>}

                            <dt>Date</dt>
                            <dd><input type="date" name="date" value={formik.values.date} onChange={formik.handleChange} className="form-control" /></dd>
                            {formik.errors.date && formik.touched.date && <div className="text-danger"> {formik.errors.date}</div>}

                            <Button type="submit" variant="contained" color="info" className="w-100" > Add </Button>
                        </dl>
                    </form>
                </div>
            </div>
        </>
    )
}

import axios from "axios";
import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { useNavigate, Link } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {jwtDecode} from "jwt-decode"; // Correct import statement

export default function UserDashboard() {
    const [cookies, setCookie, removeCookie] = useCookies(['token']); // Corrected token key in useCookies
    const token = cookies.token;
    const [todos, setTodo] = useState([]);
    const navigate = useNavigate();

    function decodeToken(token) {
        try {
            if (!token) {
                throw new Error("Token not available");
            }
            const decodedToken = jwtDecode(token);
            const name = decodedToken.name;
            return name;
        } catch (error) {
            navigate("/login");
            return null;
        }
    }

    function getFirstName(name) {
        const parts = name.split(' ');
        return parts[0];
    }

    function loadData(token) {
        axios.get('http://localhost:3500/appointment/get-task', {
            headers: {
                Authorization: token
            }
        }).then((res) => {
            setTodo(res.data);
        }).catch((err) => {
            console.error(err);
        });
    }

    function handleSingout() {
        removeCookie('token');
        navigate('/');
    }

    function handleDelete(id, token) {
        axios.delete('http://localhost:3500/appointment/delete-task', {
            headers: {
                Authorization: token
            },
            data: {
                id: id
            }
        }).then((res) => {
            toast.success(res.data);
            loadData(token); // Reload todos after deletion
        }).catch((err) => {
            toast.error(err.response.data);
        });
    }

    useEffect(() => {
        if (!token) {
            navigate("/login");
        } else {
            loadData(token);
        }
    }, [token]);

    const name = decodeToken(token);

    return (
        <>
            <ToastContainer />
            <div className="row pt-4">
                <div className="col-7"></div>
                <div className="col-5">
                    <div className="d-flex justify-content-between">
                        {name ? <h3> Hello, {getFirstName(name)} </h3> : null}
                        <Link to="/add-task">  <button className="btn btn-primary">Add todo</button></Link>
                        <button onClick={handleSingout} className="btn btn-danger">Logout</button>
                    </div>
                    <div className="mt-4">
                        {todos.map(todo =>
                            <div key={todo._id} className="alert alert-success alert-dismissible">
                                <button className="btn btn-close" onClick={() => handleDelete(todo._id, token)}></button>
                                <div className="d-flex justify-content-between" >
                                    <h2 className="alert-title">{todo.title}</h2>
                                    <Link to={`/edit-task/${todo._id}`}><span className="bi bi-pencil-square me-2 fs-5"></span></Link>
                                </div>
                                <p className="alert-text">{todo.description}</p>
                                <p>{new Date(todo.date).toLocaleDateString()}</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}


import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './component/todo-home';
import UserLogin from './component/user-login';
import UserDashboard from './component/user-dashboard';
import AddTask from './component/add-task';
import EditTask from './component/edit-task';
import UserError from './component/user-error';
import UserSignup from './component/user-signup';

function App() {


  return (
    <div className="container-fluid todo-background">
      <BrowserRouter>
        <section className='mt-0'>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='register' element={<UserSignup />} />
            <Route path='login' element={<UserLogin />} />
            <Route path='dashboard' element={<UserDashboard />} />
            <Route path='add-task' element={<AddTask />} />
            <Route path='edit-task/:id' element={<EditTask />} />
            <Route path='error' element={<UserError />} />
          </Routes>
        </section>
      </BrowserRouter>
    </div>
  )
}

export default App

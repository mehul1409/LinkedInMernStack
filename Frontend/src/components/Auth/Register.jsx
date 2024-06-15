import React, { useContext, useState } from 'react'
import { Context } from '../../main';
import axios from 'axios';
import { Navigate, Link } from 'react-router-dom';
import toast from 'react-hot-toast';

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [phone, setPhone] = useState("");

  const { isAuthorized, setIsAuthorized, user, setUser } = useContext(Context);

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post('http://localhost:4000/api/v1/user/register',
        { name, email, password, phone, role }, {
        withCredentials: true,
      }
      );
      
      toast.success(data.message);
      setName("");
      setEmail("");
      setPassword("");
      setPhone("");
      setRole("");
      setIsAuthorized(true);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }

  if (isAuthorized) {
    return <Navigate to='/' />
  }
  return (
    <>
      <div className="authPage">
        <div className="container">
          <div className="header">
            <img src="" alt="" />
            <h3>create a new account</h3>
          </div>
          <form>
            <div className="inputTag">
              <label htmlFor="Register">Register As</label>
              <div>
                <select value={role} onChange={(e) => { setRole(e.target.value) }}>
                  <option value="">select role</option>
                  <option value="employee">employee</option>
                  <option value="jobseeker">job seeker</option>
                </select>
              </div>
            </div>
            <div className="inputTag">
              <label htmlFor="Name">Name</label>
              <div>
                <input type="text" value={name} onChange={(e) => { setName(e.target.value) }} />
              </div>
            </div>
            <div className="inputTag">
              <label htmlFor="Email">Email</label>
              <div>
                <input type="text" value={email} onChange={(e) => { setEmail(e.target.value) }} />
              </div>
            </div>
            <div className="inputTag">
              <label htmlFor="phone">Phone Number</label>
              <div>
                <input type="number" value={phone} onChange={(e) => { setPhone(e.target.value) }} />
              </div>
            </div>
            <div className="inputTag">
              <label htmlFor="password">Password</label>
              <div>
                <input type="password" value={password} onChange={(e) => { setPassword(e.target.value) }} />
              </div>
            </div>
            <button type='submit' onClick={handleRegister}>submit</button>
            <Link to='/login'>Already Have an account!</Link>
          </form>
        </div>
      </div>
    </>
  )
}

export default Register

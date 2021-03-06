import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setRegister, setError } from '../store/actions/userAction'

export default function Register() {
  let errorUser = useSelector(state => state.userReducer.error)
  const [registerInput, setRegisterInput] = useState({
    name: '',
    email: '',
    password: '',
    password_confirmation: ''
  })
  const history = useHistory()
  const dispatch = useDispatch()

  function onChange (e) {
    let { name, value } = e.target
    const newInput = { ...registerInput, [name]: value}
    setRegisterInput(newInput)
  }

  function register (e) {
    e.preventDefault()
    console.log(registerInput)
    if (registerInput.password !== registerInput.password_confirmation) {
      dispatch(setError('Password did not match'))
    } else {
      dispatch(setRegister(registerInput))
      history.push('/')
    }
  }

  useEffect(() => {
  }, [errorUser])

  return (
    <div>
      <h1>Ini Page Register</h1>
      {
        errorUser ? <h1>{JSON.stringify(errorUser)}</h1> : null
      }
      <form onSubmit={e => register(e)}>
        <label>Name</label>
        <input type="text" minLength={4} value={registerInput.name} onChange={onChange} name='name' placeholder='name...' required />
        <label>Email</label>
        <input type="email" value={registerInput.email} onChange={onChange} name='email' placeholder='email...' required />
        <label>Password</label>
        <input type="password" minLength={6} value={registerInput.password} onChange={onChange} name='password' placeholder='password...' required />
        <label>Retry password</label>
        <input type="password" minLength={6} value={registerInput.password_confirmation} onChange={onChange} name='password_confirmation' placeholder='retry password...' required />
        <input type="submit" value="Register"></input>
      </form>
      <Link to="/">Have an account?</Link>
    </div>
  )
}

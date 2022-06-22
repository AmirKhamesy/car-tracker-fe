import React, { useState } from "react";
import { useDispatch } from 'react-redux';
import { AppDispatch } from "../../app/store";
import { createPersonAsync } from './PersonSlice';

export default function PersonForm() {
  const dispatch = useDispatch<AppDispatch>();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');

  const isBlank = (string: String) => {
    return !(string.length > 0)
  }

  function submitHandler(e: any) {
    e.preventDefault();
    if (isBlank(firstName) || isBlank(lastName) || isBlank(email)) {
      alert("All fields must be filled to submit.")
      return
    }
    const formData = {
      person: {
        firstName: firstName,
        lastName: lastName,
        email: email
      }
    }
    dispatch(createPersonAsync(formData));
    resetState();
  }

  function resetState() {
    setFirstName('');
    setLastName('');
    setEmail('');
  }
  return <div className="border p-3">
    <h1>Create a new person</h1>
    <form >
      <input
        type="text"
        className="form-control text-start mb-2"
        name="First Name"
        placeholder="First Name"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
      />
      <input
        type="text"
        className="form-control text-start mb-2"
        name="Last Name"
        placeholder="Last Name"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
      />
      <input
        type="email"
        className="form-control text-start mb-2"
        name="Email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <button
        type="submit"
        className="btn btn-primary"
        onClick={(e) => submitHandler(e)}>Submit</button>
    </form>
  </div>;
}

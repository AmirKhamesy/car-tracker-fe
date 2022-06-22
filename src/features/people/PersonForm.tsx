import React, { useState } from "react";
import { useDispatch } from 'react-redux';
import { AppDispatch } from "../../app/store";
import {createPersonAsync} from './PersonSlice';

export default function PersonForm() {
  const dispatch = useDispatch<AppDispatch>();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');

  function submitHandler(e:any) {
    e.preventDefault();
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
  return <div>
  <h1>Create a new person</h1>
  <form>
    <input
      type="text"
      className="form-control text-start"
      name="First Name"
      value={firstName}
      onChange={(e) => setFirstName(e.target.value)}
      />
    <input
      type="text"
      className="form-control text-start"
      name="Last Name"
      value={lastName}
      onChange={(e) => setLastName(e.target.value)}
      />
    <input
      type="text"
      className="form-control text-start"
      name="Email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      />

      <button
        type="submit"
        onClick={(e) => submitHandler(e)}>Submit</button>
  </form>
</div>;
}

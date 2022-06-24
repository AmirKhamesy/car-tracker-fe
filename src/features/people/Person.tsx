import React, { useEffect, useState } from 'react';
import Cars from '../cars/Cars';
import ButtonGroup from './ButtonGroup';

export default function Person(props: any) {
    const [firstName, setFirstName] = useState(props.person.firstName);
    const [lastName, setLastName] = useState(props.person.lastName);
    const [email, setEmail] = useState(props.person.email);
    const [isEditing, setIsEditing] = useState(props.personToEdit === props.person.id);
    useEffect(() => {
        setIsEditing(props.personToEdit === props.person.id);
    }, [props.personToEdit, props.person.id])

    function submitHandler(e: any) {
        e.preventDefault();
        const formData = {
            person: {
                id: props.person.id,
                firstName: firstName,
                lastName: lastName,
                email: email
            }
        }
        props.submitEdit(formData)
        resetState();
    }

    function resetState() {
        setFirstName(props.person.firstName);
        setLastName(props.person.lastName);
        setEmail(props.person.email);
    }

    const firstNameElement = <h2 className="title text-start">{props.person.firstName} {props.person.lastName}</h2>;
    const emailElement = <h2 className="title text-start">{props.person.email}</h2>;
    const editableFirstName = <input
        type="text"
        className="form-control text-start"
        placeholder="First Name"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)} />;
    const editableLastName = <input
        type="text"
        className="form-control text-start"
        placeholder="Last Name"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)} />;
    const editableEmail = <input
        type="text"
        className="form-control text-start"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)} />;
    const submitButton = <button
        type="submit"
        className="btn btn-primary form-control"
        onClick={(e) => submitHandler(e)}>Submit</button>;

    const displayUserDetails = <div>
        {firstNameElement}
    </div>

    const editUserDetails = <div>
        {editableFirstName}
        {editableLastName}
    </div>



    const personCars = <Cars
        cars={props.person.cars}
        dispatch={props.dispatch}
        person={props.person}
    />


    return <div className="border p-5">
        <div className="row">
            <div className="col-8">
                {isEditing ? editUserDetails : displayUserDetails}
            </div>
            <div className="col-4">
                <ButtonGroup
                    person_id={props.person.id}
                    dispatch={props.dispatch}
                    toggleEditForm={props.toggleEditForm}
                    editing={isEditing}
                />

            </div>
        </div>
        <div className="row">
            <div className="col-8">
                {isEditing ? editableEmail : emailElement}
            </div>
        </div>
        <div className="row">
            <div className="col-2">
                {isEditing ? submitButton : ""}
            </div>
        </div>
        <div>
            {personCars}
        </div>

    </div >;
}

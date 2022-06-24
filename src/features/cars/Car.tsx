import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { useAppSelector } from "../../app/hooks";
import { selectPeople } from "../people/PersonSlice";
import ButtonGroup from "./ButtonGroup";
import { CarModelView } from "./Cars";

export default function Car(props: any) {
  const [make, setMake] = useState(props.car.make);
  const [model, setModel] = useState(props.car.model);
  const [year, setYear] = useState(props.car.year);
  const [price, setPrice] = useState(props.car.price);
  const [person_id, setPerson_id] = useState(props.car.person_id);
  const [isEditing, setIsEditing] = useState(props.carToEdit === props.car.id);
  const people = useAppSelector(selectPeople);

  useEffect(() => {
    setIsEditing(props.carToEdit === props.car.id);
  }, [props.carToEdit, props.car.id]);

  function submitHandler(e: any) {
    e.preventDefault();
    const formData = {
      car: {
        id: props.car.id,
        make: make,
        model: model,
        person_id: person_id,
        price: price,
        year: year,
      },
    };
    props.submitEdit(formData);
    resetState();
  }

  function resetState() {
    setMake(props.car.make);
    setModel(props.car.model);
    setYear(props.car.year);
    setPrice(props.car.price);
    setPerson_id(props.car.person_id);
  }

  const carTitleElement = (
    <h2 className="title text-start">
      {props.car.year + " " + props.car.make + " " + props.car.model}
    </h2>
  );
  const priceElement = <h2 className="title text-start text-success">${props.car.price}</h2>;
  const editableMake = (
    <input
      type="text"
      className="form-control text-start"
      placeholder="Make"
      value={make}
      onChange={(e) => setMake(e.target.value)}
    />
  );
  const editableModel = (
    <input
      type="text"
      className="form-control text-start"
      placeholder="Model"
      value={model}
      onChange={(e) => setModel(e.target.value)}
    />
  );
  const editableYear = (
    <input
      type="number"
      className="form-control text-start"
      placeholder="Year"
      value={year}
      onChange={(e) => setYear(e.target.value)}
    />
  );
  const editablePrice = (
    <input
      type="number"
      className="form-control text-start"
      placeholder="Price"
      value={price}
      onChange={(e) => setPrice(e.target.value)}
    />
  );
  const editableOwner = (
    people && people.length > 0 && (
      <Form.Select
        onChange={(event) => setPerson_id(event.target.value as any)}
      >
        {people.map((person) => {
          return (
            <option
              value={person.id}
              key={`${person.firstName}-${person.lastName}-option`}
            >
              {person.firstName} {person.lastName}
            </option>
          );
        })}
      </Form.Select>
    )
  );

  const submitButton = (
    <button
      type="submit"
      className="btn btn-primary form-control"
      onClick={(e) => submitHandler(e)}
    >
      Submit
    </button>
  );

  const displayCarDetails = (
    <div>
      {carTitleElement} <br />
      {priceElement}
    </div>
  );

  const editCarDetails = (
    <div>
      {editableMake}
      {editableModel}
      {editableYear}
      {editablePrice}
      {editableOwner}
    </div>
  );

  useEffect(() => {
    let mounted = true;
    if (mounted) {
      people && setPerson_id(people[0].id as any)
    }

    return () => {
      mounted = false
    }
  }, [people])

  return (
    <div className="border p-5">
      <div className="row">
        <div className="col-8">
          {isEditing ? editCarDetails : displayCarDetails}
        </div>
        <div className="col-4">
          <ButtonGroup
            car_id={props.car.id}
            dispatch={props.dispatch}
            toggleEditForm={props.toggleEditForm}
            editing={isEditing}
          />
        </div>
      </div>
      <div className="row">
        <div className="col-2">{isEditing ? submitButton : ""}</div>
      </div>
    </div>
    // <div key={`car-id-${props.car.id}`} style={{ margin: "5em" }}>
    //     <p>{props.car.year + " " + props.car.make + " " + props.car.model}</p>
    // </div>
  );
}

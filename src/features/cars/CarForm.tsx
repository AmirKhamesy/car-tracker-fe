import { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../app/hooks";
import { AppDispatch } from "../../app/store";
import { selectPeople } from "../people/PersonSlice";
import { createCarAsync } from "./CarSlice";

export default function CarForm() {
  const dispatch = useDispatch<AppDispatch>();
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [person_id, setPerson_id] = useState<Number>(0);
  const [price, setPrice] = useState<Number>(0);
  const [year, setYear] = useState<Number>(0);
  const people = useAppSelector(selectPeople);

  const isBlank = (string: String) => {
    return !(string.length > 0);
  };

  function submitHandler(e: any) {
    e.preventDefault();
    if (
      isBlank(make) ||
      isBlank(model) ||
      person_id === 0 ||
      price === 0 ||
      year === 0
    ) {
      alert("All fields must be filled to submit.");
      return;
    }
    const formData = {
      car: {
        make: make,
        model: model,
        person_id: person_id,
        price: price,
        year: year,
      },
    };
    dispatch(createCarAsync(formData));
    resetState();
  }

  function resetState() {
    setMake("");
    setModel("");
    setPerson_id(0);
    setPrice(0);
    setYear(0);
  }

  useEffect(() => {
    let mounted = true;
    if (mounted) {
      people && people.length > 0 && setPerson_id(people[0].id as any)
    }

    return () => {
      mounted = false
    }
  }, [people])


  return (
    <div className="border p-3">
      <h1>Create a new Car</h1>
      <form>
        <input
          type="text"
          className="form-control text-start mb-2"
          name="Make"
          placeholder="Make"
          value={make}
          onChange={(e) => setMake(e.target.value)}
        />
        <input
          type="text"
          className="form-control text-start mb-2"
          name="Model"
          placeholder="Model"
          value={model}
          onChange={(e) => setModel(e.target.value)}
        />
        <input
          type="number"
          className="form-control text-start mb-2"
          name="Price"
          placeholder="Price"
          value={price && price !== 0 ? price : ("" as any)}
          onChange={(e) => setPrice(e.target.value as any)}
        />
        <input
          type="number"
          className="form-control text-start mb-2"
          name="Year"
          placeholder="Year"
          value={year && year !== 0 ? year : ("" as any)}
          onChange={(e) => setYear(e.target.value as any)}
        />

        {people && people.length > 0 && (
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
        )}
        <button
          type="submit"
          className="btn btn-primary  mt-2"
          onClick={(e) => submitHandler(e)}
        >
          Submit
        </button>
      </form>
    </div>
  );
}

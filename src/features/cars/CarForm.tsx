import React, { useState } from "react";
import { useDispatch } from 'react-redux';
import { AppDispatch } from "../../app/store";
import { createCarAsync } from './CarSlice';

export default function CarForm() {
    const dispatch = useDispatch<AppDispatch>();
    const [make, setMake] = useState('');
    const [model, setModel] = useState('');
    const [person_id, setPerson_id] = useState<Number>(0);
    const [price, setPrice] = useState<Number>(0);
    const [year, setYear] = useState<Number>(0);

    const isBlank = (string: String) => {
        return !(string.length > 0)
    }

    function submitHandler(e: any) {
        e.preventDefault();
        if (isBlank(make) || isBlank(model) || person_id === 0 || price === 0 || year === 0) {
            alert("All fields must be filled to submit.")
            return
        }
        const formData = {
            car: {
                make: make,
                model: model,
                person_id: person_id,
                price: price,
                year: year
            }
        }
        dispatch(createCarAsync(formData));
        resetState();
    }

    function resetState() {
        setMake("")
        setModel("")
        setPerson_id(0)
        setPrice(0)
        setYear(0)
    }
    return <div className="border p-3">
        <h1>Create a new Car</h1>
        <form >
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
                value={price && price !== 0 ? price : "" as any}
                onChange={(e) => setPrice(e.target.value as any)}
            />
            <input
                type="number"
                className="form-control text-start mb-2"
                name="Year"
                placeholder="Year"
                value={year && year !== 0 ? year : "" as any}
                onChange={(e) => setYear(e.target.value as any)}
            />
            <input
                type="number"
                className="form-control text-start mb-2"
                name="Owner"
                placeholder="Owner"
                value={person_id && person_id !== 0 ? person_id : "" as any}
                onChange={(e) => setPerson_id(e.target.value as any)}
            />

            <button
                type="submit"
                className="btn btn-primary"
                onClick={(e) => submitHandler(e)}>Submit</button>
        </form>
    </div>;
}

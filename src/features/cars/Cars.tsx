import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../app/hooks';
import { AppDispatch } from '../../app/store';
import Car from './Car'
import { fetchCarsAsync, selectCars, selectStatus, Statuses, updateCarAsync } from './CarSlice';


export interface CarModelValues {
    created_at: String;
    id: Number;
    make: String;
    model: String;
    person_id: Number;
    price: Number;
    updated_at: String;
    year: Number;
}

export interface CarModelView {
    car: {
        created_at: String
        id: Number
        make: String
        model: String
        person_id: Number
        price: Number
        updated_at: String
        year: Number
    }
}


interface CarShowDetails {
    cars: CarModelValues[],
    dispatch: any
}
export default function Cars(props: CarShowDetails) {
    const cars = useAppSelector(selectCars);
    const status = useAppSelector(selectStatus);

    const [carToEdit, setCarToEdit] = useState(0);

    useEffect(() => {
        props.dispatch(fetchCarsAsync());
    }, [props.dispatch]);

    function toggleCarEditForm(car_id?: Number) {
        if (carToEdit === car_id) {
            setCarToEdit(0);
        } else {
            setCarToEdit(car_id as number);
        }
    }

    function submitEdit(formData: any) {
        props.dispatch(updateCarAsync(formData));
        toggleCarEditForm();
    }
    return (
        <div>
            {
                status !== Statuses.UpToDate ?
                    <div>{status}</div>
                    :
                    cars && cars.length > 0 && cars.map((car: any) => {
                        return <Car
                            car={car}
                            key={`car-${car.id}-owner-${car.person_id}`}
                            car_id={car.id}
                            dispatch={props.dispatch}
                            toggleEditForm={() => toggleCarEditForm(car.id)}
                            submitEdit={submitEdit}
                            carToEdit={carToEdit}
                        />
                    })
            }
        </div>

    )
}

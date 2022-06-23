import React from 'react'
import Car from './Car'


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
    cars: CarModelValues[]
}
export default function Cars(props: CarShowDetails) {
    return (
        <div>
            {props.cars && props.cars.length > 0 && props.cars.map((car: CarModelValues) => {
                return <Car car={car} />
            })}
        </div>

    )
}

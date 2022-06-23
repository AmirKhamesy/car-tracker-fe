import React from 'react'
import { CarModelView } from './Cars'


export default function Car(props: CarModelView) {
    return (
        <div key={`car-id-${props.car.id}`} style={{ margin: "5em" }}>
            <p>{props.car.year + " " + props.car.make + " " + props.car.model}</p>
        </div>
    )
}

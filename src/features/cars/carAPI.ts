import {  CarsState, CarFormData, CarDeleteData } from "./CarSlice";

const API_URL = "http://localhost:3000";

export async function fetchCars() {
    return fetch(`${API_URL}/cars.json`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .catch((error) => {
        console.log("Error: ", error);
        return {} as CarsState;
      });
  }

  export async function createCar(payload: CarFormData) {
    const car = payload.car;
    return fetch(`${API_URL}/cars.json`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        car,
      }),
    })
      .then((response) => response.json())
      .catch((error) => {
        console.log("Error: ", error);
        return {} as CarsState;
      });
  }

  export async function updateCar(payload: CarFormData) {
    const car = payload.car;
    return fetch(`${API_URL}/cars/${car.id}.json`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        car,
      }),
    })
      .then((response) => response.json())
      .catch((error) => {
        console.log("Error: ", error);
        return {} as CarsState;
      });
  }
  
  export async function destroyCar(payload: CarDeleteData) {
    const car = payload.car;
    return fetch(`${API_URL}/cars/${car.car_id}.json`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        car,
      }),
    })
      .then((response) => response.json())
      .catch((error) => {
        console.log("Error: ", error);
        return {} as CarsState;
      });
  }
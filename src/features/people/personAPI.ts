import {  PeopleState, PersonDeleteData, PersonFormData } from "./PersonSlice";

const API_URL = "http://localhost:3000";

export async function fetchPeople() {
    return fetch(`${API_URL}/people.json`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .catch((error) => {
        console.log("Error: ", error);
        return {} as PeopleState;
      });
  }

  export async function createPerson(payload: PersonFormData) {
    const person = payload.person;
    return fetch(`${API_URL}/people.json`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        person,
      }),
    })
      .then((response) => response.json())
      .catch((error) => {
        console.log("Error: ", error);
        return {} as PeopleState;
      });
  }

  export async function updatePerson(payload: PersonFormData) {
    const person = payload.person;
    return fetch(`${API_URL}/people/${person.id}.json`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        person,
      }),
    })
      .then((response) => response.json())
      .catch((error) => {
        console.log("Error: ", error);
        return {} as PeopleState;
      });
  }
  
  export async function destroyPerson(payload: PersonDeleteData) {
    const person = payload.person;
    return fetch(`${API_URL}/people/${person.person_id}.json`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        person,
      }),
    })
      .then((response) => response.json())
      .catch((error) => {
        console.log("Error: ", error);
        return {} as PeopleState;
      });
  }
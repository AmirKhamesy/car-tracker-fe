import {  PeopleState } from "./PersonSlice";

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
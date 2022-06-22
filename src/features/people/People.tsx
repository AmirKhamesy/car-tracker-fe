import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../app/hooks";
import { AppDispatch } from "../../app/store";
import Person from "./Person";
import PersonForm from "./PersonForm";
import { fetchPeopleAsync, selectPeople, selectStatus, Statuses, updatePersonAsync } from "./PersonSlice";

export default function People() {
  const people = useAppSelector(selectPeople);
  const status = useAppSelector(selectStatus);
  const dispatch = useDispatch<AppDispatch>();

  const [personToEdit, setPersonToEdit] = useState(0);

  useEffect(() => {
    dispatch(fetchPeopleAsync());
  }, [dispatch]);

  function toggleEditForm(person_id?:number) {
    if (personToEdit === person_id) {
        setPersonToEdit(0);
    } else {
          setPersonToEdit(person_id as number);
    }
}

function submitEdit(formData:any) {
    dispatch(updatePersonAsync(formData));
    toggleEditForm();
}

  let contents;

  if (status !== Statuses.UpToDate) {
    contents = <div>{status}</div>
  } else {
      contents = <div className="card">
        <div className="card-body">
            <h3>{status}</h3>
            <PersonForm />
            {people && people.length > 0 && people.map(person => {
                return <div key={person.id} style={{margin:"5em"}}>
                    <Person 
                        dispatch={dispatch}
                        person={person}
                        toggleEditForm={() => toggleEditForm(person.id)}
                        personToEdit={personToEdit}
                        submitEdit={submitEdit}
                    />
                </div>
            })}
            </div>
      </div>
  }

  return <div><h1>Posts</h1>
        {contents}
  </div>
}

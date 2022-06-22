import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../app/hooks";
import Person from "./Person";
import { fetchPeopleAsync, selectPeople, selectStatus, Statuses } from "./PersonSlice";

export default function People() {
  const people = useAppSelector(selectPeople);
  const status = useAppSelector(selectStatus);
  const dispatch: any = useDispatch();

  useEffect(() => {
    dispatch(fetchPeopleAsync());
  }, [dispatch]);
  let contents;

  if (status !== Statuses.UpToDate) {
    contents = <div>{status}</div>
  } else {
      contents = <div className="card">
        <div className="card-body">
            <h3>{status}</h3>
            <PeopleForm />
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

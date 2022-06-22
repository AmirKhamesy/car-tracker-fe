import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../app/hooks";
import { fetchPeopleAsync, selectPeople, selectStatus } from "./PersonSlice";

export default function People() {
  const people = useAppSelector(selectPeople);
  const status = useAppSelector(selectStatus);
  const dispatch: any = useDispatch();

  useEffect(() => {
    dispatch(fetchPeopleAsync());
  }, [dispatch]);

  return (
    <div>
      <div className="h1">People</div>
    </div>
  );
}

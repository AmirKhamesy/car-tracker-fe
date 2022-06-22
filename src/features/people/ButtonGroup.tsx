import React from 'react'
import { destroyPersonAsync } from './PersonSlice';

export default function ButtonGroup(props:any) {

    function handleClick(e:any) {
        const payload = {
            person: {
                person_id: props.person_id
            }
        }
        props.dispatch(destroyPersonAsync(payload));
    }
  return <div className="btn-group float-end">
      <button 
        className="btn btn-warning"
        onClick={() => props.toggleEditForm()}>Edit</button>
      <button 
      className="btn btn-danger" 
      onClick={(e) => handleClick(e)}>Delete</button>
  </div>;
}

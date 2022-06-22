import React, { useState } from 'react'
import { destroyPersonAsync } from './PersonSlice';

export default function ButtonGroup(props: any) {

    const [showModal, setShowModal] = useState(false)

    function handleClick(e: any) {
        const payload = {
            person: {
                person_id: props.person_id
            }
        }
        props.dispatch(destroyPersonAsync(payload));
    }

    return <div className="btn-group float-end">

        {
            props.editing ?
                <button
                    className="btn btn-danger"
                    onClick={() => props.toggleEditForm()}>Cancel</button>
                :
                <>
                    <button
                        className="btn btn-warning"
                        onClick={() => props.toggleEditForm()}>Edit</button>
                    <button
                        className="btn btn-danger"
                        onClick={(e) => handleClick(e)}>Delete</button>
                </>
        }
    </div>;
}

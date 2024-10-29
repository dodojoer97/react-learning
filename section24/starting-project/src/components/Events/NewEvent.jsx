// React query
import {useMutation} from "@tanstack/react-query"
import {createNewEvent, queryClient} from "../../util/http.js"

import { Link, useNavigate } from 'react-router-dom';

import Modal from '../UI/Modal.jsx';
import EventForm from './EventForm.jsx';
import ErrorBlock from "../UI/ErrorBlock.jsx";

export default function NewEvent() {
  const navigate = useNavigate();

  const {mutate, isPending, isError, error} = useMutation({
    mutationFn: createNewEvent,
    onSuccess: () => {
      navigate("/events")
      queryClient.invalidateQueries({queryKey: ['events'], exact: false}) // if exact is not sent or false, any query with 'events' will be re executed
    }
  })

  function handleSubmit(formData) {
    mutate({event: formData})
  }

  return (
    <Modal onClose={() => navigate('../')}>
      <EventForm onSubmit={handleSubmit}>
        {isPending && "PENDING"}
        {!isPending &&
          <>
            <Link to="../" className="button-text">
              Cancel
            </Link>
            <button type="submit" className="button">
              Create
            </button>
          </>
        }
      </EventForm>
      {isError && <ErrorBlock title="Failed to create event" message={error.message || "Failed"}/>}
    </Modal>
  );
}

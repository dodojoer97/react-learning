import { Link, Outlet, useParams } from 'react-router-dom';

import { useQuery, useMutation } from '@tanstack/react-query';
import {fetchEvent, deleteEvent} from "../../util/http.js"

import Header from '../Header.jsx';
import ErrorBlock from '../UI/ErrorBlock.jsx';

export default function EventDetails() {
  const {id} = useParams()
  
  const {data, isPending: isFetchEventPending, isError: isFetchEventError, error: fetchEventError} = useQuery({
    queryKey: ['events', id],
    queryFn: ({signal}) => fetchEvent({id, signal})
  })

  console.log("Data: ", data)


  return (
    <>
      <Outlet />
      <Header>
        <Link to="/events" className="nav-item">
          View all Events
        </Link>
      </Header>

      {isFetchEventPending && "Loading event data"}

      {isFetchEventError && <ErrorBlock title="Error getting event details" message={fetchEventError.message}/>}

      {data && 
        <article id="event-details">
          <header>
            <h1>{data.title}</h1>
            <nav>
              <button>Delete</button>
              <Link to="edit">Edit</Link>
            </nav>
          </header>
          <div id="event-details-content">
            <img src={"http://localhost:3000/" + data.image} alt="" />
            <div id="event-details-info">
              <div>
                <p id="event-details-location">{data.location}</p>
                <time dateTime={`Todo-DateT$Todo-Time`}>{data.date} @ {data.time}</time>
              </div>
              <p id="event-details-description">{data.description}</p>
            </div>
          </div>
        </article>
      }
    </>
  );
}

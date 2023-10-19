import { useLoaderData, json } from 'react-router-dom';

import EventsList from '../components/EventsList';

function EventsPage() {
  const events = useLoaderData();
  // if(events.isError){
  //   return <p>{events.message}</p>
  // }
  return (
    <>
      {<EventsList events={events} />}
    </>
  );
}

export default EventsPage;

export async function  EventsLoader() {
  const response = await fetch('http://localhost:8080/events');

  if (!response.ok) {
  //return {isError:true, message:"could not fetch"}
  throw json({message: 'Could not fetch events.'}, {status:500});
  } else {
    const resData = await response.json();
    return resData.events;
  }
}
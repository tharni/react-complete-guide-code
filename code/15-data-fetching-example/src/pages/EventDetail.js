import { useRouteLoaderData,json, redirect } from 'react-router-dom';
import EventItem from '../components/EventItem';

function EventDetailPage() {
  const data = useRouteLoaderData('event-detail');
  return (
    <>
    {<EventItem event={data.event}/> }
    </>
  );
}

export default EventDetailPage;

export async function loader({request, params}) {
  const id = params.eventId;
  const response = await fetch('http://localhost:8080/events/'+ id)
  if(!response.ok){
    throw json({message:"could not fetch details"},{status:500});
  } else {
    console.log(response);
    const resData = await response.json();
    
    return resData;
 
  }
}

export async function action({params, request}) {
  const eventId = params.eventId;
  const response = await fetch('http://localhost:8080/events/' + eventId, {method: request.method});
  console.log('redirecting..'+ response.ok);
  if(!response.ok){
    throw json({message:'could not delete event'}, {status:500})
  }
  console.log('redirecting..');
  return redirect('/events')
}
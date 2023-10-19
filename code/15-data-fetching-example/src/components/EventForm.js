import { useNavigate, Form, useNavigation, useActionData, json, redirect } from 'react-router-dom';

import classes from './EventForm.module.css';

function EventForm({ method, event }) {
  const navigate = useNavigate();
  const navigation = useNavigation();
  const data = useActionData();
  const isSubmitting = navigation.state === 'submitting';
  function cancelHandler() {
    navigate('..');
  }

  return (
    <Form method={method} className={classes.form}>
      {data && data.errors && <ul>
             {Object.values(data.errors).map(error => <li key={error}>{error}</li>)}
        </ul>
      }
      <p>
        <label htmlFor="title">Title</label>
        <input id="title" type="text" name="title"  defaultValue={event? event.title: ''}/>
      </p>
      <p>
        <label htmlFor="image">Image</label>
        <input id="image" type="url" name="image"  defaultValue={event? event.image: ''}/>
      </p>
      <p>
        <label htmlFor="date">Date</label>
        <input id="date" type="date" name="date"  defaultValue={event? event.date: ''}/>
      </p>
      <p>
        <label htmlFor="description">Description</label>
        <textarea id="description" name="description" rows="5"  defaultValue={event? event.description: ''}/>
      </p>
      <div className={classes.actions}>
        <button type="button" onClick={cancelHandler} disabled={isSubmitting}>
          Cancel
        </button>
        <button disabled={isSubmitting}>{isSubmitting? 'Submitting...':'Save'}</button>
      </div>
    </Form>
  );
}

export default EventForm;


export async function action({request, params}){
  const data = await request.formData();
  const method = request.method;
  const eventData = {
    title:data.get('title'),
    image:data.get('image'),
    date:data.get('date'),
    description:data.get('description'),
  }
  let url = 'http://localhost:8080/events';
  if (method === 'PATCH'){
    url = 'http://localhost:8080/events/' + params.eventId; 
  }
  console.log(method);
  const response = await fetch(url,{
    method:method,
    body: JSON.stringify(eventData),
    headers: {'Content-Type':'application/json'}
  });
  if(response.status === 422){
    return response;
  }
  if(!response.ok){
    throw json({message:'could not save event'},{status:500});
  }

  return redirect('/events')
}
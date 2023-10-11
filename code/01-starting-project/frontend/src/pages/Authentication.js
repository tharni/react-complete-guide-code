import AuthForm from '../components/AuthForm';
import { json, redirect } from 'react-router-dom';
function AuthenticationPage() {
  return <AuthForm />;
}


export default AuthenticationPage;

export async function action({request}){
  console.log('hello world');
   const searchParams = new URL(request.url).searchParams;
   const mode = searchParams.get('mode') || 'login';

   if(mode !== 'login' && mode !== 'signup'){
    return json({'message':'unsupported mode'}, {'status':'422'});
   }
   console.log('hello world1');
   const data = await request.formData();
   const authData = {
    email: data.get('email'),
    password: data.get('password')
   }
   console.log('hello world12');
   const response = await fetch("http://localhost:8080/" + mode,{
    method:'POST',
    headers:{
      "Content-Type": "application/json"
    }
    ,
    body:JSON.stringify(authData)
   });
   console.log('hello world3');
   if(response.status === 401 || response.status===422){
    return response;
   }
   console.log('hello world4');
   if(!response.ok){
    return json({status:500}, {message:'something went wrong'})
   }
  
  const resdata = await response.json();
  const token = resdata.token;
  localStorage.setItem('token', token);
  const expiration = new Date();
  expiration.setHours(expiration.getHours + 1);
  localStorage.setItem('expiration', expiration.toISOString());
   return redirect('/');
}
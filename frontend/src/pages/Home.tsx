

import RemoteUser from 'components/User';
import Button from 'components/Button';
import useAuth from '../hooks/useAuth';
import { Link, useNavigate } from 'react-router-dom';
import { type MouseEvent } from 'react';
import { useMutation } from '@tanstack/react-query';
import { logout } from '../lib/api';
import queryClient from '../config/queryClient';

  const user: any = {
      id: "dsafsfefae",
      email: "nag@gmao.com",
      verified: false
  }

const Home = () => {
   const navigate = useNavigate();
     const {
         mutate: logoutHandler
     } = useMutation({
         mutationFn: logout,
         onSuccess: () => {
            // Clear **all** cached data
      queryClient.clear();
      // Optional: also remove all ongoing queries
      queryClient.cancelQueries();
           navigate("/login")
         }

     }) 
  const {user, isPending, isError} = useAuth();

  if(isPending) return <h1>loading..........</h1>

 

  return (
    <>
    <div>
    {isPending && <h1>loading..........</h1>}
    {isError && <div><h3>Please Login here: </h3> <Button><Link to="/login">Login</Link></Button></div> }
    {user &&  <RemoteUser user={user} />}
    {user && <Button onClick={logoutHandler} >Logout</Button>}
        </div>
    </>
  )
}

export default Home
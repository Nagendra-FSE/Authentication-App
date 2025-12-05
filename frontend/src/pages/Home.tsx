

import RemoteUser from 'user/User';
import useAuth from '../hooks/useAuth';
import { Link } from 'react-router-dom';

  const user: any = {
      id: "dsafsfefae",
      email: "nag@gmao.com",
      verified: false
  }

const Home = () => {
  const {user, isPending, isError} = useAuth();
console.log(user)
  if(isPending) return <h1>loading..........</h1>

  

  return (
    <>
    <div>


    {isPending && <h1>loading..........</h1>}
    {isError &&  <h1>Please Login here: <Link to="/login" /> </h1>}
    {user &&  <RemoteUser user={user} />}
        </div>
    </>
  )
}

export default Home
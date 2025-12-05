

import RemoteUser from 'user/User';
import useAuth from '../hooks/useAuth';

  const user: any = {
      id: "dsafsfefae",
      email: "nag@gmao.com",
      verified: false
  }

const Home = () => {
  const {user, isPending, isError} = useAuth();
console.log(user)
  if(isPending) return <h1>loading..........</h1>

  if(isError) return <h1>error..........</h1>

  return (
    <>
    <div>Home</div>

              <RemoteUser user={user} />

    </>
  )
}

export default Home
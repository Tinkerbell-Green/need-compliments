import type {NextPage} from "next";
import {signIn, signOut, useSession} from "next-auth/react";

const Home: NextPage = () => {
  const{data:session} = useSession();

  if(session){
    return(
      <>
        <h1>Hello, {session.user?.name}!</h1>
        <span>{session.user?.email}</span>
        <button onClick={()=>signOut()}>Sign Out</button>
      </>
    )
  } else{
    signIn();
    return <></>;
  }
};

export default Home;

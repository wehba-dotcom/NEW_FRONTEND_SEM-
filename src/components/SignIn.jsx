import LogIn from './LogIn';

function SignIn({ logout, loggedIn, setLoggedIn, facade, setErrorMessage }) {
  
  return (
    <div style={{textAlign:"center"}}>
      {!loggedIn ? (
        <LogIn facade={facade} setLoggedIn={setLoggedIn} setErrorMessage={setErrorMessage} />
      ) : (
        <div>
          <p><button onClick={logout}>Logout</button></p>
          <p>Role: {facade.getUserRoles()}</p>
        </div>
      )}
    </div>
  );
}

export default SignIn;
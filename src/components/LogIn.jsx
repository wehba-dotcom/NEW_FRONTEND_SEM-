import { useState } from "react";

export default function LogIn({ facade, setLoggedIn, setErrorMessage })
{
    
    const init = { username: "", password: "" };
    const [loginCredentials, setLoginCredentials] = useState(init);

    const performLogin = (evt) =>
    {
        evt.preventDefault();
        facade.login(loginCredentials.username, loginCredentials.password, setLoggedIn, setErrorMessage)
    }
    const onChange = (evt) =>
    {
        setLoginCredentials({ ...loginCredentials, [evt.target.id]: evt.target.value })
    }



    return (
        <div style={{textAlign:"center"}}>
            <h2>Login</h2>
            <form onChange={onChange} >
                <input placeholder="User Name" id="username" /><br/><br/>
                <input placeholder="Password" id="password" /><br/><br/>
                <button onClick={performLogin} >Login</button>
            </form>
        </div>
    )

}
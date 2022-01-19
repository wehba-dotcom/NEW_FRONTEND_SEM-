import URL from './setting'
function handleHttpErrors(res)
{
    if (!res.ok)
    {
        return Promise.reject({ status: res.status, fullError: res.json() })
    }
    return res.json();
}

let apiFacade = () =>
{

    const fetchData = (endpoint, updateAction, SetErrorMessage) =>
    {
        const options = makeOptions("GET", true); //True add's the token
        return fetch(URL + "/api/" + endpoint, options)
            .then(handleHttpErrors)
            .then((data) => updateAction(data))
            .catch(err =>
            {
                if (err.status)
                {
                    console.log(err)
                    err.fullError.then(e => SetErrorMessage(e.code + ": " + e.message))
                }
                else { SetErrorMessage("Network error"); }
            })
    }


    const deleteTrip = (id,SetErrorMessage)=>{
        const options = makeOptions("DELETE",false)
        return  fetch(URL+ "/api/trip/"+id, options)
        .then(handleHttpErrors)
        .catch(err =>
        {
            if (err.status)
            {
                console.log(err)
                err.fullError.then(e => SetErrorMessage(e.code + ": " + e.message))
            }
            else { SetErrorMessage("Network error"); }
        })
    }

    const addTrip = ( date,  duration,location,name, packingList,time, SetErrorMessage) =>{
        const options = makeOptions("POST", true, {  date: date,duration:duration, location: location, name: name, packingList: packingList, time:time}); //True add's the token
        return fetch(URL+ "/api/trip/add", options)
        .then(handleHttpErrors)
        .catch(err =>
        {
            if (err.status)
            {
                console.log(err)
                err.fullError.then(e => SetErrorMessage(e.code + ": " + e.message))
            }
            else { SetErrorMessage("Network error"); }
        })
    }
    

    const login = (user, password, setLoggedIn, setErrorMessage) =>
    {
        const options = makeOptions("POST", true, { username: user, password: password });
        return fetch(URL+ "/api/login", options)
            .then(handleHttpErrors)
            .then(res =>
            {
                setToken(res.token)
                setLoggedIn(true);
                setErrorMessage('Logged in');
            })
            .catch((err) =>
            {
                if (err.status)
                {
                    err.fullError.then((e) => setErrorMessage(e.code + ': ' + e.message));
                } else
                {
                    setErrorMessage('Network error');
                }
            });
    }




    // Security funktionalitet

    const setToken = (token) =>
    {
        localStorage.setItem('jwtToken', token)
    }
    const getToken = () =>
    {
        return localStorage.getItem('jwtToken')
    }
    const loggedIn = () =>
    {
        const loggedIn = getToken() != null;
        return loggedIn;
    }
    const logout = () =>
    {
        localStorage.removeItem("jwtToken");
    }

    const getUserRoles = () =>
    {
        const token = getToken()
        if (token != null)
        {
            const payloadBase64 = getToken().split('.')[1]
            const decodedClaims = JSON.parse(window.atob(payloadBase64))
            const roles = decodedClaims.roles
            return roles
        } else return ""
    }

    const hasUserAccess = (neededRole, loggedIn) =>
    {
        const roles = getUserRoles().split(',')
        return loggedIn && roles.includes(neededRole)
    }

    const makeOptions = (method, addToken, body) =>
    {
        var opts = {
            method: method,
            headers: {
                "Content-type": "application/json",
                'Accept': 'application/json',
            }
        }
        if (addToken && loggedIn())
        {
            opts.headers["x-access-token"] = getToken();
        }
        if (body)
        {
            opts.body = JSON.stringify(body);
        }
        return opts;
    }

    return {
        deleteTrip,
        addTrip,
        makeOptions,
        fetchData,
        setToken,
        getToken,
        loggedIn,
        login,
        logout,
        getUserRoles,
        hasUserAccess,
    }

}

const facade = apiFacade()

export default facade

import URL1 from './setting' ;
 
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

const login = (user, password, setLoggedIn, setErrorMessage) =>
{
    const options = makeOptions("POST", true, { username: user, password: password });
    return fetch(URL1 + "/api/login", options)
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

const fetchData = (endpoint, updateAction, SetErrorMessage) =>
{
    const options = makeOptions("GET", true); //True add's the token
    return fetch(URL1 + "/api/" + endpoint, options)
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

const addTrip = (name, date, time, location, duration, packingList, SetErrorMessage) =>{
    const options = makeOptions("POST", true, { tripName: name, tripDate: date, tripTime: time, tripLocation: location, tripDuration: duration, tripPackingList: packingList}); //True add's the token
    return fetch(URL1 + "/api/trip/add", options)
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

const addGuide = (name, gender, SetErrorMessage) => {
    const options = makeOptions("POST", true, { guideName: name, guideGender: gender}); //True add's the token
    return fetch(URL1 + "/api/trip/add", options)
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

const addUserToTrip = (endpoint, SetErrorMessage) => {
    const options = makeOptions("POST", true); //True add's the token
    return fetch(URL1 + "/api/trip/usertotrip" + endpoint, options)
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

//collect userName out from token
const getUserName = () =>
    {
        const token = getToken()
        if (token != null)
        {
            const payloadBase64 = getToken().split('.')[1]
            const decodedClaims = JSON.parse(window.atob(payloadBase64))
            const username = decodedClaims.username
            return username
        } else return ""
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
        makeOptions,
        fetchData,
        addTrip,
        addGuide,
        addUserToTrip,
        getUserName,
        setToken,
        getToken,
        loggedIn,
        login,
        logout,
        getUserRoles,
        hasUserAccess,
    }

}

const facade2 = apiFacade()

export default facade2
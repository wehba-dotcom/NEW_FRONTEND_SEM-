import './App.css';
import Header from './components/Header.jsx';
import Home from './components/Home.jsx';
import Trips from './components/Trips';
import Element2 from './components/Element2.jsx';
import Element3 from './components/Element3.jsx';
import ModifyTrip from './components/ModifyTrip.jsx';
import Trip2 from './components/Trip2.jsx';
import SignIn from './components/SignIn';
import NoMatch from './components/NoMatch.jsx';
import facade from './apiFacade';
import { Container, Alert } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';




function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState('  SignIn and you will have agood detials');

  const logout = () => {
    facade.logout();
    setLoggedIn(false);
    setErrorMessage('Logged out.')
  };

  return (
    <Container>
      <Router>
        <Header facade={facade} loggedIn={loggedIn} />
        <Switch>
          <Route  exact path="/">
            <Home/>
          </Route>
          <Route  path="/signin">
            <SignIn
            logout={logout}
            loggedIn={loggedIn}
            setLoggedIn={setLoggedIn}
            facade={facade}
            setErrorMessage={setErrorMessage}
            />
            </Route>
          <Route path="/trips">
            {facade.hasUserAccess('user', loggedIn) && 
              <Trips facade={facade} errorMessage={errorMessage} setErrorMessage={setErrorMessage}/>}
          </Route>
          <Route path="/element2">
            {facade.hasUserAccess('user', loggedIn) && 
              <Element2  facade={facade} setErrorMessage={setErrorMessage} errorMessage={errorMessage} />}
          </Route>
          <Route path="/element3">
            {facade.hasUserAccess('user', loggedIn) && 
              <Element3 facade={facade} errorMessage={errorMessage} setErrorMessage={setErrorMessage} />}
          </Route>
         
          <Route path="/modifytrip">
            {facade.hasUserAccess('admin', loggedIn) && 
              <ModifyTrip facade={facade} errorMessage={errorMessage} setErrorMessage={setErrorMessage} />}
          </Route>
          <Route path="/trip2">
            {facade.hasUserAccess('admin', loggedIn) && 
              <Trip2 facade={facade} errorMessage={errorMessage} setErrorMessage={setErrorMessage} />}
          </Route>
          <Route path="*">
            <NoMatch />
          </Route>
        </Switch>
      </Router>
      <Alert className="mt-4" >Status: {errorMessage}</Alert>
    </Container>
  );
}

export default App;

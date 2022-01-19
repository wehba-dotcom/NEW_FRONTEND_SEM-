import { NavLink } from 'react-router-dom';

function Header({ facade, loggedIn }) {
  return (
    <div style={{marginTop:'40px'}}>
      <ul className="header">
        <li> <NavLink exact activeClassName="active" to="/"> Home </NavLink></li>
              
        {facade.hasUserAccess('user', loggedIn) && (
          <li><NavLink activeClassName="active" to="/trips">Trips</NavLink></li>
        )}
         {facade.hasUserAccess('user', loggedIn) && (
          <li><NavLink activeClassName="active" to="/element2">element2</NavLink></li>
        )}
         {facade.hasUserAccess('user', loggedIn) && (
          <li><NavLink activeClassName="active" to="/element3">element3</NavLink></li>
        )}
        
        {facade.hasUserAccess('admin', loggedIn) && (
          <li><NavLink activeClassName="active" to="/modifyTrip">ModifyTrip</NavLink></li>
        )}
         {facade.hasUserAccess('admin', loggedIn) && (
          <li><NavLink activeClassName="active" to="/Trip2"> AddTrip</NavLink></li>
        )}
         <li><NavLink  activeClassName="active" to="/signin">SignIn</NavLink></li>
      </ul>
    </div>
  );
}

export default Header;

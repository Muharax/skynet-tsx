import React from 'react';
import { useAuth } from './AuthContext';
// import { Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import './Logout.css';


const Logout = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    // console.log(`Logout -> handleLogout (click)`);
    logout();
  };
  
  // const handleLogoutNO = () => {
  //   return <Navigate to="/home" />;
  // };

  const handleLogoutNO = () => {
    navigate('/home');
  };

  return (
    <div className='main'>
    <div className='Logout-main'>
      <p>Czy chcesz się wylogować?</p>
      <button className="btn btn-logout" onClick={handleLogout}>WYLOGUJ SIĘ</button>
      <button className="btn btn-NIE" onClick={handleLogoutNO}>NIE</button>
    </div>
    </div>
  );
}

export default Logout;

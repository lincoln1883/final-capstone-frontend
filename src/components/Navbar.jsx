import React from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logoutUser } from '../redux/reducers/auth/logoutSlice';
import FooterToolbar from './FooterToolbar';

const Navbar = () => {
  const userInfo = JSON.parse(localStorage.getItem('user')) || [];
  const user = userInfo.data;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const adminLinks = [
    { path: '/trade', text: 'Home' },
    { path: '/trade/reserve', text: 'Reserve' },
    { path: '/trade/reservations', text: 'My Reservations' },
    { path: '/trade/add', text: 'Add Trade' },
    { path: '/trade/delete', text: 'Delete Trade' },
  ];

  const userLinks = [
    { path: '/trade', text: 'Home' },
    { path: '/trade/reserve', text: 'Reserve' },
    { path: '/trade/reservations', text: 'My Reservations' },
  ];

  const handleLogout = () => {
    dispatch(logoutUser());
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    navigate('/');
  };

  const headerStyle = {
    fontFamily: 'Dancing Script',
  };

  return (
    <nav className="w-50 flex flex-col justify-between center border-e-2">
      <div className="flex flex-col justify-between items-center gap-8 m-3">
        <h1
          className="text-2xl mt-4"
          style={headerStyle}
        >
          HandyHome
        </h1>
        { user?.role === 'admin' && (
        <>
          <h2 className="text-xl">
            Signed in as
            {' '}
            { user.name }
          </h2>
          <div className="navbar-nav mx-auto">
            <ul>
              {adminLinks.map((link) => (
                <li key={link.path}>
                  <Link to={link.path} className="text-lg font-serif">{link.text}</Link>
                </li>
              ))}
              <button type="button" className="text-lg font-serif" onClick={handleLogout}>Logout</button>
            </ul>
          </div>
        </>
        )}
        { user?.role === 'user' && (
        <>
          <h2 className="text-xl">
            Signed in as
            {' '}
            { user.name }
          </h2>
          <div className="navbar-nav mx-auto">
            <ul>
              {userLinks.map((link) => (
                <li key={link.path}>
                  <Link to={link.path} className="text-lg font-serif">{link.text}</Link>
                </li>
              ))}
              <button type="button" className="text-lg font-serif" onClick={handleLogout}>Logout</button>
            </ul>
          </div>
        </>
        )}
      </div>
      <FooterToolbar />
    </nav>
  );
};

export default Navbar;

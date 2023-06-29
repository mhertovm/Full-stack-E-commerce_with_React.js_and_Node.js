
import { Link } from 'react-router-dom';
import ShCartH from './ShCartH/ShCartH';
import SearchH from './SearchH';
import MenuH from './MenuH';
import User from '../../user/User';


const HeaderApp: React.FC = () => {
  const token = localStorage.getItem("token");
  
  return (
    <>
    <Link to={'/'}>
      <img className='Header-logo' src={`http://localhost:3001/images/logo.png`} alt='logo'/>
    </Link>
    <div className='Header-link-container'>
      <Link className='Header-link' to={"/"}>Contakt</Link>|
      <Link className='Header-link' to={"/"}>Help</Link>|
      {!token ?
      <>
      <Link className='Header-link' to={"/register"}>Register</Link>|
      <Link className='Header-link' to={"/login"}>Login </Link>
      </>
      : false
      }
    </div>
    <div className='Header-container'>
      <div className='Header-navbar'>
        <MenuH />
      </div>
      <div className='Header-function'>
        <SearchH />
        <ShCartH />
        {token ? <User /> : ""}
      </div>
    </div>
    </>
  );
}
  
export default HeaderApp;
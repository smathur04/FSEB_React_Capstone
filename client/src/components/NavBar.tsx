import logo from "../assets/logo.png";
import dude from "../assets/dude.png";

const NavBar = () => {
  return (
    <div className="brand-bar">
    <img style={{ height: "90px", width: "180px" }} src={logo} alt="Logo" />
    <img style={{ height: "40px", width: "50px" }} src={dude} alt="Logo" />
    </div>
  )
}

export default NavBar
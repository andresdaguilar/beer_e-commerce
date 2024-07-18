import MenuIcon from "./MenuIcon"
import User from "./User"
import "./styles.css";

const TopBar = () => {
  return (
    <div className="top-bar">
      <MenuIcon/>
      <User/>
    </div>
  )
}

export default TopBar;
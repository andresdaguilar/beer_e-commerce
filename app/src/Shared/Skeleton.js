
import TopBar from "./components/TopBar"
const Skeleton = ({children}) => {
  return (
    <div className="container">
      <TopBar/>
      <div className="greetings">
        Hi {process.env.REACT_APP_USERNAME}
      </div>
      <h1 className="App-greetings">Welcome Back!</h1>
      {children}
    </div>
  )
}

export default Skeleton
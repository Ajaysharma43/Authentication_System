import { useRoutes } from "react-router-dom"
import Signup from "../Signup/Signup"
import Login from "../Login/Login"
import SignupSuccess from "../Signup_Info/Signup_Info"

const Route = () => {
    const route = useRoutes([
        {element:<Signup/>,path:"/Signup"},
        {element:<Login/>,path:"/Login"},
        {element:<SignupSuccess/>,path:"/SignupSuccess"}
    ])
    return route
}

export default Route
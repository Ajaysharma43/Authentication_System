import { useRoutes } from "react-router-dom"
import Signup from "../Signup/Signup"
import Login from "../Login/Login"

const Route = () => {
    const route = useRoutes([
        {element:<Signup/>,path:"/Signup"},
        {element:<Login/>,path:"/Login"}
    ])
    return route
}

export default Route
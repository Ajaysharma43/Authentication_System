import { useRoutes } from "react-router-dom"
import Signup from "../Signup/Signup"
import Login from "../Login/Login"
import SignupSuccess from "../Signup_Info/Signup_Info"
import AdminUsersPage from "../AdminPannel/AdminPannel"

const Route = () => {
    const route = useRoutes([
        {element:<Signup/>,path:"/Signup"},
        {element:<Login/>,path:"/Login"},
        {element:<SignupSuccess/>,path:"/SignupSuccess"},
        {element:<AdminUsersPage/>,path:"/AdminUsersPage"}
    ])
    return route
}

export default Route
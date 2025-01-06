import { useRoutes } from "react-router-dom"
import Signup from "../Signup/Signup"
import Login from "../Login/Login"
import SignupSuccess from "../Signup_Info/Signup_Info"
import AdminUsersPage from "../AdminPannel/AdminPannel"
import Admin_Page from "../../Pages/Admin_Page/Admin_Page"
import SidebarLayout from "../Siderbar/Sidebar"

const Route = () => {
    const route = useRoutes([
        {element:<Signup/>,path:"/Signup"},
        {element:<Login/>,path:"/Login"},
        {element:<SignupSuccess/>,path:"/SignupSuccess"},
        {element:<Admin_Page/>,path:"/AdminUsersPage"},
        {element:<SidebarLayout/>,path:'/Sidebar'}
    ])
    return route
}

export default Route
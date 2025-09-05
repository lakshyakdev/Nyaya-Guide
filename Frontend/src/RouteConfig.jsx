import { Route , Routes } from "react-router-dom";
import Homepage from "./pages/Homepage/Homepage.jsx"
import Loginpage from "./pages/Loginpage/Loginpage.jsx"
import SignupPage from "./pages/Signup/Signuppage.jsx"
import NotFound from "./pages/Notfound.jsx";
import { PreventAuthAccess } from "./components/authguard.jsx";


export default function AppRoutes(){
    return(
        <Routes>
            <Route path="/" element={<Homepage/>} />
            <Route path="/login" element={
                <PreventAuthAccess >
                    <Loginpage />
                </PreventAuthAccess>} />
            <Route path="/signup" element={
                <PreventAuthAccess >
                    <SignupPage />
                </PreventAuthAccess> } />
            <Route path="*" element={<NotFound />}/>
        </Routes>
    )
}

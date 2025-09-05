import { Link, useNavigate } from "react-router-dom"
import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../../redux/slices/authSlice";
import toast from "react-hot-toast";
import "./LoginPage.css"
import Navbar from "../../components/Navbar/Navbar";

export default function LoginPage() {
    const [focusedInput, setFocusedInput] = useState(null);

    let [inputData, setinputData] = useState({
        email: "",
        password: "",
    });
    
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    function onInput(event) {
        let { name, value } = event.target;
        setinputData({ ...inputData, [name]: value });
    }

    async function loginAccount(e) {
        e.preventDefault();
        
        if (!inputData.email || !inputData.password) {
            return toast.error("All fields are required");
        }
        const loadingToast = toast.loading("Authenticating user, please wait...");
        try {
            const response = await dispatch(login(inputData));
            toast.dismiss(loadingToast);
            if (response.type === '/auth/login/fulfilled' && response.payload?.success) {
                    toast.success(response.payload?.message || "Successfully logged in");
                    setinputData({
                        email: "",
                        password: "",
                    });
                    navigate("/");
            }
            else if (response.type === '/auth/login/rejected') {
                toast.error(response.payload || "Login failed");
            } else {
                toast.error("Login failed - unexpected response");
            }
        } catch (e) {
            toast.dismiss(loadingToast);
            toast.error("An unexpected error occurred");
        }
    }

    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />
        <div className="flex-1 flex items-center justify-center">
            <div className="hero-content flex-col lg:flex-row-reverse bg-base-200">
                <div className="text-center lg:text-left">
                    <h1 className="text-5xl font-bold text-base-content">Login now!</h1>
                    <p className="py-6 text-base-content/70">
                        Welcome back to Nyaya Guide — your AI-powered legal companion. Sign in to unlock advanced tools to analyze legal documents, uncover vulnerabilities, and get instant answers from our GenAI legal assistant. Your path to smarter legal insights starts here.
                    </p>
                </div>
                <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                    <div className="card-body">
                        <form onSubmit={(e) => loginAccount(e)}>
                            <fieldset className="space-y-4">
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text text-xl font-bold text-base-content">Email</span>
                                    </label>
                                    <input 
                                        name="email" 
                                        value={inputData.email} 
                                        onChange={onInput} 
                                        type="email" 
                                        autoComplete="off" 
                                        className={`input input-bordered bg-base-200 w-full resize-none rounded-2xl py-3 pl-4 pr-12 text-base text-base-content focus:outline-none transition-shadow ${focusedInput === 'email' ? 'border-2 border-primary' : 'border-2 border-base-400'}`}
                                        placeholder="Email" 
                                        onFocus={() => setFocusedInput('email')}
                                        onBlur={() => setFocusedInput(null)}
                                        required
                                    />
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text text-xl font-bold text-base-content">Password</span>
                                    </label>
                                    <input 
                                        type="password" 
                                        name="password" 
                                        className={`input input-bordered bg-base-200 w-full resize-none rounded-2xl py-3 pl-4 pr-12 text-base text-base-content focus:outline-none transition-shadow ${focusedInput === 'password' ? 'border-2 border-primary' : 'border-2 border-base-400'}`}
                                        placeholder="Password" 
                                        value={inputData.password} 
                                        onChange={onInput}
                                        required 
                                        onFocus={() => setFocusedInput('password')}
                                        onBlur={() => setFocusedInput(null)}
                                    />
                                </div>
                                <div>
                                    <Link className="link link-hover text-base font-bold text-primary">
                                        Forgot password?
                                    </Link>
                                </div>
                                <div>
                                    <span className="font-bold text-base text-base-content">New to Nyaya Guide? </span>
                                    <Link to="/signup" className="link link-hover text-base text-primary font-bold">
                                        Signup
                                    </Link>
                                </div>
                                <button type="submit" className="btn btn-primary w-full mt-4">
                                    Login
                                </button>
                            </fieldset>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        </div>
    );
}
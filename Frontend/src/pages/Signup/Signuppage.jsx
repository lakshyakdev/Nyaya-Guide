import "./Signuppage.css"
import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { createAccount } from "../../redux/slices/authSlice";
import Navbar from "../../components/Navbar/Navbar";

export default function SignupPage(){
    // Add focused input state
    const [focusedInput, setFocusedInput] = useState(null);
    
    let [inputData, setinputData] = useState({
        name : "",
        email : "",
        password : "",
    })
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    function onInput(event) {
        let {name , value} = event.target;
        setinputData({...inputData, [name] : value});
    }

    async function createAccountFn(e){
        e.preventDefault();
        if(!inputData.email || !inputData.password || !inputData.name){
            return toast.error("All fields are required");
        }
        if(!inputData.email.match(/^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/)){
            return toast.error("please enter valid email");
        }
        if(!inputData.password.match(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=])(?=\S+$).{8,20}$/)){
            return toast.error("Password must be 8 characters long must conatin \n password contains at least one lowercase letter\n password contains at least one uppercase letter. \n  password contains at least one special character\n password does not contain any whitespace characters");
        }
        if(inputData.name.length<5){
            return toast.error("Username must be 5 characters long");
        }
        let fileData = new FormData();
        fileData.append("username" , inputData.name);
        fileData.append("email" , inputData.email);
        fileData.append("password" , inputData.password);
        const loadingToast = toast.loading("Authenticating user, please wait...");
        try{
            const response = await dispatch(createAccount(fileData));
            toast.dismiss(loadingToast);
            if(response.type === '/auth/login/fulfilled' && response.payload.success){
                navigate("/");
                toast.success("Successfully regsitered");
                setinputData({
                name : "",
                email : "",
                password : "",
                })
            }
            else if (response.type === '/auth/login/rejected') {
                toast.error(response.payload || "Registration failed");
            }
            else {
                toast.error("Registration failed - unexpected response");
            }
        }
        catch(e){
            toast.dismiss(loadingToast);
            toast.error("An unexpected error occurred");
        }
    }  

    return(
        <div className="min-h-screen flex flex-col bg-base-200">
            <Navbar />
            <div className="flex-1 flex items-center justify-center">
                <form onSubmit={(e)=>createAccountFn(e)}>
                    <div className="hero-content flex-col lg:flex-row-reverse">
                        <div className="text-center lg:text-left">
                            <h1 className="text-5xl font-bold text-base-content">Welcome to Nyaya Guide!</h1>
                            <p className="py-6 text-base-content/70">
                                Join Nyaya Guide today and experience the future of legal analysis. Create your account to access powerful GenAI-driven tools that simplify complex legal documents, highlight risks, and answer your toughest legal questions — all in a chat interface you already know and love.
                            </p>
                        </div>
                        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                            <div className="card-body">
                                <fieldset className="space-y-4">
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text text-xl font-bold text-base-content">Name</span>
                                        </label>
                                        <input 
                                            type="text" 
                                            name="name" 
                                            className={`input input-bordered bg-base-200 w-full resize-none rounded-2xl py-3 pl-4 pr-12 text-base text-base-content focus:outline-none transition-shadow ${focusedInput === 'name' ? 'border-2 border-primary' : 'border-2 border-base-400'}`}
                                            placeholder="Username" 
                                            value={inputData.name} 
                                            onChange={(e)=>onInput(e)}
                                            onFocus={() => setFocusedInput('name')}
                                            onBlur={() => setFocusedInput(null)}
                                            required 
                                        />
                                    </div>
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text text-xl font-bold text-base-content">Email</span>
                                        </label>
                                        <input 
                                            type="email" 
                                            name="email" 
                                            className={`input input-bordered bg-base-200 w-full resize-none rounded-2xl py-3 pl-4 pr-12 text-base text-base-content focus:outline-none transition-shadow ${focusedInput === 'email' ? 'border-2 border-primary' : 'border-2 border-base-400'}`}
                                            placeholder="Email" 
                                            value={inputData.email} 
                                            onChange={(e)=>onInput(e)} 
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
                                            onChange={(e)=>onInput(e)} 
                                            onFocus={() => setFocusedInput('password')}
                                            onBlur={() => setFocusedInput(null)}
                                            required
                                        />
                                    </div>
                                    <div>
                                        <span className="font-bold text-base text-base-content">Already a user? </span>
                                        <Link to="/login" className="link link-hover text-base text-primary font-bold">Login</Link>
                                    </div>
                                    <button type="submit" className="btn btn-primary w-full mt-4">SignUp</button>
                                </fieldset>
                            </div>
                        </div>
                    </div>
                </form>    
            </div>
        </div>
    )
}
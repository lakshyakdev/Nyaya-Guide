import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Navbar(){
    const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "cupcake");

    useEffect(() => {
        document.documentElement.setAttribute("data-theme", theme);
        localStorage.setItem("theme", theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme((prev) => (prev === "cupcake" ? "dark" : "cupcake"));
    };

    return(
        <div className="navbar bg-base-100 shadow-sm w-full">
            <div className="flex-1">
                <Link to="/" className="btn btn-ghost text-2xl">Nyaya Guide</Link>
            </div>
            <div className="flex-none">
                <div className="flex items-center gap-2">
                    <Link to="/login" className="btn authButtons">Login</Link>
                    <Link to="/signup" className="btn authButtons">Signup</Link>
                    <button
                        onClick={toggleTheme}
                        className="flex h-12 w-12 items-center justify-center rounded-full p-2 text-base-content/60 hover:bg-base-200 transition-colors"
                        aria-label="Toggle theme"
                    >
                        {theme === "cupcake" ? <Moon size={20} /> : <Sun size={20} />}
                    </button>
                </div>
            </div>
        </div>
    );
}
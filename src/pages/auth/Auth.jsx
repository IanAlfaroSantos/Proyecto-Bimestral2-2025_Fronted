import { useState, useEffect } from "react";
import { Login } from "../../components/users/Login";
import { Register } from "../../components/users/Register";
import "./auth.css"

export const Auth = () => {

    const [isLogin, setIsLogin] = useState(true);

    const handleAuthPageToggle = () => {
        setIsLogin((prev) => !prev);
    }
    useEffect(() => {
    // Limpiar cualquier estado residual al cargar la página de auth
    const user = localStorage.getItem('user');
    if (user) {
        localStorage.removeItem('user');
    }
}, []);

    return (
        <div className="auth-container">
            {isLogin ? (
                <Login switchAuthHandler={handleAuthPageToggle} />
            ) : (
                <Register switchAuthHandler={handleAuthPageToggle} />
            )}
        </div>
    )
}
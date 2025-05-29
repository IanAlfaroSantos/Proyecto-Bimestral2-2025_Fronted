import { useState, useEffect } from "react";
import { Login } from "../../components/users/Login";
import { Register } from "../../components/users/Register";


export const Auth = () => {

    const [isLogin, setIsLogin] = useState(true);

    const handleAuthPageToggle = () => {
        setIsLogin((prev) => !prev);
    }
    useEffect(() => {
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
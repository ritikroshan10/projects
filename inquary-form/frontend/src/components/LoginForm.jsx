function LoginForm({ loginData, handleLoginChange, handleLogin, setIsLoginPage }) {
    return (
        <>
            <h2>Login</h2>
            <form onSubmit={handleLogin} className="form">
                <input type="email" name="email" placeholder="Email" value={loginData.email} onChange={handleLoginChange} />
                <input type="password" name="password" placeholder="Password" value={loginData.password} onChange={handleLoginChange} />
                <button type="submit" className="submit-btn">Login</button>
                <button type="button" onClick={() => setIsLoginPage(false)} className="login-btn">Go to Registration</button>
            </form>
        </>
    );
}

export default LoginForm;

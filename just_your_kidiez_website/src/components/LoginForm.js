import React, { useState } from 'react'
import './LoginForm.css';
import SignUpAPI from '../apis/SignUpAPI';

const LoginForm = (props) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [saveParent, setSaveParent] = useState({})

    const handleSubmit = async (event) => {
        event.preventDefault();
       await props.onLogin(username, password)
    }

    function handleSave() {
        SignUpAPI.createParent(saveParent)
            .then(function (response) {
                console.log(response);
                window.location.reload();
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    return (
        <div className='everything'>
            <div className='login_form'>
                <div className='body-login-form'>
                    <div className="container">
                        <input type="checkbox" id="check"></input>
                        <div className="login form">
                            <header>Login</header>
                            <form onSubmit={handleSubmit}>
                                <input type="email" placeholder="Email" value={username} onChange={(e) => setUsername(e.target.value)} ></input>
                                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}></input>
                                <a>Forgot password?</a>
                                <input type="submit" className="button" value="LOGIN"></input>
                            </form>
                            <div className="signup">
                                <span className="signup">Don't have an account?
                                    <label htmlFor="check">Signup</label>
                                </span>
                            </div>
                        </div>
                        <div className="registration form">
                            <header>Sign Up</header>
                            <form>
                                <p>Your username is your name@justyourkidiez.nl</p>
                                <input type="text" placeholder="Enter your name" onChange={(e) => { setSaveParent({ ...saveParent, name: e.target.value }) }}></input>
                                <input type="text" placeholder="Enter your last name" onChange={(e) => { setSaveParent({ ...saveParent, last_name: e.target.value }) }}></input>
                                <input type="text" placeholder="Enter your age" onChange={(e) => { setSaveParent({ ...saveParent, age: e.target.value }) }}></input>
                                <input type="text" placeholder="Enter your phone number" onChange={(e) => { setSaveParent({ ...saveParent, phone_number: e.target.value }) }}></input>
                                <input type="email" placeholder="Enter your email address" onChange={(e) => { setSaveParent({ ...saveParent, email_address: e.target.value }) }}></input>
                                <input type="text" placeholder="Enter your country" onChange={(e) => { setSaveParent({ ...saveParent, country: e.target.value }) }}></input>
                                <input type="password" placeholder="Create a password" onChange={(e) => { setSaveParent({ ...saveParent, password: e.target.value }) }}></input>
                                <input type="button" className="button" value="SIGN UP" onClick={handleSave} ></input>
                            </form>
                            <div className="signup">
                                <span className="signup">Already have an account?
                                    <label htmlFor="check">Login</label>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default LoginForm;
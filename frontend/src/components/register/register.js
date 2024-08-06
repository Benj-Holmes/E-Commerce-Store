import React from 'react';
import './register.css';
import { useDispatch, useSelector } from 'react-redux';
import {
    registerFnameSelector,
    registerLnameSelector,
    registerEmailSelector,
    registerPwordSelector,
    registerConfirmPwordSelector,
    updateRegisterFname, 
    updateRegisterLname,
    updateRegisterEmail,
    updateRegisterPword,
    updateRegisterConfirmPword,
    registerUser, 
    registerMsgSelector
} from '../../slices/authSlice';
import { changeMenu } from '../../slices/accountPageSlice';




const Register = (props) => {
    const dispatch = useDispatch();

    const fName = useSelector(registerFnameSelector);
    const lName = useSelector(registerLnameSelector);
    const email = useSelector(registerEmailSelector);
    const pword = useSelector(registerPwordSelector);
    const confirmPword = useSelector(registerConfirmPwordSelector);
    const registerMsg = useSelector(registerMsgSelector);

    const handleRegister = () => {
        const data = {
            fname: fName,
            lname: lName,
            email: email,
            password: pword
        }
        if (pword === confirmPword) {
            dispatch(registerUser(data));
        } else {
            alert('Passwords do not Match, please try Again!')
        }
        
    }

    

    return (
            <div className='logInContainer'>
                <div className="logInCard">
                    <h1 className='regTitle'> Register a New Account </h1>
                    
                        <input onChange={(e) => dispatch(updateRegisterFname(e.target.value))} 
                        id="firstname" value={fName} placeholder='First Name'></input>
                        <input onChange={(e) => dispatch(updateRegisterLname(e.target.value))} 
                        id="lastname" value={lName} placeholder='Last Name'></input>
                        <input onChange={(e) => dispatch(updateRegisterEmail(e.target.value))} 
                        id="emailaddress" value={email} placeholder='Email Address'></input>
                        <input onChange={(e) => dispatch(updateRegisterPword(e.target.value))} 
                        id="password" value={pword} placeholder="Password" type='password'></input>
                        <input onChange={(e) => dispatch(updateRegisterConfirmPword(e.target.value))} 
                        id="confirmpassword" value={confirmPword} placeholder="Confirm Password" type='password'></input>
                        {/* { confirmPword.length > 0 && checkMatch === false ? <div> <p> <span> X </span> Passwords Must Match </p> <button disabled> Register</button> </div> : <button type="submit" > Register </button> } */}
                       
                        <button onClick={handleRegister} className='submitBtn' > Register </button>

                        { registerMsg === 'Successfully Registered, You can now Log In' ? 
                        <p> Your Registration was Successful, you can Now Log In. </p>    
                        :
                        ''}
                    <h3 onClick={() => dispatch(changeMenu('Log In'))}> Already Registered? Log In Here </h3>
                </div>
            </div>
    );
}

export default Register;
import React, { useContext, useState } from 'react';
import { signInWithPopup, GoogleAuthProvider, signOut, createUserWithEmailAndPassword, updateProfile, FacebookAuthProvider } from "firebase/auth";
import {authentication} from './firebase.config'
import { UserContext } from '../../App';
import { useNavigate } from 'react-router';


function LogIn() {
  const [user, setUser] = useState({
    isSignIn: false,
    name:'',
    email:'',
    password:'',
    photo:'',
    error:'',
    success: false
  })
  
  const googleSignIn =  () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(authentication, provider)
    .then((res) =>{
      const {displayName, photoURL, email} = res.user;
      const signInUser = {
        isSignIn: true,
        name: displayName,
        email: email,
        photo: photoURL
      }
      setUser(signInUser);
      console.log(displayName, photoURL, email);
    })
  }

 
  const fbSignIn = () =>{
    const Fbprovider = new FacebookAuthProvider();
    signInWithPopup(authentication, Fbprovider)
    .then((result) => {
    // The signed-in user info.
    const user = result.user;

    // This gives you a Facebook Access Token. You can use it to access the Facebook API.
    const credential = FacebookAuthProvider.credentialFromResult(result);
    const accessToken = credential.accessToken;

    console.log('Signed in', user);


    // ...
  })
  .catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.email;
    // The AuthCredential type that was used.
    const credential = FacebookAuthProvider.credentialFromError(error);

    // ...
  });
  }
  const googleSignOut = () =>{
    signOut(authentication)
    .then((res) => {
      const signOutUser = {
        isSignIn: false,
        name:'',
        email:'',
        photo:'',
        error: '',
        success: false
      }
      setUser(signOutUser);
    });
  }

  const handleChange = (eve) =>{
   let isFormValid = true;
    if(eve.target.name === 'email:'){
     isFormValid = /\S+@\S+\.\S+/.test(eve.target.value);
      
      
      
    }
    if(eve.target.name === 'password:'){
      const isPassValid = eve.target.value.length > 6;
      isFormValid = isPassValid;
      
    }
    if(isFormValid){
      const newUserInfo = {...user};
      newUserInfo[eve.target.name] = eve.target.value;
      setUser(newUserInfo);
    } 
  }
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  const handleClick = (eve) =>{
    if(user.email && user.password){
      createUserWithEmailAndPassword(authentication, user.email, user.password)
  .then((res) => {
    const newUserInfo = {...user};
    newUserInfo.error = '';
    newUserInfo.success = true;
    // const user = userCredential.user;
    setUser(newUserInfo);
    updateUserName(user.name);
    setLoggedInUser(newUserInfo);
    console.log(res.user)
   
  })
  .catch((error) => {
    const newUserInfo = {...user};
    newUserInfo.error = 'This email is already registered!!!';
    newUserInfo.success = false;
   setUser(newUserInfo);
  });

    }
    eve.preventDefault();
  }
  const updateUserName = name =>{
    updateProfile(authentication.currentUser, {
      displayName: name,
    }).then(() => {
      console.log('Updated')
    }).catch((error) => {
     console.log(error);
});
  }
  return (
  
    <div style={{textAlign:'center'}}>
   {  
     user.isSignIn ? <button style={{padding:'10px 18px' }}  onClick={googleSignOut}>SIGN OUT</button> :
     <button style={{padding:'10px 18px' }}  onClick={googleSignIn}>SIGN IN</button>
   }
    <br />
   <button onClick={fbSignIn}>Facebook Signing</button>
     {
       user.isSignIn && <div>
        <p>
        Welcome {user.name}
       </p>
       <p>Email- {user.email}</p>
       <img src={user.photo} alt="" />
       </div>
     } <br />
     <form className='form'>
       <input className="input" type="text" placeholder="Name" name="name" onBlur={handleChange} required/> <br />
         <input className="input" type="email" placeholder="Email" name="email" onBlur={handleChange} required/> <br/>
         <input className="input" type="password" placeholder="Password" name="password" onBlur={handleChange} required/><br/>
         <input onClick={handleClick} className="submit" type="submit" value="submit"/>
       </form>
       <p style={{color:'red'}}>{user.error}</p>
       {
         user.success &&  <p style={{color:'green'}}>Account created successfully!</p>
       }
    </div>
  );
}

export default LogIn;

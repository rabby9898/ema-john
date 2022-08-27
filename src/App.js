import React, { useState } from 'react';
import './App.css';
import Header from './Components/Header/Header';
import Shop from './Components/Shop/Shop';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Review from './Components/Review/Review';
import NotFound from './Components/notFound/NotFound';
import ProductCode from './Components/Pro code/ProductCode.js/ProductCode';
import SignUp from './Components/sign up/SignUp';
import { createContext } from 'react';
import LogIn from './Components/Login/LogIn';
import Shipment from './Components/Shipment/Shipment';
import PrivateRoute from './Components/PrivateRoute/PrivateRoute';





export const UserContext = createContext();

function App() {
  const [loggedInUser, setLoggedInUser] = useState({}); 
  return (
    <UserContext.Provider value={[loggedInUser, setLoggedInUser]}>
      <Router>
        <Header></Header>
        <Routes>
        <Route path="/" caseSensitive={false} element={<Shop></Shop>} />
         <Route path="/shop" caseSensitive={false} element={<Shop></Shop>}/>
         <Route path="/review" caseSensitive={false} element={<Review></Review>}/>
         <Route path="/manage" caseSensitive={false} element={<Review></Review>}/>
         <Route path="/SignUp" caseSensitive={false} element={<SignUp></SignUp>}/>
         <Route path="/LogIn" caseSensitive={false} element={<LogIn></LogIn>}/>
         <Route path="/shipment" element={
        <PrivateRoute>
        <Shipment/>
        </PrivateRoute>}
        />
         <Route path="/product/:productKey" caseSensitive={false} element={<ProductCode></ProductCode>}/>
         <Route path="*" caseSensitive={false} element={<NotFound></NotFound>}/>
        </Routes>
      </Router>
    </UserContext.Provider>
  );
}

export default App;

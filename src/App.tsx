import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginScreen from './screens/authentication/LoginScreen';
import SignupScreen from './screens/authentication/SignupScreen';
import ProfileScreen from './screens/profile/ProfileScreen';
import Layout from './components/Layout';
import './App.css';
import TestScreen from './screens/questionsnaire/TestScreen';
import { AuthProvider } from './services/AuthContext';
import Header from './components/Header';

const App: React.FC = () => {
    return (
        <AuthProvider>
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" element={<LoginScreen />}/>
            <Route index path="/login" element={<LoginScreen />} />
            <Route path="/signup" element={<SignupScreen />} />
            <Route path="/profile" element={<ProfileScreen />}/>
            <Route path="/doTest" element={<TestScreen />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    )
    // return (
    //     <BrowserRouter>
    //         <Routes>
    //             <Route path="/" element={<Layout />}>
    //                 <Route index element={<LoginScreen />}></Route>
    //                 <Route path="/signup" element={<SignupScreen />} ></Route>
    //                 <Route path="/doTest" element={<TestScreen />}></Route>
    //                 <Route path="/profile" element={<ProfileScreen />}></Route>
    //             </Route>
    //         </Routes>
    //     </BrowserRouter>
    // );
};

export default App;

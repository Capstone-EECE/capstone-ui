import SignIn from "./components/SignIn"; 
import Entry from "./components/Entry"; 
import { useState } from 'react';


const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Callback function to set login status
  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  return (
    <div>
      {isLoggedIn ? (
        <Entry /> 
      ) : (
        <SignIn onLogin={handleLogin} /> 
      )}
    </div>
  );
};

export default App;

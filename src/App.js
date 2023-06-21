import styles from "./App.module.css";
import NavBar from "./components/navbar.js";
import Container from "react-bootstrap/Container";
import { Route, Switch } from "react-router-dom";
import "./api/axiosDefaults";
import SignUpForm from "./pages/auth/SignUpForm";
import SignInForm from "./pages/auth/SignInForm";
import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const CurrentUserContext = createContext();
export const SetCurrentUserContext = createContext();

function App() {
  const [currentUser, serCurrentUser] = useState(null);
  const handleMount = async () => {
    try {
      const { data } = await axios.get("dj-rest-auth/user/");
      serCurrentUser(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    handleMount();
  }, []);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <SetCurrentUserContext.Provider value={serCurrentUser}>
        <div className={styles.App}>
          <NavBar />
          <Container className={styles.Main}>
            <Switch>
              <Route exact path="/" render={() => <h1>Home page</h1>} />
              {/* <Route exact path="/signin" render={()=><h1>Sign in</h1>} /> */}
              <Route exact path="/signup" render={() => <SignUpForm />} />
              <Route exact path="/signin" render={() => <SignInForm />} />
              <Route render={() => <p>Page Not Found!</p>} />
            </Switch>
          </Container>
        </div>
      </SetCurrentUserContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App;

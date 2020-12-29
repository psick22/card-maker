import React from "react";
import Footer from "../footer/footer";
import Header from "../header/header";

const Login = ({ authService }) => {
  const onLogin = (provider) => {
    authService.login(provider).then(console.log(provider));
  };
  return (
    <section>
      <Header />
      <section>
        <h1>login</h1>
        <ul>
          <li>
            <button onClick={(e) => onLogin(e.currentTarget.textContent)}>
              Google
            </button>
          </li>
          <li>
            <button onClick={(e) => onLogin(e.currentTarget.textContent)}>
              Github
            </button>
          </li>
        </ul>
      </section>
      <Footer />
    </section>
  );
};

export default Login;

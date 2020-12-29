import React from 'react';
import Footer from '../footer/footer';
import Header from '../header/header';
import styles from './login.module.css';

const Login = ({ authService }) => {
  const onLogin = provider => {
    authService.login(provider).then(console.log(provider));
  };
  return (
    <section className={styles.login}>
      <Header />
      <section>
        <h1>login</h1>
        <ul className={styles.list}>
          <li className={styles.item}>
            <button
              className={styles.button}
              onClick={e => onLogin(e.currentTarget.textContent)}
            >
              Google
            </button>
          </li>
          <li className={styles.item}>
            <button
              className={styles.button}
              onClick={e => onLogin(e.currentTarget.textContent)}
            >
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

import React, { useContext, useState } from 'react';
import UserContext from '../Api-Context/contexts/UserContext';

function Login() {
  const { email, setEmail } = useContext(UserContext);
  const [newEmail, setNewEmail] = useState({
    email: '',
  });
  const [password, setPassword] = useState('');
  const [btnIsDisabled, setBtnIsDisabled] = useState(true);

  const enabledButton = () => {
    const emailP = document.getElementById('email');
    const passwordP = document.getElementById('password');
    const fullClass = 'fas fa-check';
    const failClass = 'fa-regular fa-circle-xmark';

    const emailRegex = /^[^@^ ]+@[^@^ ]+\.[a-z]{2,3}(\.[a-z]{2})?$/;
    const passwordRegex = /^[0-9]{6}/;

    if (emailRegex.test(email)) {
      emailP.className = fullClass;
    } else { emailP.className = failClass; }

    if (passwordRegex.test(password)) {
      passwordP.className = fullClass;
    } else { passwordP.className = failClass; }

    setBtnIsDisabled(!emailRegex.test(newEmail.email) || !passwordRegex.test(password));
  };

  const formSubmit = (event) => {
    event.preventDefault();
    setEmail((prev) => ({ ...prev, email: newEmail.email }));
  };

  const handleChange = ({ target: { name, value } }) => {
    if (name === 'email') {
      setNewEmail({ email: value });
    } else {
      setPassword(value);
    }
    enabledButton();
  };

  return (
    <div>
      <form
        onSubmit={ formSubmit }
        style={ { backgroundColor: '#598C58', color: 'greenyellow' } }
        className="formTitle"
      >
        <h1 className="myTitle fontTitle">
          App receitas
          {' '}
          {/* <img src={ wallet } alt="wallet" className="walletImg" /> */}
        </h1>
        <div className="field">
          <p className="control has-icons-left has-icons-right">
            <input
              id="email"
              type="email"
              name="email"
              value={ newEmail.email }
              placeholder="email"
              className="input is-primary is-small is-rounded"
              data-testid="email-input"
              onChange={ handleChange }
            />
            {/* <span className="icon is-small is-left">
              <i className="fas fa-envelope" />
            </span>
            <span className="icon is-small is-right">
              <i id="email" className="fa-regular fa-circle-xmark" />
            </span> */}
          </p>
        </div>
        <div className="field">
          <p className="control has-icons-left has-icons-right">
            <input
              id="password"
              type="password"
              name="password"
              value={ password }
              placeholder="senha"
              className="input is-primary is-small is-rounded"
              data-testid="password-input"
              onChange={ handleChange }
            />
            {/* <span className="icon is-small is-left">
              <i className="fas fa-lock" />
            </span>
            <span className="icon is-small is-right">
              <i id="password" className="fa-regular fa-circle-xmark" />
            </span> */}
          </p>
        </div>
        <p className="buttons">
          <button
            type="submit"
            disabled={ btnIsDisabled }
            className="btnLogin button is-dark is-responsive is-outlined btnShadow"
            data-testid="login-submit-btn"
          >
            {/* <span className="icon">
              <i className="fa-solid fa-wallet" />
            </span> */}
            <span>
              Entrar
            </span>
          </button>
        </p>
      </form>
    </div>
  );
}

export default Login;

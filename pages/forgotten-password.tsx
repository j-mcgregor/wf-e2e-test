import React from 'react';
import LoginContainer from '../components/containers/LoginContainer';
import Logo from '../components/elements/Logo';

const forgotPassword = () => {
  return (
    <LoginContainer>
      <form>
        <div>
          <Logo />
          <h1 className="text-3xl font-bold py-3">Forgotten Password</h1>
          <p>
            Enter the email you registered with to receive a password reset
            link.
          </p>
          <div>
            <label htmlFor="email" className="block text-sm font-medium py-2">
              Email address
            </label>
            <div className="mt-1">
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none block w-full px-3 py-2 rounded-md focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm text-black"
              />
            </div>
          </div>
        </div>
        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-yellow-500 hover:bg-yellow-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-400"
        >
          Sign in
        </button>
      </form>
    </LoginContainer>
  );
};

export default forgotPassword;

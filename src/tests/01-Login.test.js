import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

describe('Teste de cobertura do Login.js', () => {
  test('testa se o título está na pagina', () => {
    render(<App />);

    const linkElement = screen.getByText(/App receitas/i);
    expect(linkElement).toBeInTheDocument();
  });

  test('input tests', () => {
    render(<App />);

    const emailInput = screen.getByTestId('email-input');
    const passwordInput = screen.getByTestId('password-input');
    const btn = screen.getByTestId('login-submit-btn');

    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(btn).toBeInTheDocument();
  });

  test('typing tests', () => {
    render(<App />);

    const emailInput = screen.getByTestId('email-input');
    const passwordInput = screen.getByTestId('password-input');
    const btn = screen.getByTestId('login-submit-btn');

    userEvent.click(emailInput);
    userEvent.type(emailInput, 'xablau@xablau.com');

    userEvent.click(passwordInput);
    userEvent.type(passwordInput, '1234567');

    userEvent.click(btn);
  });
});

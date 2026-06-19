import { useState } from 'react';

export default function Login({ onLogin }) {
  const [email, setEmail] = useState('admin@provincialexpress.ph');
  const [password, setPassword] = useState('admin123');

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(email);
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <img src="/logo.png" alt="" className="login-logo" />
        <h1>TalaByahe</h1>
        <p className="subtitle">Admin Portal</p>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          <button type="submit" className="btn-primary">
            Sign in
          </button>
        </form>
      </div>
    </div>
  );
}

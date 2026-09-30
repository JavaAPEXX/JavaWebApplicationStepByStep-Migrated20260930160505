import React, { useState, FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';

interface LoginFormState {
  name: string;
  password: string;
}

const Login: React.FC = () => {
  const [formData, setFormData] = useState<LoginFormState>({
    name: '',
    password: ''
  });
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage(null);

    try {
      // Preserving original form submission format: application/x-www-form-urlencoded
      const params = new URLSearchParams();
      params.append('name', formData.name);
      params.append('password', formData.password);

      const response = await fetch('/login.do', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: params.toString(),
        credentials: 'include' // Preserve session/cookie behavior
      });

      if (!response.ok) {
        // Attempt to parse error message if available, otherwise use generic
        let errText = 'Login failed. Please try again.';
        try {
          const text = await response.text();
          if (text) errText = text;
        } catch {
          // Ignore parse errors
        }
        setErrorMessage(errText);
      } else {
        // Successful login - redirect to home or todos as per typical flow
        // Source doesn't specify redirect explicitly on success, but /list-todos.do is a primary link
        navigate('/list-todos'); 
      }
    } catch (error) {
      setErrorMessage('Network error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="modern-container" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Navbar */}
      <nav className="modern-navbar" style={{ 
        background: '#fff', 
        borderBottom: '1px solid #e0e0e0', 
        padding: '10px 20px', 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center' 
      }}>
        <Link to="/" className="modern-brand" style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#333', textDecoration: 'none' }}>
          Brand
        </Link>
        
        <div className="modern-nav-links" style={{ display: 'flex', gap: '20px' }}>
          <Link to="/" className="modern-nav-link active" style={{ color: '#007bff', textDecoration: 'none', fontWeight: 500 }}>
            Home
          </Link>
          <Link to="/list-todos" className="modern-nav-link" style={{ color: '#333', textDecoration: 'none' }}>
            Todos
          </Link>
          <a href="http://www.in28minutes.com" target="_blank" rel="noopener noreferrer" className="modern-nav-link" style={{ color: '#333', textDecoration: 'none' }}>
            In28Minutes
          </a>
        </div>

        <div className="modern-nav-right" style={{ display: 'flex', gap: '10px' }}>
          <Link to="/login" className="modern-nav-link" style={{ color: '#333', textDecoration: 'none' }}>
            Login
          </Link>
        </div>
      </nav>

      {/* Main Content */}
      <main style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '20px' }}>
        <div className="modern-card" style={{ 
          background: '#fff', 
          borderRadius: '8px', 
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)', 
          padding: '30px', 
          width: '100%', 
          maxWidth: '400px' 
        }}>
          <h2 style={{ marginTop: 0, marginBottom: '20px', textAlign: 'center', color: '#333' }}>Login</h2>

          {errorMessage && (
            <div className="alert-box" style={{ 
              background: '#f8d7da', 
              color: '#721c24', 
              padding: '10px 15px', 
              borderRadius: '4px', 
              marginBottom: '20px',
              border: '1px solid #f5c6cb'
            }}>
              {errorMessage}
            </div>
          )}

          <form onSubmit={handleSubmit} className="modern-form">
            <div className="form-group" style={{ marginBottom: '15px' }}>
              <label htmlFor="name" className="form-label" style={{ display: 'block', marginBottom: '5px', fontWeight: 500, color: '#555' }}>
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="form-control"
                value={formData.name}
                onChange={handleInputChange}
                style={{ 
                  width: '100%', 
                  padding: '10px', 
                  border: '1px solid #ccc', 
                  borderRadius: '4px',
                  fontSize: '1rem',
                  boxSizing: 'border-box'
                }}
                required
              />
            </div>

            <div className="form-group" style={{ marginBottom: '20px' }}>
              <label htmlFor="password" className="form-label" style={{ display: 'block', marginBottom: '5px', fontWeight: 500, color: '#555' }}>
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                className="form-control"
                value={formData.password}
                onChange={handleInputChange}
                style={{ 
                  width: '100%', 
                  padding: '10px', 
                  border: '1px solid #ccc', 
                  borderRadius: '4px',
                  fontSize: '1rem',
                  boxSizing: 'border-box'
                }}
                required
              />
            </div>

            <button 
              type="submit" 
              className="btn btn-primary"
              disabled={isLoading}
              style={{ 
                width: '100%', 
                padding: '10px', 
                background: '#007bff', 
                color: '#fff', 
                border: 'none', 
                borderRadius: '4px', 
                fontSize: '1rem', 
                cursor: 'pointer',
                opacity: isLoading ? 0.7 : 1
              }}
            >
              {isLoading ? 'Logging in...' : 'Login'}
            </button>
          </form>
        </div>
      </main>

      {/* Footer */}
      <footer className="modern-footer" style={{ 
        background: '#f5f5f5', 
        padding: '15px 0', 
        textAlign: 'center', 
        color: '#666',
        borderTop: '1px solid #e0e0e0'
      }}>
        footer content
      </footer>
    </div>
  );
};

export default Login;
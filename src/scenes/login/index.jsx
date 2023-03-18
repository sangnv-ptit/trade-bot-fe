import { useState } from "react";
import { getData } from "../../utils/data-utils";
import FormInput from "../../components/FormInput";

const defaultFormFields = {
  email: '',
  password: '',
}

const Login = ({ setToken }) => {
  const [formFields, setFormFields] = useState(defaultFormFields)
  const { email, password } = formFields

  const resetFormFields = () => {
    return (
      setFormFields(defaultFormFields)
    )
  }

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({...formFields, [name]: value})
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    try {
      const res = await getData(
        'http://localhost:8000/login', email, password
      )
      setToken(res);
      resetFormFields()
    } catch (error) {
      alert('User Sign In Failed');
    }
  };

  const reload = () => {
    setToken(null);
    resetFormFields();
  }

  return (
    <div className='App-header'>
        <div className="card">
          <h2>Sign In</h2>
          <form onSubmit={handleSubmit}>
            <FormInput
              label="Email"
              type="email"
              required
              name="email"
              value={email}
              onChange={handleChange}
            />
            <FormInput
              label="Password"
              type='password'
              required
              name='password'
              value={password}
              onChange={handleChange}
            />
            <div className="button-group">
              <button type="submit">Sign In</button>
              <span>
                <button type="button" onClick={reload}>Clear</button>
              </span>
            </div>
          </form>
        </div>
    </div>
  )
}

export default Login;

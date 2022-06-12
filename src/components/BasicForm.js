import { useState } from "react"
import useInput from "../hooks/use-input";

const BasicForm = (props) => {

  const[message, setMessage] = useState(null);

  const {
    value: enteredFirstName,
    isValid: enteredFirstNameIsValid,
    hasError: FirstnameInputHasError,
    valueChangeHandler: FirstnameChangeHandler,
    inputBlurHandler: FirstnameBlurHandler,
    reset: resetFirstName,
  } = useInput(v => v.trim() !== '')

  const {
    value: enteredLastName,
    isValid: enteredLastNameIsValid,
    hasError: LastnameInputHasError,
    valueChangeHandler: LastnameChangeHandler,
    inputBlurHandler: LastnameBlurHandler,
    reset: resetLastName,
  } = useInput(v => v.trim() !== '')

  const {
    value: enteredEmail,
    isValid: enteredEmailIsValid,
    hasError: EmailInputHasError,
    valueChangeHandler: EmailChangeHandler,
    inputBlurHandler: EmailBlurHandler,
    reset: resetEmail,
  } = useInput(v => v.includes('@'));

  const submitFormHandler = async (event) => {
    event.preventDefault();
    const ok = await JSON.stringify({
      fn: enteredFirstName,
      ln: enteredLastName,
      em: enteredEmail
    });
    const response = await fetch('http://localhost:8000/login', 
    {
      method: 'POST',
      body: ok,
      headers:{
        'Content-Type': 'application/JSON'
      }
    }
    )
    const d = await response.json();
    setMessage(<p>{d.message}</p>)
  }

  return (
    <form onSubmit={submitFormHandler}>
      {message && (message)}
      <div className='control-group'>
        <div className={ !FirstnameInputHasError ? 'form-control' : 'form-control invalid'}>
          <label htmlFor='name'>First Name</label>
          <input type='text' id='name' 
            onChange={FirstnameChangeHandler}
            onBlur={FirstnameBlurHandler}
            value={enteredFirstName}
          />
        </div>
        <div className={ !LastnameInputHasError ? 'form-control' : 'form-control invalid'}>
          <label htmlFor='name'>Last Name</label>
          <input type='text' id='name' 
            onChange={LastnameChangeHandler}
            onBlur={LastnameBlurHandler}
            value={enteredLastName}
          />
        </div>
      </div>
      <div className={ !EmailInputHasError ? 'form-control' : 'form-control invalid'}>
        <label htmlFor='name'>E-Mail Address</label>
        <input type='text' id='name' 
          onChange={EmailChangeHandler}
          onBlur={EmailBlurHandler}
          value={enteredEmail}
        />
      </div>
      <div className='form-actions'>
        <button type="submit">Submit</button>
      </div>
    </form>
  );
};

export default BasicForm;

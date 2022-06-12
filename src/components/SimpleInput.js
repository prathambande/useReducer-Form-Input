import useInput from "../hooks/use-input";

const SimpleInput = (props) => {

  const {
    value: enteredName,
    isValid: enteredNameIsValid,
    hasError: nameInputHasError,
    valueChangeHandler: nameChangeHandler,
    inputBlurHandler: nameBlurHandler
  } = useInput(v => v.trim() !== '')

  let smh = !nameInputHasError ? 'form-control' : 'form-control invalid';

  return (
    <form>
      <div className={smh}>
        <label htmlFor='name'>Your Name</label>
        <input type='text' id='name' 
          onChange={nameChangeHandler}
          onBlur={nameBlurHandler}
          value={enteredName}/>
      </div>
      <div className="form-actions">
        <button>Submit</button>
      </div>
    </form>
  );
};

export default SimpleInput;

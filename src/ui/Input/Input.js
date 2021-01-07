import React from "react";
import classes from "./Input.module.css";

const input = (props) => {
  let inputElement = null;
  const inputClasses = [classes.InputElement];
  if (props.invalid && props.shouldValidate && props.touched) {
    inputClasses.push(classes.Invalid);
  }

  switch (props.elementType) {
    case "input":
      inputElement = (
        <div>
          <input
            className={inputClasses.join(" ")}
            {...props.elementConfig}
            value={props.value}
            onChange={props.changed}
          />
          <p>{props.errorMessage}</p>
        </div>
      );
      break;
    case "textarea":
      inputElement = (
        <div>
          <textarea
            className={inputClasses.join(" ")}
            {...props.elementConfig}
            value={props.value}
            onChange={props.changed}
          />
          <p>{props.errorMessage}</p>
        </div>
      );
      break;
    case "select":
      inputElement = (
        <div>
          <select
            className={inputClasses.join(" ")}
            value={props.value}
            onChange={props.changed}
          >
            {props.elementConfig.options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.displayValue}
              </option>
            ))}
          </select>
          <p>{props.errorMessage}</p>
        </div>
      );
      break;
    case "file":
      inputElement = (
        <div>
          <input
            type="file"
            className={classes.FileInput}
            onChange={props.changed}
          ></input>
          <p>{props.errorMessage}</p>
        </div>
      );
      break;
    default:
      inputElement = (
        <input
          className={inputClasses.join(" ")}
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}
        />
      );
      break;
  }
  return (
    <div className={classes.Input}>
      <label className={classes.Label}>{props.label}</label>
      {inputElement}
    </div>
  );
};

export default input;

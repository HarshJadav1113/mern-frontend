import { useCallback, useReducer } from "react";

// Reducer function to manage form state
const formReducer = (state, action) => {
  switch (action.type) {
    case "INPUT_CHANGE":
      let formIsValid = true;
      // Check validity of all inputs based on current change
      for (const inputId in state.inputs) {
        if(!state.inputs[inputId]){
          continue;
        }
        if (inputId === action.inputId) {
          formIsValid = formIsValid && action.isValid; // Check the validity of the changed input
        } else {
          formIsValid = formIsValid && state.inputs[inputId].isValid; // Keep the validity of other inputs unchanged
        }
      }
      // Return the updated state
      return {
        ...state,
        inputs: {
          ...state.inputs,
          [action.inputId]: { value: action.value, isValid: action.isValid }, // Update the changed input value and validity
        },
        isValid: formIsValid, // Update form validity
      };
    case "SET_DATA":
      return {
        inputs: action.inputs,
        isValid: action.formIsValid,
      };
    default:
      return state;
  }
};

// Custom hook to handle form logic
export const useForm = (initialInputs, initialFormValidity) => {
  // Using useReducer to manage form state
  const [formState, dispatch] = useReducer(formReducer, {
    inputs: initialInputs,
    isValid: initialFormValidity,
  });

  // Function to handle changes in the form inputs
  const inputHandler = useCallback((id, value, isValid) => {
    dispatch({
      type: "INPUT_CHANGE",
      inputId: id,
      value: value,
      isValid: isValid,
    });
  }, []);

  // Function to set initial data or prefilled form data
  const setFormData = useCallback((inputs, formIsValid) => {
    dispatch({
      type: "SET_DATA",
      inputs: inputs,
      formIsValid: formIsValid,
    });
  }, []);

 
  return [formState, inputHandler, setFormData];
};

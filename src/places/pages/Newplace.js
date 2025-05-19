import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import Input from "../../shared/components/Formcomponent/Input";
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../shared/util/validators";
import Button from "../../shared/components/Formcomponent/Button";
import "./Placeform.css";
import { useForm } from "../../shared/hooks/form-hook";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { AuthContext } from "../../shared/context/auth-context";
import ErrorModal from "../../shared/components/UIComponents/ErrorModal";
import LoadingSpinner from "../../shared/components/UIComponents/LoadingSpinner";
import ImageUpload from "../../shared/components/Formcomponent/ImageUpload";

const Newplace = () => {
  const auth = useContext(AuthContext);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [formState, inputHandler] = useForm(
    {
      title: {
        value: "",
        isValid: false,
      },
      description: {
        value: "",
        isValid: false,
      },
      address: {
        value: "",
        isValid: false,
      },
      image: {
        value: null,
        isValid: false,
      },
    },
    false
  );
  const history = useHistory();
  const placeSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append("title", formState.inputs.title.value);
      formData.append("description", formState.inputs.description.value);
      formData.append("address", formState.inputs.address.value);
      formData.append("image", formState.inputs.image.value);
      await sendRequest(process.env.REACT_APP_BACKEND_URL+'/places', "POST", formData, {
        Authorization: "Bearer " + auth.token
      });
      history.push("/");
    } catch (err) {}
  };

  return (
    <>
      <ErrorModal error={error} onClear={clearError} />
      <form className="place-form" onSubmit={placeSubmitHandler}>
        {isLoading && <LoadingSpinner asOverlay />}
        <Input
          id="title"
          element="input"
          type="text"
          label="Title"
          validators={[VALIDATOR_REQUIRE()]}
          onInput={inputHandler}
          errorText="Please enter a valid title"
        />
        <Input
          id="address"
          element="input"
          type="input"
          label="Address"
          validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(5)]}
          onInput={inputHandler}
          errorText="Please enter a valid Address"
        />
        <ImageUpload
          id="image"
          onInput={inputHandler}
          errorText="Please provide an Image."
        />
        <Input
          id="description"
          element="textarea"
          type="textarea"
          label="Description"
          validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(5)]}
          onInput={inputHandler}
          errorText="Please enter a valid description (at least 5 character)"
        />
        <Button type="submit" disabled={!formState.isValid}>
          ADD PLACE
        </Button>
      </form>
    </>
  );
};

export default Newplace;

import { useState } from "react";

const useForm = (initialState) => {
  const [state, setState] = useState(() => {
    return initialState;
  });

  const onChange = (e) => {
    const { name, value } = e.target;
    setState((prev) => {
      return { ...prev, [name]: value };
    });
  };
  return { state, onChange };
};

export default useForm;

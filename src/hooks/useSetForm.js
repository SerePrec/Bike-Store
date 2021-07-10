import { useState } from "react";

export const useSetForm = initalForm => {
  const [form, setForm] = useState(initalForm);
  const handleChange = e => {
    const target = e.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    console.log(name, value);
    setForm({ ...form, [name]: value });
  };

  return {
    form,
    handleChange
  };
};

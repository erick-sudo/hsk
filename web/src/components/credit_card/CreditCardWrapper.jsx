import React from "react";
import { FormProvider, useForm, useFormContext } from "react-hook-form";

export function CreditCardWrapper() {
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("firstName", { required: true, maxLength: 20 })} />
      <input {...register("lastName", { pattern: /^[A-Za-z]+$/i })} />
      <input type="number" {...register("age", { min: 18, max: 99 })} />
      <input type="submit" />
    </form>
  );
}

function NestedInput() {
  const { register } = useFormContext(); // retrieve all hook methods
  console.log(register);
  return <input {...register("test")} />;
}

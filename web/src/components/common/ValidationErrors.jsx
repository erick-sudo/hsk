export function ValidationErrors({ errorsKey, errors }) {
  return (
    <>
      {typeof errors === "object" &&
        Array.isArray(errors[errorsKey]) &&
        errors[errorsKey].length > 0 &&
        errors[errorsKey].map((error, index) => (
          <div key={index} className="text-red-700 text-xs px-2 mt-1">
            {error}
          </div>
        ))}
    </>
  );
}

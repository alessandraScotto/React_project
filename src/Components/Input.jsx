export default function Input({ field, form: { touched, errors }, ...props }) {
  return (
    <>
      <div className="group relative z-0 w-full">
        <input
          type={props.type}
          {...field}
          {...props}
          className="peer block w-full  appearance-none border-0 border-b-2 border-gray-500 bg-transparent py-2.5 text-gray-900 focus:outline-none  focus:ring-0 dark:border-gray-400  dark:text-white"
          placeholder=""
        />

        <label className="absolute top-3  -z-10 origin-[0] -translate-y-6  text-gray-500  duration-300 peer-placeholder-shown:translate-y-0 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:font-medium  dark:text-gray-400">
          {props.label}
        </label>
      </div>
      {touched[field.name] && errors[field.name] && (
        <div className="font-main text-sm font-semibold text-[rgb(29,26,70)] dark:text-white">
          {errors[field.name]}
        </div>
      )}
    </>
  );
}
/* const CustomInputComponent = ({
    field, // { name, value, onChange, onBlur }
    form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
    ...props
  }) => (
    <div>
      <input type="text" {...field} {...props} />
      {touched[field.name] && errors[field.name] && (
        <div className="error">{errors[field.name]}</div>
      )}
    </div>
  );
   */

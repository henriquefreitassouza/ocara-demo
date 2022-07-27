const FormInput = ({ title, type, name, value, handler, ...params }) => {
  return (
    <div className="mb-2">
      <label className="inline-block mb-1">{title}</label>
      <input className="w-full border border-gray-200" type={type} name={name} onChange={handler} value={value || ""} pattern={params.pattern} />
      {params.validation}
    </div>
  )
}

export default FormInput;

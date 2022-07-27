const FormTextarea = ({ title, name, value, handler, ...params }) => {
  return (
    <div className="mb-2">
      <label className="inline-block mb-1">{title}</label>
      <textarea className="w-full h-32 border border-gray-200" name={name} onChange={handler} value={value}></textarea>
      {params.validation}
    </div>
  )
}

export default FormTextarea;

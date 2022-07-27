const FormFileUpload = ({ title, name, handler, ...params }) => {
  return (
    <div className="mb-2">
      <label className="inline-block mb-1">{title}</label>
      <input className="py-2 w-full" type="file" accept="image/*" name={name} onChange={(e) => handler(e)} />
      {params.preview}
      {params.validation}
    </div>
  )
}

export default FormFileUpload;

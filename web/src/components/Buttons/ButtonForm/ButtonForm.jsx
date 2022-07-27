const ButtonForm = ({ text, ...params }) => {
  return (
    <button type="submit" className={params.className} onClick={params.onClick}>{text}</button>
  )
}

export default ButtonForm;

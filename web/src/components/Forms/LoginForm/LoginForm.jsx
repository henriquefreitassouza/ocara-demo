import { useContext,
         useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "contexts";
import { ButtonFormPrimary,
         NavLink } from "components";
import { handleFetch,
         validateCredentials } from "utils";

const LoginForm = () => {
  const navigate = useNavigate();
  const auth = useContext(UserContext);

  const [input, setInput] = useState({
    email: "",
    password: ""
  });

  const [errors, setErrors] = useState({
    email: [],
    password: []
  });

  const handleInput = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value
    });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validate = validateCredentials(input.email, input.password);

    if (validate.status === "error") {
      setErrors(validate.fields);
      return;
    }

    setErrors({ email: [], password: [] });

    const account = await handleFetch(`${process.env.REACT_APP_API_ADDRESS}/account/validate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: input.email,
        password: input.password
      })
    });

    if (account.result !== "success") {
      setErrors({ email: [], password: [account.body] });
      return;
    }

    localStorage.setItem("account", account.body.account);
    localStorage.setItem("user", account.body.user);
    localStorage.setItem("email", input.email);
    localStorage.setItem("name", account.body.name);
    localStorage.setItem("token", account.body.accessToken);

    auth.setAuthenticated(true);
    
    return navigate("/perfil");
  }

  const EmailErrors = () => {
    return (
      <ul className="ml-3">
        {errors.email.map((error) => (
          <li key={error}><span className="text-sm my-1 text-orange-700 block">{error}</span></li>
        ))}
      </ul>
    );
  }

  const PasswordErrors = () => {
    return (
      <ul className="ml-3">
        {errors.password.map((error) => (
          <li key={error}><span className="text-sm my-1 text-orange-700 block">{error}</span></li>
        ))}
      </ul>
    );
  }

  return (
    <form className="p-4 bg-white lg:border lg:border-gray-200 lg:rounded-lg lg:shadow-2xl lg:p-8 lg:w-1/2 lg:mx-auto xl:w-1/3">
      <div className="mb-2">
        <input className="w-full border border-gray-200" type="email" id="email" name="email" placeholder="E-mail" value={input.email} onChange={(e) => handleInput(e)} />
        <EmailErrors />
      </div>

      <div className="mb-2">
        <input className="w-full border border-gray-200" type="password" id="password" name="password" placeholder="Senha" value={input.password} onChange={(e) => handleInput(e)} />
        <PasswordErrors />
      </div>

      <div className="mb-2">
        <ButtonFormPrimary
          text="Entrar"
          onClick={handleSubmit}
          className="w-full" />
      </div>
      <div>
        <p className="text-gray-700">Não possui conta? <NavLink className="underline" link="/" text="Criar nova conta" /></p>
      </div>
    </form>
  );
}

export default LoginForm;

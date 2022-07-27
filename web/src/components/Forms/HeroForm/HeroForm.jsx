import { useContext,
         useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "contexts";
import { ButtonFormPrimary,
         NavLink } from "components";
import { generateUserFromEmail,
         handleFetch,
         validateCredentials } from "utils";

const HeroForm = () => {
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

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: ""
    };

    options.body = JSON.stringify({
      email: input.email,
      password: input.password
    });

    const account = await handleFetch(`${process.env.REACT_APP_API_ADDRESS}/account`, options);

    if (account.result !== "success") {
      setErrors({ email: [], password: [account.body[0].msg] });
      return;
    }

    const userName = generateUserFromEmail(input.email);

    options.body = JSON.stringify({
      name: userName,
      account: account.body._id
    });

    const user = await handleFetch(`${process.env.REACT_APP_API_ADDRESS}/user`, options);

    if (user.result !== "success") {
      setErrors({ email: [], password: [user.body[0].msg] });
      return;
    }

    localStorage.setItem("account", account.body._id);
    localStorage.setItem("user", user.body._id);
    localStorage.setItem("email", input.email);
    localStorage.setItem("name", userName);

    auth.setAuthenticated(true);
    
    return navigate("/perfil/cadastro");
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
    <div className="lg:flex lg:items-center lg:justify-center lg:w-full lg:h-full lg:z-10 lg:absolute">
      <form className="p-4 bg-white lg:border lg:border-gray-200 lg:rounded-lg lg:shadow-2xl lg:p-8 lg:w-1/2 xl:w-1/3">
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
            text="Criar nova conta"
            onClick={handleSubmit}
            className="w-full" />
        </div>
        <div className="mb-2">
          <p className="text-sm text-gray-700">Ao criar uma conta, você concorda com os <NavLink className="underline" link="/termos-de-uso" text="Termos de Uso" /> e com as <NavLink className="underline" link="/politica-de-privacidade" text="Políticas de Privacidade" /> da Ocara.</p>
        </div>
        <div>
          <p className="text-gray-700">Já possui conta? <NavLink className="underline" link="/login" text="Faça login" /></p>
        </div>
      </form>
    </div>
  );
}

export default HeroForm;

const validateGenre = async (genre) => {
  const result = await fetch(`${process.env.REACT_APP_API_ADDRESS}/book/validate/genre`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      genre: genre
    })
  });
  const data = await result.json();

  if (data.body !== genre) return false;

  return true;
}

const validateNamespace = async (entity, namespace) => {
  const validEntities = ["book", "community", "event"];

  if (!validEntities.includes(entity)) return;

  const result = await fetch(`${process.env.REACT_APP_API_ADDRESS}/${entity}/validate`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      namespace: namespace
    })
  });
  const data = await result.json();

  if (data.body !== namespace) return false;

  return true;
}

const validateProfile = async (account) => {
  const result = await fetch(`${process.env.REACT_APP_API_ADDRESS}/user/account/${account}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  });
  const data = await result.json();

  if (data.status === "error") return null;

  return data.body;
}

const validateEmpty = (name, value, fieldName) => {
  const validate = {
    status: "error",
    fields: {
      [name]: [`Campo ${fieldName} em branco`]
    }
  }

  if (value !== "") {
    validate.status = "success";
    validate.fields[name] = []
  }

  return validate;
}

const validatePicture = (name, imageFile) => {
  const validate = {
    status: "error",
    fields: {
      [name]: ["Escolha uma imagem válida nos formatos jpg, png ou jpeg com até 5mb"]
    }
  }

  if (imageFile && imageFile.name.match(/\.(jpg|png|jpeg)$/) && imageFile.size <= 5242880) {
    validate.status = "success";
    validate.fields[name] = [];
  }

  return validate;
}

const validateCredentials = (email, password) => {
  const validate = {
    status: "error",
    fields: {
      email: [],
      password: []
    }
  };

  if (email === "") validate.fields.email.push("E-mail em branco");
  if (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email) === false) validate.fields.email.push("E-mail inválido");
  if (password === "") validate.fields.password.push("Senha em branco");
  if (password.length < 6) validate.fields.password.push("Senha possui menos do que 6 caracteres");

  if (validate.fields.email.length === 0 &&
      validate.fields.password.length === 0) validate.status = "success";

  return validate;
}

export {
  validateGenre,
  validateNamespace,
  validateEmpty,
  validateProfile,
  validatePicture,
  validateCredentials
}

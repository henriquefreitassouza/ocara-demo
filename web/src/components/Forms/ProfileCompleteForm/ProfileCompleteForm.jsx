import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthentication } from "hooks";
import { handleFetch,
         sanitizeS3Url,
         validateEmpty,
         validatePicture } from "utils";
import { ButtonPrimary,
         FormFileUpload,
         FormInput,
         FormTextarea,
         NavLink } from "components";

const ProfileCompleteForm = () => {
  const navigate = useNavigate();
  const credentials = useAuthentication();

  const [input, setInput] = useState({
    name: (credentials.name) ? credentials.name : "",
    surname: "",
    bio: ""
  });

  const [errors, setErrors] = useState({
    name: [],
    coverPicture: [],
    profilePicture: []
  });

  const [picture, setPicture] = useState({
    cover: { name: "", file: "", preview: ""},
    profile: { name: "", file: "", preview: ""}
  });

  const handleInput = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value
    });
  }

  const handlePicture = (e) => {
    setPicture({
      ...picture,
      [e.target.name]: {
        name: `${e.target.files[0].lastModified}-${e.target.files[0].name}`,
        file: e.target.files[0],
        preview: URL.createObjectURL(e.target.files[0])
      }
    });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validName = validateEmpty("name", input.name, "Nome");
    const validCoverPicture = validatePicture("cover", picture.cover.file);
    const validProfilePicture = validatePicture("profile", picture.profile.file);

    const validate = {
      status: (validName.status === "error" || validCoverPicture.status === "error" || validProfilePicture.status === "error")
              ? "error"
              : "success",
      fields: {
        name: validName.fields["name"],
        coverPicture: validCoverPicture.fields["cover"],
        profilePicture: validProfilePicture.fields["profile"]
      }
    }

    if (validate.status === "error") {
      setErrors(validate.fields);
      return;
    }

    setErrors({ name: [], coverPicture: [], profilePicture: [] });

    const s3CoverUrl = await handleFetch(`${process.env.REACT_APP_API_ADDRESS}/s3/sign`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        file_name: picture.cover.name,
        file_type: picture.cover.file.type
      })
    });

    const s3ProfileUrl = await handleFetch(`${process.env.REACT_APP_API_ADDRESS}/s3/sign`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        file_name: picture.profile.name,
        file_type: picture.profile.file.type
      })
    });

    if (s3CoverUrl.result === "success" && s3ProfileUrl.result === "success") {
      axios.put(s3CoverUrl.body.signedRequest, picture.cover.file, {
        headers: {
          "Content-Type": picture.cover.file.type
        }
      })
      .then((result) => {});

      axios.put(s3ProfileUrl.body.signedRequest, picture.profile.file, {
        headers: {
          "Content-Type": picture.profile.file.type
        }
      })
      .then((result) => {});

      try {
        const user = await handleFetch(`${process.env.REACT_APP_API_ADDRESS}/user/account/${credentials.account}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            name: input.name,
            surname: input.surname,
            picture: sanitizeS3Url(s3ProfileUrl.body.url),
            cover: sanitizeS3Url(s3CoverUrl.body.url),
            bio: input.bio
          })
        });

        if (user.result !== "success") throw new Error();

        localStorage.setItem("name", input.name);

        return navigate("/perfil");
      } catch (e) { window.alert("Não foi possível finalizar o cadastro."); }
    } else window.alert("Falha ao carregar as imagens");
  }

  const EmailReadOnly = () => {
    return (
      <p className="text-gray-500">{(credentials.email) ? credentials.email : ""}</p>
    );
  }

  const NameErrors = () => {
    if (!errors) return;

    return (
      <ul className="ml-3">
        {errors.name.map((error) => (
          <li key={error}><span className="text-sm my-1 text-orange-700 block">{error}</span></li>
        ))}
      </ul>
    );
  }

  const PictureProfilePreview = () => {
    return <div className="rounded-full w-48 h-48 bg-cover bg-gray-500" style={{ backgroundImage: `url(${picture.profile.preview})` }}></div>;
  }

  const PictureCoverPreview = () => {
    return <div className="w-full h-48 bg-cover bg-gray-500" style={{ backgroundImage: `url(${picture.cover.preview})` }}></div>;
  }

  const PictureProfileErrors = () => {
    if (!errors) return;

    return (
      <ul className="ml-3">
        {errors.profilePicture.map((error) => (
          <li key={error}><span className="text-sm my-1 text-orange-700 block">{error}</span></li>
        ))}
      </ul>
    );
  }

  const PictureCoverErrors = () => {
    if (!errors) return;

    return (
      <ul className="ml-3">
        {errors.coverPicture.map((error) => (
          <li key={error}><span className="text-sm my-1 text-orange-700 block">{error}</span></li>
        ))}
      </ul>
    )
  }

  return (
    <form className="p-4 bg-white lg:border lg:border-gray-200 lg:rounded-lg lg:shadow-2xl lg:p-8">
      <div className="mb-2">
        <label className="inline-block mb-1">E-mail:</label>
        <EmailReadOnly />
      </div>
      <FormInput
        title="Nome:"
        type="text"
        name="name"
        handler={(e) => handleInput(e)}
        value={input.name}
        validation=<NameErrors />
      />
      <FormInput title="Sobrenome:" type="text" name="surname" handler={(e) => handleInput(e)} value={input.surname} />
      <FormFileUpload
        title="Foto de perfil:"
        name="profile"
        handler={handlePicture}
        preview=<PictureProfilePreview />
        validation=<PictureProfileErrors />
      />
      <FormFileUpload
        title="Foto de capa:"
        name="cover"
        handler={handlePicture}
        preview=<PictureCoverPreview />
        validation=<PictureCoverErrors />
      />
      <FormTextarea title="Fale um pouco sobre você:" name="bio" handler={(e) => handleInput(e)} value={input.bio} />
      <ButtonPrimary type="submit" text="Finalizar cadastro" onClick={handleSubmit} className="mr-2" />
      <NavLink link="/perfil" text="Finalizar depois" />
    </form>
  );
}

export default ProfileCompleteForm;

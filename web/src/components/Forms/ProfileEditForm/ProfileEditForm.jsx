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
         FormTextarea,} from "components";

const ProfileEditForm = ({ user }) => {
  const credentials = useAuthentication();
  const navigate = useNavigate();

  const [input, setInput] = useState({
    name: user.name,
    surname: user.surname,
    bio: user.bio
  });

  const [errors, setErrors] = useState({
    name: [],
    coverPicture: [],
    profilePicture: []
  });

  const [picture, setPicture] = useState({
    cover: { name: "", file: "", preview: user.cover},
    profile: { name: "", file: "", preview: user.picture}
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
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validName = validateEmpty("name", input.name, "Nome");

    const validate = {
      status: (validName.status === "error")
              ? "error"
              : "success",
      fields: {
        name: validName.fields["name"]
      }
    }

    if (picture.cover.file) {
      const validCoverPicture = validatePicture("cover", picture.cover.file);

      validate.status = (validCoverPicture.status === "error") ? "error" : "success";
      validate.fields.coverPicture = validCoverPicture.fields["cover"];
    }

    if (picture.profile.file) {
      const validProfilePicture = validatePicture("profile", picture.profile.file);

      validate.status = (validProfilePicture.status === "error") ? "error" : "success";
      validate.fields.profilePicture = validProfilePicture.fields["profile"];
    }

    if (validate.status === "error") {
      setErrors(validate.fields);
      return;
    }

    setErrors({ name: [], coverPicture: [], profilePicture: [] });

    let s3CoverUrl, s3ProfileUrl = null;

    if (picture.cover.file) {
      s3CoverUrl = await handleFetch(`${process.env.REACT_APP_API_ADDRESS}/s3/sign`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          file_name: picture.cover.name,
          file_type: picture.cover.file.type
        })
      });

      axios.put(s3CoverUrl.body.signedRequest, picture.cover.file, {
        headers: {
          "Content-Type": picture.cover.file.type
        }
      })
      .then((result) => {});
    }

    if (picture.profile.file) {
      s3ProfileUrl = await handleFetch(`${process.env.REACT_APP_API_ADDRESS}/s3/sign`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          file_name: picture.profile.name,
          file_type: picture.profile.file.type
        })
      });

      axios.put(s3ProfileUrl.body.signedRequest, picture.profile.file, {
        headers: {
          "Content-Type": picture.profile.file.type
        }
      })
      .then((result) => {});
    }

      try {
        const userUpdate = await handleFetch(`${process.env.REACT_APP_API_ADDRESS}/user/account/${credentials.account}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            name: input.name,
            surname: input.surname,
            picture: (s3ProfileUrl) ? sanitizeS3Url(s3ProfileUrl.body.url) : user.picture,
            cover: (s3CoverUrl) ? sanitizeS3Url(s3CoverUrl.body.url) : user.cover,
            bio: input.bio
          })
        });

        if (userUpdate.result !== "success") throw new Error();

        localStorage.setItem("name", input.name);

        return navigate("/perfil");
      } catch (e) { window.alert("Não foi possível atualizar o perfil"); }
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
      <ButtonPrimary type="submit" text="Atualizar perfil" onClick={handleSubmit} className="mr-2" />
    </form>
  );
}

export default ProfileEditForm;

import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ButtonPrimary,
         FormFileUpload,
         FormInput,
         FormTextarea } from "components";
import { useAuthentication } from "hooks";
import { handleFetch,
         sanitizeS3Url,
         validateEmpty,
         validatePicture } from "utils";

const CommunityCreateForm = () => {
  const credentials = useAuthentication();
  const navigate = useNavigate();

  const [input, setInput] = useState({
    name: "",
    excerpt: "",
    description: ""
  });

  const [errors, setErrors] = useState({
    name: [],
    excerpt: [],
    description: [],
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
    const validExcerpt = validateEmpty("excerpt", input.excerpt, "Descrição curta");
    const validDescription = validateEmpty("description", input.description, "Descrição");
    const validCoverPicture = validatePicture("cover", picture.cover.file);
    const validProfilePicture = validatePicture("profile", picture.profile.file);

    const validate = {
      status: (validName.status === "error" ||
               validExcerpt.status === "error" ||
               validDescription.status === "error" ||
               validCoverPicture.status === "error" ||
               validProfilePicture.status === "error")
              ? "error"
              : "success",
      fields: {
        name: validName.fields["name"],
        excerpt: validExcerpt.fields["excerpt"],
        description: validDescription.fields["description"],
        coverPicture: validCoverPicture.fields["cover"],
        profilePicture: validProfilePicture.fields["profile"]
      }
    }

    if (validate.status === "error") {
      setErrors(validate.fields);
      return;
    }

    setErrors({ name: [], excerpt: [], description: [], coverPicture: [], profilePicture: [] });

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
        const community = await handleFetch(`${process.env.REACT_APP_API_ADDRESS}/community`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            name: input.name,
            excerpt: input.excerpt,
            description: input.description,
            picture: sanitizeS3Url(s3ProfileUrl.body.url),
            cover: sanitizeS3Url(s3CoverUrl.body.url),
            user: credentials.user
          })
        });

        if (community.result !== "success") throw new Error();

        window.alert("Comunidade cadastrada");

        return navigate("/perfil");
      } catch (e) { window.alert("Não foi possível finalizar o cadastro."); }
    } else window.alert("Falha ao carregar as imagens");
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

  const ExcerptErrors = () => {
    if (!errors) return;

    return (
      <ul className="ml-3">
        {errors.excerpt.map((error) => (
          <li key={error}><span className="text-sm my-1 text-orange-700 block">{error}</span></li>
        ))}
      </ul>
    );
  }

  const DescriptionErrors = () => {
    if (!errors) return;

    return (
      <ul className="ml-3">
        {errors.description.map((error) => (
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
      <FormInput
        title="Nome"
        type="text"
        name="name"
        handler={(e) => handleInput(e)}
        value={input.name}
        validation=<NameErrors />
      />
      <FormInput
        title="Descrição curta"
        type="text"
        name="excerpt"
        handler={(e) => handleInput(e)}
        value={input.excerpt}
        validation=<ExcerptErrors />
      />
      <FormTextarea
        title="Descrição"
        name="description"
        handler={(e) => handleInput(e)}
        value={input.description}
        validation=<DescriptionErrors />
      />

      <FormFileUpload
        title="Imagem de perfil da comunidade"
        name="profile"
        handler={(e) => handlePicture(e)}
        value={picture.profile}
        preview=<PictureProfilePreview />
        validation=<PictureProfileErrors />
      />
      <FormFileUpload
        title="Imagem de capa da comunidade"
        name="cover"
        handler={(e) => handlePicture(e)}
        value={picture.cover}
        preview=<PictureCoverPreview />
        validation=<PictureCoverErrors />
      />
      <ButtonPrimary type="submit" text="Criar comunidade" onClick={handleSubmit} className="mr-2" />
    </form>
  );
}

export default CommunityCreateForm;

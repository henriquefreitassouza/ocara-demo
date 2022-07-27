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

const CommunityEventCreateForm = ({ community }) => {
  const credentials = useAuthentication();
  const navigate = useNavigate();

  const [input, setInput] = useState({
    title: "",
    date: "",
    online: false,
    address: "",
    number: "",
    reference: "",
    neighborhood: "",
    city: "",
    state: "",
    country: "",
    postal_code: "",
    community: "",
    description: "",
    user: ""
  });

  const [errors, setErrors] = useState({
    title: [],
    date: [],
    online: [],
    description: [],
    cover: []
  });

  const [picture, setPicture] = useState({
    cover: { name: "", file: "", preview: ""}
  });

  const handleInput = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value
    });
  }

  const handleCheck = (e) => {
    setInput({
      ...input,
      online: !input.online
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

    const validTitle = validateEmpty("title", input.title, "Título");
    const validDate = validateEmpty("date", input.date, "Data");
    const validOnline = validateEmpty("online", input.excerpt, "Online");
    const validDescription = validateEmpty("description", input.description, "Descrição")
    const validCoverPicture = validatePicture("cover", picture.cover.file);

    const validate = {
      status: (validTitle.status === "error" ||
               validDate.status === "error" ||
               validOnline.status === "error" ||
               validDescription.status === "error" ||
               validCoverPicture.status === "error")
              ? "error"
              : "success",
      fields: {
        title: validTitle.fields["title"],
        date: validDate.fields["date"],
        online: validOnline.fields["online"],
        description: validDescription.fields["description"],
        cover: validCoverPicture.fields["cover"]
      }
    }

    const datePattern = new RegExp(/0[1-9]|1[0-9]|2[0-9]|3[01]-0[1-9]|1[012]-[1-9]{4}/g);
    const eventDateDayMonthYear = input.date;

    if (!datePattern.test(input.date)) {
      validate.status = "error";
      validate.fields.date = ["Data inválida. Utilize o formato dd-mm-yyyy (dia, mês, ano)"]
    }

    if (validate.status === "error") {
      setErrors(validate.fields);
      return;
    }

    const newDatePattern = new RegExp(/(\d{2})\/(\d{2})\/(\d{4})/);
    const eventDateYearMonthDay = eventDateDayMonthYear.replace(newDatePattern, "$3-$2-$1");

    const eventDate = new Date(eventDateYearMonthDay);

    setErrors({ title: [], date: [], online: [], description: [], cover: [] });

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

    if (s3CoverUrl.result === "success") {
      axios.put(s3CoverUrl.body.signedRequest, picture.cover.file, {
        headers: {
          "Content-Type": picture.cover.file.type
        }
      })
      .then((result) => {});

      try {
        const communityEvent = await handleFetch(`${process.env.REACT_APP_API_ADDRESS}/event`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            title: input.title,
            date: eventDate,
            online: input.online,
            cover: sanitizeS3Url(s3CoverUrl.body.url),
            place: {
              address: input.address,
              number: input.number,
              reference: input.reference,
              neighborhood: input.neighborhood,
              city: input.city,
              state: input.state,
              country: "BR",
              postal_code: input.postal_code
            },
            member: null,
            community: community,
            description: input.description,
            user: credentials.user,
            rsvp_list: []
          })
        });

        if (communityEvent.result !== "success") throw new Error();

        window.alert("Evento cadastrado");

        return navigate(`/clubes-de-leitura/${community}`);
      } catch (e) { window.alert("Não foi possível cadastrar o evento."); }
    } else window.alert("Falha ao carregar as imagens");
  }

  const TitleErrors = () => {
    if (!errors) return;

    return (
      <ul className="ml-3">
        {errors.title.map((error) => (
          <li key={error}><span className="text-sm my-1 text-orange-700 block">{error}</span></li>
        ))}
      </ul>
    );
  }

  const DateErrors = () => {
    if (!errors) return;

    return (
      <ul className="ml-3">
        {errors.date.map((error) => (
          <li key={error}><span className="text-sm my-1 text-orange-700 block">{error}</span></li>
        ))}
      </ul>
    );
  }

  const OnlineErrors = () => {
    if (!errors) return;

    return (
      <ul className="ml-3">
        {errors.online.map((error) => (
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

  const PictureCoverPreview = () => {
    return <div className="w-full h-48 bg-cover bg-gray-500" style={{ backgroundImage: `url(${picture.cover.preview})` }}></div>;
  }

  const PictureCoverErrors = () => {
    if (!errors) return;

    return (
      <ul className="ml-3">
        {errors.cover.map((error) => (
          <li key={error}><span className="text-sm my-1 text-orange-700 block">{error}</span></li>
        ))}
      </ul>
    )
  }

  return (
    <form className="p-4 bg-white lg:border lg:border-gray-200 lg:rounded-lg lg:shadow-2xl lg:p-8">
      <FormInput
        title="Título:"
        type="text"
        name="title"
        handler={(e) => handleInput(e)}
        value={input.title}
        validation=<TitleErrors />
      />
      <FormInput
        title="Data:"
        type="text"
        name="date"
        handler={(e) => handleInput(e)}
        value={input.date}
        pattern="0[1-9]|1[0-9]|2[0-9]|3[01]-0[1-9]|1[012]-[1-9]{4}"
        validation=<DateErrors />
      />
      <FormInput
        title="Online:"
        type="checkbox"
        name="online"
        handler={(e) => handleCheck(e)}
        value={input.online}
        validation=<OnlineErrors />
      />
      <FormInput
        title="Logradouro:"
        type="text"
        name="address"
        handler={(e) => handleInput(e)}
        value={input.address}
      />
      <FormInput
        title="Número:"
        type="text"
        name="number"
        handler={(e) => handleInput(e)}
        value={input.number}
      />
      <FormInput
        title="Complemento:"
        type="text"
        name="reference"
        handler={(e) => handleInput(e)}
        value={input.reference}
      />
      <FormInput
        title="Bairro:"
        type="text"
        name="neighborhood"
        handler={(e) => handleInput(e)}
        value={input.neighborhood}
      />
      <FormInput
        title="Cidade:"
        type="text"
        name="city"
        handler={(e) => handleInput(e)}
        value={input.city}
      />
      <FormInput
        title="Estado:"
        type="text"
        name="state"
        handler={(e) => handleInput(e)}
        value={input.state}
      />
      <FormInput
        title="CEP:"
        type="text"
        name="postal_code"
        handler={(e) => handleInput(e)}
        value={input.postal_code}
      />
      <FormTextarea
        title="Descrição:"
        name="description"
        handler={(e) => handleInput(e)}
        value={input.description}
        validation=<DescriptionErrors />
      />
      <FormFileUpload
        title="Capa do evento"
        name="cover"
        handler={(e) => handlePicture(e)}
        value={picture.cover}
        preview=<PictureCoverPreview />
        validation=<PictureCoverErrors />
      />
      <ButtonPrimary type="submit" text="Criar evento" onClick={handleSubmit} className="mr-2" />
    </form>
  );
}

export default CommunityEventCreateForm;

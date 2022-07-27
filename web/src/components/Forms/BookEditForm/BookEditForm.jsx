import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ButtonPrimary,
         FormFileUpload,
         FormInput,
         FormTextarea } from "components";
import { handleFetch,
         sanitizeS3Url,
         validateEmpty,
         validatePicture } from "utils";

const BookEditForm = ({ book }) => {
  const navigate = useNavigate();

  const [input, setInput] = useState({
    title: book.title,
    isbn: book.isbn,
    publisher: book.publisher,
    author: book.author[0].name,
    genre: book.genre,
    edition: book.edition,
    year_published: book.year_published,
    excerpt: book.excerpt
  });

  const [errors, setErrors] = useState({
    title: [],
    genre: [],
    excerpt: [],
    cover: []
  });

  const [picture, setPicture] = useState({
    cover: { name: "", file: "", preview: book.cover}
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

    const validTitle = validateEmpty("title", input.title, "Título");
    const validGenre = validateEmpty("genre", input.genre, "Gênero literário");
    const validExcerpt = validateEmpty("excerpt", input.excerpt, "Descrição");

    const validate = {
      status: (validTitle.status === "error" ||
               validGenre.status === "error" ||
               validExcerpt.status === "error")
              ? "error"
              : "success",
      fields: {
        title: validTitle.fields["title"],
        genre: validGenre.fields["genre"],
        excerpt: validExcerpt.fields["excerpt"]
      }
    }

    if (picture.cover.file) {
      const validCoverPicture = validatePicture("cover", picture.cover.file);

      validate.status = (validCoverPicture.status === "error") ? "error" : "success";
      validate.fields.cover = validCoverPicture.fields["cover"];
    }

    if (validate.status === "error") {
      setErrors(validate.fields);
      return;
    }

    setErrors({ title: [], genre: [], excerpt: [], cover: [] });

    let s3CoverUrl = null;

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

      if (s3CoverUrl.result === "success") {
        axios.put(s3CoverUrl.body.signedRequest, picture.cover.file, {
          headers: {
            "Content-Type": picture.cover.file.type
          }
        })
        .then((result) => {});
      }
    }

    try {
      const bookUpdate = await handleFetch(`${process.env.REACT_APP_API_ADDRESS}/book/${book._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          title: input.title,
          isbn: input.isbn,
          publisher: input.publisher,
          author: [{
            name: input.author,
            role: ""
          }],
          genre: input.genre,
          edition: input.edition,
          year_published: input.year_published,
          excerpt: input.excerpt,
          cover: (s3CoverUrl) ? sanitizeS3Url(s3CoverUrl.body.url) : book.cover,
          user: book.user
        })
      });

      if (bookUpdate.result !== "success") throw new Error();

      window.alert("Resenha atualizada");

      return navigate("/perfil");
    } catch (e) { window.alert("Não foi possível atualizar a resenha."); }
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

  const GenreErrors = () => {
    if (!errors) return;

    return (
      <ul className="ml-3">
        {errors.genre.map((error) => (
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
        title="ISBN:"
        type="text"
        name="isbn"
        handler={(e) => handleInput(e)}
        value={input.isbn}
      />
      <FormInput
        title="Editora:"
        type="text"
        name="publisher"
        handler={(e) => handleInput(e)}
        value={input.publisher}
      />
      <FormInput
        title="Autor:"
        type="text"
        name="author"
        handler={(e) => handleInput(e)}
        value={input.author}
      />
      <FormInput
        title="Gênero literário:"
        type="text"
        name="genre"
        handler={(e) => handleInput(e)}
        value={input.genre}
        validation=<GenreErrors />
      />
      <FormInput
        title="Edição:"
        type="text"
        name="edition"
        handler={(e) => handleInput(e)}
        value={input.edition}
      />
      <FormInput
        title="Ano de publicação:"
        type="text"
        name="year_published"
        handler={(e) => handleInput(e)}
        value={input.year_published}
      />
      <FormTextarea
        title="Descrição:"
        name="excerpt"
        handler={(e) => handleInput(e)}
        value={input.excerpt}
        validation=<ExcerptErrors />
      />
      <FormFileUpload
        title="Capa do livro"
        name="cover"
        handler={(e) => handlePicture(e)}
        value={picture.cover}
        preview=<PictureCoverPreview />
        validation=<PictureCoverErrors />
      />
      <ButtonPrimary type="submit" text="Atualizar resenha" onClick={handleSubmit} className="mr-2" />
    </form>
  );
}

export default BookEditForm;

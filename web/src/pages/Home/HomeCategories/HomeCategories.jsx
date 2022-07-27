import { useQuery } from "react-query";

import { SectionTitle,
         Tag } from "components";

const HomeCategories = () => {
  const { isLoading, error, data } = useQuery("tagsData", () =>
    fetch(`${process.env.REACT_APP_API_ADDRESS}/book/list/genre`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then((result) => result.json())
  );

  const CategoryList = () => {
    if (!Array.isArray(data.body)) return;

    return (
      <>
        {data.body.map((tag) => (
          <Tag key={tag} link={`/categorias/${tag.toLowerCase()}`} title={tag} />
        ))}
      </>
    );
  }

  if (isLoading || error) return;

  return (
    <section className="px-4 py-8">
      <div className="container mx-auto">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
          <div className="basis-full">
            <SectionTitle
              title="Encontre o livro que combina com você"
              subtitle="Explore as seções e leia as resenhas feitas pela comunidade"
              className="text-center mb-8 lg:text-left" />
          </div>
          <div className="basis-full">
            <div className="">
              <CategoryList />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HomeCategories;

import { PageTitle } from "components";
import { handleImageLoad } from "utils";

const images = handleImageLoad(require.context("/src/assets/images/hero", false, /book-9.jpg/));

const AboutCompany = () => {
  return (
    <section className="px-4 py-8">
      <div className="container mx-auto">
        <PageTitle
          title="Prazer, eu sou a Ocara"
          subtitle="Uma rede social que une pessoas apaixonadas pela leitura ❤️​"
          className="text-center mb-8" />
        <div className="flex flex-col mb-4 lg:flex-row lg:items-center">
          <div className="basis-full mx-auto mb-4 lg:basis-1/3 lg:mb-0 lg:mr-4">
            <img className="rounded-sm lg:w-full lg:object-cover" src={images["book-9.jpg"]} alt="Livro" />
          </div>
          <p className="basis-full lg:basis-2/3">A leitura conecta.
          Ela é o ponto de partida para o nascimento e florescimento de histórias que transformam pessoas.
          A leitura não acontece por si só. Ela acontece quando pessoas leitoras e livros se encontram.
          Juntos, livro, pessoas leitoras e leitura abrem caminhos para novas descobertas,
          risadas, sustos, medos e uma miríade de outros sentimentos que despertam conversas.
          Conversas viram histórias. Histórias transformam pessoas. Pessoas formam pessoas leitoras.</p>
        </div>
      </div>
    </section>
  );
}

export default AboutCompany;

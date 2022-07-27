import { NavLink,
         PageTitle } from "components";

const PrivacyPolicyDocument = () => {
  return (
    <section className="px-4 py-8">
      <div className="container mx-auto">
        <PageTitle
          title="Políticas de Privacidade"
          subtitle="Aqui estão listadas todas as condições de uso de dados pela Ocara."
          className="text-center mb-8" />
        <p>A Bienal Internacional do Livro de São Paulo é o
        palco para o encontro das principais editoras,
        livrarias e distribuidoras do país.
        Esse reencontro está marcado para os dias 02 a 10 de Julho no
        Expo Center Norte com uma programação multicultural abrangente mesclando literatura,
        gastronomia, cultura, negócios e muita diversão!</p>
        <p>&nbsp;</p>
        <p>O evento é palco para celebrar a transformação que os
        livros fazem na vida das pessoas, e mais uma vez supera todas
        as expectativas comercializando 100% do espaço disponível com
        diversos expositores trazendo novidades para o todos os públicos.</p>
        <p>&nbsp;</p>
        <p>Para completar essa edição histórica, teremos como
        Convidado de Honra - Portugal, quando celebramos os 200 anos da
        independência do Brasil, unidos eternamente em nossa língua mátria.</p>
        <p>&nbsp;</p>
        <p>Aproveite agora e garanta já o seu ingresso para fazer
        parte do reencontro mais esperado dos últimos anos!</p>
      </div>
      <div className="text-center mt-4">
        <NavLink
          link="/"
          text="Voltar" />
      </div>
    </section>
  );
}

export default PrivacyPolicyDocument;

import { Feature,
         SectionTitle } from "components";
import features from "./data";

const HomeFeatures = () => {
  const FeatureList = () => {
    return (
      <>
        {features.map((feature) => (
          <Feature
            key={feature.id}
            icon={feature.icon}
            title={feature.title}
            description={feature.description}
          />
        ))}
      </>
    )
  }
  return (
    <section id="feature" className="px-4 py-8">
      <div className="container mx-auto">
        <SectionTitle
          title="Todo mundo gosta de uma boa história"
          subtitle="Junte-se a uma comunidade de pessoas apaixonadas pela leitura"
          className="text-center mb-8" />
        <div className="flex flex-wrap flex-col lg:flex-row">
          <FeatureList />
        </div>
      </div>
    </section>
  );
}

export default HomeFeatures;

import { ButtonAction,
         SectionTitleNeutral } from "components";

import { handleAnchorClick } from "utils";

const CallOut = ({ title, description, link, text }) => {
  return (
    <section className="px-4 py-8 bg-green-500">
      <div className="container mx-auto">
        <SectionTitleNeutral
          title={title}
          subtitle={description}
          className="text-center mb-8" />
        <div className="text-center">
          <ButtonAction link={link} text={text} onClick={(e) => handleAnchorClick(e, link)} />
        </div>
      </div>
    </section>
  );
}

export default CallOut;

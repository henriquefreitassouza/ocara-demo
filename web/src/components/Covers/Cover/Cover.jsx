import { CoverBackground,
         CoverHeader,
         CoverProfile } from "components";

const Cover = ({ cover, profile, title, lead, inner }) => {
  return (
    <div className="relative">
      <div className="flex">
        <CoverBackground cover={cover} />
      </div>
      <div className="flex justify-center">
        <div className="lg:w-3/12 xl:w-2/12">
          <CoverProfile profile={profile} />
        </div>
        <div className="py-4 mt-24 lg:mt-0 lg:w-9/12 xl:w-10/12">
          <div className="w-11/12 mx-auto">
            <CoverHeader
              title={title}
              lead={lead} />
            {inner}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cover;

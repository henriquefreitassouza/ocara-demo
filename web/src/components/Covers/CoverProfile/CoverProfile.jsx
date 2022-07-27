const CoverProfile = ({ profile }) => {
  return (
    <div className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full w-48 h-48 bg-gray-500 lg:relative lg:-translate-x-1/3 bg-cover" style={{backgroundImage: `url(${profile})`}}>
    </div>
  );
}

export default CoverProfile;

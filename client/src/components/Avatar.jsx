import { nameInitialsGenerator } from "../utils";

const Avatar = ({ name, profilePhoto }) => {
  return (
    <figure className="flex items-center gap-2">
      <div className="inline-flex overflow-hidden relative justify-center items-center w-8 h-8 bg-primary rounded-full">
        {profilePhoto ? (
          <img className="object-cover h-8 w-8" src={profilePhoto} alt="Profile" />
        ) : (
          <span className="font-medium text-white">{nameInitialsGenerator(name)}</span>
        )}
      </div>

      <div className="flex flex-col"><span>{name}</span></div>
    </figure>
  );
};

export default Avatar;

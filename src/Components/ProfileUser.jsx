import UpdateImage from "./UpdateImage";
import useAuthStore from "../Store/authStore";

export default function ProfileUser() {
  const profile = useAuthStore((state) => state.profile);
  return (
    <div className="min-h-screen border-l-2">
      <UpdateImage />
      {profile && (
        <div className="ml-3 pt-5 text-white">
          <h4 className="font-main text-xl">
            <span className="font-main font-semibold">Username:</span>{" "}
            {profile.username}
          </h4>
          <h4 className="font-main my-5 text-xl">
            <span className="font-main font-semibold">Firstname:</span>{" "}
            {profile.first_name}
          </h4>
          <h4 className="font-main text-xl">
            <span className="font-main font-semibold">Lastname:</span>{" "}
            {profile.last_name}
          </h4>
        </div>
      )}
    </div>
  );
}

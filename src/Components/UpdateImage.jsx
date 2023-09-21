import { useEffect, useState } from "react";
import { supabase } from "../Supabase/Client";
import getProfileImage from "../Utilities/getProfileImage";
import useAuthStore from "../Store/authStore";

export default function UpdateImage() {
  const profile = useAuthStore((state) => state.profile);
  const setProfile = useAuthStore((state) => state.setProfile);
  const [preview, setPreview] = useState();
  const [uploading, setUploading] = useState(false);
  const [file, setFile] = useState();

  useEffect(() => {
    if (!file) {
      setPreview(null);
      return;
    }
    const objectUrl = URL.createObjectURL(file);
    setPreview(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [file]);

  const handleFile = (e) => {
    if (!e.target.files) {
      setFile(() => null);
      return;
    }
    setFile(() => e.target.files[0]);
  };
  const submit = async (e) => {
    e.preventDefault();

    try {
      setUploading(true);

      if (!file) {
        return;
      }

      const fileExt = file.name.split(".").pop();
      const fileName = `${profile.username}-${Math.random()}.${fileExt}`;
      const filePath = `${fileName}`;

      let { data: uploadData, error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(filePath, file);
      console.log(uploadData);
      if (uploadError) {
        throw uploadError;
      }

      const updates = {
        id: profile.id,
        avatar_url: filePath,
        updated_at: new Date(),
      };

      let { data, error } = await supabase
        .from("profiles")
        .upsert(updates)
        .select()
        .single();

      setProfile(data);
    } catch (error) {
      alert(error.message);
    } finally {
      setUploading(false);
      setFile(() => null);
      setPreview(() => null);
    }
  };
  return (
    <div>
      <div>
        {profile && (
          <img
            src={getProfileImage(profile.avatar_url)}
            className="mb-5 md:w-1/6"
          />
        )}
      </div>
      <div>{preview && <img src={preview} className="mb-5 md:w-1/6" />}</div>
      <form onSubmit={submit}>
        {uploading ? "Uploading  " : "Upload "}
        {file ? (
          <button
            className=" rounded-full bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
            type="submit"
          >
            Cambia immagine
          </button>
        ) : (
          <>
            <label
              htmlFor="button"
              className=" cursor-pointer rounded-full bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
            >
              Scegli immagine
            </label>
            <input
              type="file"
              className="hidden"
              id="button"
              accept="image/*"
              disabled={uploading}
              onChange={handleFile}
            />
          </>
        )}
      </form>
    </div>
  );
}

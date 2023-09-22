import { useEffect, useState } from "react";
import getProfileImage from "../Utilities/getProfileImage";
import useAuthStore from "../Store/authStore";
import { supabase } from "../Supabase/Client";

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
      console.log(updates);
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
      <div>{profile && <img src={getProfileImage(profile.avatar_url)} />}</div>

      <div>{preview && <img src={preview} />}</div>

      <form onSubmit={submit}>
        {uploading ? "Uploadind" : "Upload"}
        <input
          type="file"
          accept="image/*"
          disabled={uploading}
          onChange={handleFile}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

// import { useEffect, useState } from "react";
// import { supabase } from "../Supabase/Client";
// import getProfileImage from "../Utilities/getProfileImage";
// import useAuthStore from "../Store/authStore";

// export default function UpdateImage() {
//   const profile = useAuthStore((state) => state.profile);
//   const setProfile = useAuthStore((state) => state.setProfile);

//   const [preview, setPreview] = useState();
//   const [uploading, setUploading] = useState(false);
//   const [file, setFile] = useState();

//   useEffect(() => {
//     if (!file) {
//       setPreview(null);
//       return;
//     }

//     const objectUrl = URL.createObjectURL(file);
//     setPreview(objectUrl);

//     return () => URL.revokeObjectURL(objectUrl);
//   }, [file]);

//   const handleFile = (e) => {
//     if (!e.target.files) {
//       setFile(() => null);
//       return;
//     }

//     setFile(() => e.target.files[0]);
//   };

//   const submit = async (e) => {
//     e.preventDefault();

//     try {
//       setUploading(true);

//       if (!file) {
//         return;
//       }

//       const fileExt = file.name.split(".").pop();
//       const fileName = `${profile.username}-${Math.random()}.${fileExt}`;
//       const filePath = `${fileName}`;

//       let { data: uploadData, error: uploadError } = await supabase.storage
//         .from("avatars")
//         .upload(filePath, file);
//       console.log(uploadData);
//       if (uploadError) {
//         throw uploadError;
//       }

//       const updates = {
//         id: profile.id,
//         avatar_url: filePath,
//         updated_at: new Date(),
//       };

//       // eslint-disable-next-line no-unused-vars
//       let { data, error } = await supabase
//         .from("profiles")
//         .upsert(updates)
//         .select()
//         .single();

//       setProfile(data);
//     } catch (error) {
//       alert(error.message);
//     } finally {
//       setUploading(false);
//       setFile(() => null);
//       setPreview(() => null);
//     }
//   };

//   return (
//     <div>
//       {profile && (
//         <div className="w-100 flex justify-center">
//           <img
//             className="h-56 w-4/5	rounded-3xl object-cover shadow-[0px_0px_24px_0px_#fff5f5]"
//             src={getProfileImage(profile.avatar_url)}
//             alt="img profile"
//           />
//         </div>
//       )}

//       <div>
//         {preview && <img className="h-56 w-4/5 object-cover" src={preview} />}
//       </div>

//       <form onSubmit={submit}>
//         {uploading ? "Uploadind" : "Upload"}
//         <input
//           type="file"
//           accept="image/*"
//           disabled={uploading}
//           onChange={handleFile}
//         />
//         <button type="submit">Submit</button>
//       </form>
//     </div>
//   );
// }

import { useEffect, useState } from "react";
import { supabase } from "../Supabase/Client";
import getProfileImage from "../Utilities/getProfileImage";
import useAuthStore from "../Store/authStore";

export default function UpdateImage() {
  const profile = useAuthStore((state) => state.profile);
  const [preview, setPreview] = useState();
  const [uploading, setUploading] = useState(false);
  const [file, setFile] = useState();
  // controlla se ce il file
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

    setUploading(() => true);
    // nome file
    const fileName = `${profile.id + Math.random()}`;

    const { error: uploadError } = await supabase.storage
      .from("avatars")
      .upload(fileName, file);

    if (uploadError) {
      throw uploadError;
    }

    // update profile
    const updated_at = new Date();
    const { error } = await supabase.from("profiles").upsert({
      id: profile.id,
      updated_at,
      avatar_url: fileName,
    });

    if (error) {
      console.log(error);
    } else {
      setUploading(() => false);
      setFile(() => null);
      setPreview(() => null);
    }
  };

  return (
    <div className=" mx-auto w-2/5 rounded-md bg-slate-500">
      <h2 className="text-center text-lg font-bold">
        {uploading ? "uploading" : "Upload"}
      </h2>

      {/* l'immagine presente */}
      <div className="flex justify-around">
        <div className="w-2/5">
          <h3>immagine profile</h3>
          {profile && (
            <img
              className="mx-1 w-full  rounded-sm "
              src={getProfileImage(profile.avatar_url)}
              alt="Avatars"
            />
          )}
        </div>
        <div className="w-2/5">
          <h3>preview</h3>
          {preview && (
            <img className="mx-1 w-full  rounded-sm " src={preview} />
          )}
        </div>
      </div>

      {/* form per uploadare l'immagine */}
      <div>
        <form onSubmit={submit}>
          <input
            type="file"
            accept="image/*"
            disabled={uploading}
            onChange={handleFile}
          />
          <button
            className="mb-2 rounded-full bg-green-700 px-2 text-center"
            type="submit"
          >
            submit
          </button>
        </form>
      </div>
    </div>
  );
}

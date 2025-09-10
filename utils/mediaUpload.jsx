import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_KEY
);

export default function mediaUpload(file) {
  const prmise = new Promise(
    (resolve, reject) => {
        if(file == null){
            reject("No file provided");
            return;
        }
        const timestamp = new Date().getTime();
        const newFileName= timestamp+file.name;

        supabase.storage.from("images").upload(newFileName, file,{
            cacheControl: "3600",
            upsert: false
        }).then(
            () => {
                const url= supabase.storage.from("images").getPublicUrl(newFileName).data.publicUrl;
                resolve(url);
            }
        ).catch(
            (error) => {
                reject("Upload failed: " + error.message);
            }
        )
    });
    return prmise;
}

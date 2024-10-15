import { SupabaseClient } from "@supabase/supabase-js";
import { Database } from "./types";

type HandleImageChangeProps = {
  image: File;
  supabase: SupabaseClient<Database>;
  bucketName: string;
  folderPath: string | null;
};
export async function uploadImage({
  image,
  supabase,
  bucketName,
  folderPath,
}: HandleImageChangeProps) {
  const fileTypes = ["image/png", "image/jpeg", "image/gif"];
  if (!fileTypes.includes(image.type))
    throw new Error("Please upload an image");
  let imagePath: string | undefined = undefined;
  const { data: imageData, error: imageError } = await supabase.storage
    .from(bucketName)
    .upload(`${folderPath}${image.name}`, image);

  if (imageError) {
    let tempError = imageError.message;
    let tempName = image.name;
    if (tempError !== "The resource already exists") throw new Error(tempError);
    while (tempError === "The resource already exists") {
      const fileType = image.name.split(".").at(-1);
      tempName = tempName.replace(`.${fileType}`, "") + ".Copy";
      const { data: newImageData, error } = await supabase.storage
        .from(bucketName)
        .upload(`${tempName}.${fileType}`, image);

      if (error) tempError = error.message;
      if (tempError !== "The resource already exists")
        throw new Error(tempError);
      if (newImageData) {
        imagePath = newImageData.path;
        break;
      }
    }
  } else {
    imagePath = imageData.path;
  }

  if (!imagePath) throw new Error("Error uploading image");

  //   const {
  //     data: { publicUrl },
  //   } = supabase.storage.from(bucketName).getPublicUrl(imagePath);

  return { imagePath };
}

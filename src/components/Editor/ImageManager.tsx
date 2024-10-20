/* eslint-disable @next/next/no-img-element */
import { Database } from "@/lib/supabase/types";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { SupabaseClient } from "@supabase/supabase-js";
import { SecondaryButton } from "../SecondaryButton";
import { useState } from "react";
import { useImages } from "@/lib/hooks/useImages";
import { useImageFolders } from "@/lib/hooks/useImageFolders";
import Input from "../Input";
import { toast } from "react-toastify";
import { uploadImage } from "@/lib/supabase/uploadImage";
import Image from "next/image";

type Props = {
  supabase: SupabaseClient<Database>;
};

export default function ImageManager({ supabase }: Props) {
  const [refetch, setRefetch] = useState<boolean>(false);
  const [page, setPage] = useState(1);
  const [folderPath, setFolderPath] = useState<string | null>(null);
  const [newFolder, setNewFolder] = useState<string>("");
  const [image, setImage] = useState<File | null>(null);

  const [images, setImages] = useImages({
    supabase,
    page,
    refetch,
    folder: folderPath ? folderPath.split("/").at(-2) || null : null,
  });

  const [folders] = useImageFolders({
    supabase,
    refetch,
    folder: folderPath ? folderPath.split("/").at(-2) || null : null,
  });

  const upload = async () => {
    try {
      if (!image) {
        toast.error("Image is required");
        return;
      }
      const { imagePath } = await uploadImage({
        image,
        folderPath,
        supabase,
        bucketName: "News Images",
      });

      console.log(
        encodeURI(
          `https://api.syndicatenetwork.io/storage/v1/object/public/News Images/${imagePath}`
        )
      );

      const { data, error } = await supabase
        .from("news_images")
        .insert({
          url: encodeURI(
            `https://api.syndicatenetwork.io/storage/v1/object/public/News Images/${imagePath}`
          ),
          name: image.name,
          folder: folderPath ? folderPath.split("/").at(-2) || null : null,
        })
        .select()
        .single();

      if (error) {
        console.error(error);
        toast.error("Failed to upload image");
        return;
      }

      toast.success("Image uploaded");
      setImages([data, ...images]);
    } catch (error) {
      console.error(error);
      toast.error("Failed to upload image");
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    setImage(e.target.files[0]);
  };

  const createFolder = async () => {
    if (!newFolder) {
      toast.error("Folder name is required");
      return;
    }
    const { data, error } = await supabase
      .from("news_image_folders")
      .insert({
        name: newFolder,
        parent: folderPath ? folderPath.split("/").at(-2) || null : null,
      })
      .select("*");

    if (error) {
      console.log(error);
      toast.error("Failed to create folder");
      return;
    }

    if (data) {
      setFolderPath(folderPath + newFolder + "/");
    }

    toast.success("Folder created");
  };

  const handleFolderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewFolder(e.target.value);
  };

  const folderBack = () => {
    if (!folderPath) return;
    const path = folderPath.split("/");
    if (path.length === 2) {
      setFolderPath(null);
      return;
    }
    setFolderPath(path.slice(0, path.length - 2).join("/") + "/");
  };

  const folderForward = (folder: string) => {
    if (!folderPath) {
      setFolderPath(folder + "/");
      return;
    }
    setFolderPath(folderPath + folder + "/");
  };

  return (
    <Dialog>
      <DialogTrigger className="px-[10px] py-1 text-white bg-secondary-bg rounded-sm border-2 border-white border-opacity-25 hover:bg-opacity-25 hover:bg-secondary-bg hover:border-opacity-50 transition-colors duration-200 ease-in-out">
        Images
      </DialogTrigger>
      <DialogContent className="bg-primary-bg max-w-[1000px] max-h-[700px] overflow-scroll ">
        <DialogHeader>
          <DialogTitle>Images</DialogTitle>
          <div className="flex flex-col gap-1">
            <div className="flex flex-col sm:flex-row gap-1">
              <Input
                value={newFolder}
                onChange={handleFolderChange}
                placeholder="Folder Name"
              />
              <SecondaryButton onClick={createFolder} className="">
                New Folder
              </SecondaryButton>
            </div>
            <span>Path: {folderPath}</span>
            <div className="flex flex-wrap gap-1 items-start">
              {folderPath && (
                <SecondaryButton onClick={folderBack}>Back</SecondaryButton>
              )}
              {folders.map((folder, index) => (
                <SecondaryButton
                  key={index}
                  onClick={() => folderForward(folder.name)}
                >
                  {folder.name}
                </SecondaryButton>
              ))}
            </div>
            <div className="flex flex-row gap-1">
              <Input
                type="file"
                onChange={handleImageChange}
                className="w-[75%]"
              />
              <SecondaryButton onClick={upload}>Upload</SecondaryButton>
            </div>
            <div className="flex flex-wrap gap-1">
              {images.map((image, index) => (
                <button
                  className="flex flex-col items-center"
                  key={index}
                  onClick={() => {
                    navigator.clipboard.writeText(image.url);
                    toast.success("Copied to clipboard");
                  }}
                >
                  <div className="w-32 h-32 flex items-center justify-center overflow-hidden">
                    <img
                      src={image.url}
                      alt={image.name}
                      width={128}
                      height={128}
                    />
                  </div>
                  <span className="w-32 truncate">{image.name}</span>
                </button>
              ))}
            </div>
            <div className="flex flex-row space-x-1 items-center ml-auto">
              <span>Page:</span>
              <span>{page}</span>
              {page !== 1 && (
                <SecondaryButton
                  onClick={() => {
                    setPage(page - 1);
                  }}
                >
                  Prev
                </SecondaryButton>
              )}
              <SecondaryButton
                onClick={() => {
                  setPage(page + 1);
                }}
              >
                Next
              </SecondaryButton>
            </div>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

"use client";

import { app } from "@/firebase";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { useSession } from "next-auth/react";
import { useEffect, useRef, useState } from "react";
import { HiOutlinePhotograph } from "react-icons/hi";

export default function Input() {
  const { data: session } = useSession();
  const imagePick = useRef(null);
  const [imageurl, setImageUrl] = useState(null);
  const [imageFileUploading, setImageFileUploading] = useState(false);
  const [selectImage, setSelectImage] = useState(null);

  const addImageToPost = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectImage(file);
      setImageUrl(URL.createObjectURL(file));
    }
  };

  useEffect(() => {
    if (selectImage) {
      uploadImageToStorage();
    }
  }, [selectImage]);

  const uploadImageToStorage = () => {
    setImageFileUploading(true);
    const storage = getStorage(app);
    const fileName = new Date().getTime() + "-" + selectImage.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, selectImage);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("upload 0" + progress + "100%");
      },
      (error) => {
        console.log(error);
        setImageFileUploading(false);
        setImageUrl(null);
        setSelectImage(null);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImageUrl(downloadURL);
          setImageFileUploading(false);
        });
      }
    );
  };

  if (!session) return null;
  return (
    <div className="flex border-b border-gray-400 p-3 space-x-3 w-full">
      <img
        src={session.user.image}
        alt="img"
        className="h-11 w-11 rounded-full cursor-pointer hover:brightness-100"
      />
      <div className="w-full divide-y divide-gray-200 ">
        <textarea
          placeholder="What happening"
          rows="2"
          className="w-full border-none outline-none tracking-wide min-h-[50px] text-gray-700"
        ></textarea>

        {selectImage && (
          <img
            src={imageurl}
            className="w-full max-h-[250px] object-cover cursor-pointer"
          />
        )}
        <div className="   flex items-center justify-between pt-2.5">
          <HiOutlinePhotograph
            onClick={() => imagePick.current.click()}
            className="h-10 w-10 p-2 text-sky-500 hover:bg-sky-600 rounded-full cursor-pointer"
          />
          <input
            type="file"
            ref={imagePick}
            accept="image/*"
            onChange={addImageToPost}
            hidden
          />
          <button
            disabled
            className="bg-blue-400 text-white px-4 py-1.5 rounded-full font-bold shadow-md hover:brightness-90 disabled:opacity-50"
          >
            Post
          </button>
        </div>
      </div>
    </div>
  );
}

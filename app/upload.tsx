"use client";

import { useState } from "react";
import { useDropzone } from "react-dropzone";
import { uploadToCloudinary } from "./utils/uploadHelper"; 
import { generateMemeCaption } from "./utils/memeAI";
import Image from "next/image";

export default function UploadMeme() {
  const [image, setImage] = useState<string | null>(null);
  const [caption, setCaption] = useState("");
  const [loading, setLoading] = useState(false);

  const { getRootProps, getInputProps } = useDropzone({
    accept: { "image/*": [".png", ".jpg", ".jpeg", ".gif"] },
    onDrop: async (acceptedFiles) => {
      const file = acceptedFiles[0];
      if (!file) return;

      setLoading(true);
      const uploadedUrl = await uploadToCloudinary(file);
      setImage(uploadedUrl);
      setLoading(false);
    },
  });

  const handleGenerateCaption = async () => {
    if (!image) return;
    setLoading(true);
    const aiCaption = await generateMemeCaption(image);
    setCaption(aiCaption);
    setLoading(false);
  };

  const handleUpload = () => {
    if (!image || !caption) return alert("Please upload an image and enter a caption!");
    console.log("Uploading Meme:", { image, caption });
    alert("Meme uploaded successfully! 🎉");
    setImage(null);
    setCaption("");
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Upload Your Meme</h1>

      <div
        {...getRootProps()}
        className="border-dashed border-2 p-10 text-center cursor-pointer bg-gray-100 hover:bg-gray-200 rounded-lg"
      >
        <input {...getInputProps()} />
        {loading ? (
          <p>Uploading...</p>
        ) : image ? (
          <Image src={image} alt="Meme Preview" width={400} height={400} className="mx-auto" />
        ) : (
          <p>Drag & drop an image here, or click to select</p>
        )}
      </div>

      {image && (
        <>
          <textarea
            className="w-full p-2 border rounded mt-4"
            placeholder="Enter a funny caption..."
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
          />
          <button onClick={handleGenerateCaption} className="bg-blue-500 text-white px-4 py-2 mt-2 rounded">
            Generate AI Caption 🤖
          </button>
        </>
      )}

      <button
        onClick={handleUpload}
        className="bg-green-500 text-white px-4 py-2 mt-4 rounded w-full disabled:opacity-50"
        disabled={!image || !caption}
      >
        Upload Meme 🚀
      </button>
    </div>
  );
}

"use client";

import { useState } from "react";
import { useAppSelector, useAppDispatch } from "../store/hook";
import { updateProfile } from "../store/userSlice";
import Image from "next/image";
import { MemeType } from "./types";


export default function ProfilePage() {
  const dispatch = useAppDispatch();
  const { name, bio, profilePicture, uploadedMemes, likedMemes } = useAppSelector((state) => state.user);

  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState(name);
  const [newBio, setNewBio] = useState(bio);
  const [newProfilePicture, setNewProfilePicture] = useState(profilePicture);

  const handleSave = () => {
    dispatch(updateProfile({ name: newName, bio: newBio, profilePicture: newProfilePicture }));
    setIsEditing(false);
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <div className="flex items-center gap-4">
        <Image src={profilePicture} alt="Profile Picture" width={100} height={100} className="rounded-full" />
        {isEditing ? (
          <div>
            <input type="text" value={newName} onChange={(e) => setNewName(e.target.value)} className="border p-2" />
            <input type="text" value={newBio} onChange={(e) => setNewBio(e.target.value)} className="border p-2 mt-2" />
            <button onClick={handleSave} className="bg-blue-500 text-white p-2 mt-2 rounded">Save</button>
          </div>
        ) : (
          <div>
            <h2 className="text-2xl font-bold">{name}</h2>
            <p className="text-gray-500">{bio}</p>
            <button onClick={() => setIsEditing(true)} className="bg-gray-300 p-2 mt-2 rounded">Edit</button>
          </div>
        )}
      </div>

      <h2 className="text-xl font-bold mt-6">Uploaded Memes</h2>
      <div className="grid grid-cols-2 gap-4 mt-4">
        {uploadedMemes.length > 0 ? (
          uploadedMemes.map((meme) => (
            <Image key={meme.id} src={meme.image} alt={meme.name} width={200} height={200} className="rounded-lg" />
          ))
        ) : (
          <p className="text-gray-500">No memes uploaded yet.</p>
        )}
      </div>

      <h2 className="text-xl font-bold mt-6">Liked Memes</h2>
      <div className="grid grid-cols-2 gap-4 mt-4">
        {likedMemes.length > 0 ? (
          likedMemes.map((id) => (
            <Image key={id} src={`/memes/${id}.jpg`} alt="Liked Meme" width={200} height={200} className="rounded-lg" />
          ))
        ) : (
          <p className="text-gray-500">No liked memes yet.</p>
        )}
      </div>
    </div>
  );
}

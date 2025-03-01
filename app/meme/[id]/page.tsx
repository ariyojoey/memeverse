"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useAppSelector } from "../../store/hook";
import Image from "next/image";
import { Heart, Share2, MessageSquare } from "lucide-react";

interface MemeType {
  id: string;
  name: string;
  image: string;
  caption: string;
  likes: number;
}

export default function MemeDetails() {
  const { id } = useParams();
  const memes = useAppSelector((state) => state.memes.memes);
  const meme = memes.find((m) => m.id === id) as MemeType | undefined;

  const [likes, setLikes] = useState(0);
  const [comments, setComments] = useState<string[]>([]);
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    if (meme) {
      const savedLikes = localStorage.getItem(`likes-${meme.id}`);
      const savedComments = localStorage.getItem(`comments-${meme.id}`);
      setLikes(savedLikes ? parseInt(savedLikes) : meme.likes);
      setComments(savedComments ? JSON.parse(savedComments) : []);
    }
  }, [meme]);

  const handleLike = () => {
    if (!meme) return;
    const newLikes = likes + 1;
    setLikes(newLikes);
    localStorage.setItem(`likes-${meme.id}`, newLikes.toString());
  };

  const handleComment = () => {
    if (!meme || !newComment.trim()) return;
    const updatedComments = [...comments, newComment];
    setComments(updatedComments);
    localStorage.setItem(`comments-${meme.id}`, JSON.stringify(updatedComments));
    setNewComment("");
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    alert("Link copied to clipboard! 📋");
  };

  if (!meme) return <p className="text-center mt-10 text-lg">Meme not found! 😢</p>;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">{meme.name}</h1>

      <Image src={meme.image} alt={meme.name} width={600} height={600} className="rounded-lg shadow-lg" />

      <p className="mt-4 text-gray-700">{meme.caption}</p>

      <div className="flex items-center gap-4 mt-4">
        <button onClick={handleLike} className="flex items-center gap-2 text-red-500">
          <Heart className="w-6 h-6" /> {likes} Likes
        </button>
        <button onClick={handleShare} className="flex items-center gap-2 text-blue-500">
          <Share2 className="w-6 h-6" /> Share
        </button>
      </div>

      <div className="mt-6">
        <h2 className="text-2xl font-semibold">Comments</h2>
        <div className="mt-2 space-y-2">
          {comments.length > 0 ? (
            comments.map((comment, index) => (
              <p key={index} className="bg-gray-100 p-2 rounded-lg">{comment}</p>
            ))
          ) : (
            <p className="text-gray-500">No comments yet. Be the first! 🚀</p>
          )}
        </div>

        <div className="mt-4 flex gap-2">
          <input
            type="text"
            placeholder="Add a comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="flex-1 p-2 border rounded"
          />
          <button onClick={handleComment} className="bg-green-500 text-white px-4 py-2 rounded">
            Comment 💬
          </button>
        </div>
      </div>
    </div>
  );
}

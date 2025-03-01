"use client";

import { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../store/hook";
import { updateLeaderboard } from "../store/leaderboardSlice";
import { RootState } from "../store/store";
import Image from "next/image";
import { motion } from "framer-motion";


export default function LeaderboardPage() {
  const dispatch = useAppDispatch();
  const memes = useAppSelector((state: RootState) => state.memes.memes);
  const topMemes = useAppSelector((state: RootState) => state.leaderboard.topMemes);

  useEffect(() => {
    // Sort memes by likes (descending) and take top 10
    const sortedMemes = [...memes].sort((a, b) => b.likes - a.likes).slice(0, 10);
    dispatch(updateLeaderboard(sortedMemes));
  }, [memes, dispatch]);

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">🔥 Meme Leaderboard</h1>

      {topMemes.length === 0 ? (
        <p className="text-gray-500 text-center">No top memes yet! Upload memes to rank.</p>
      ) : (
        <div className="space-y-4">
          {topMemes.map((meme, index) => (
            <motion.div 
              key={meme.id}
              className="flex items-center gap-4 p-4 border rounded-lg shadow-sm bg-white dark:bg-gray-800"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <span className="text-2xl font-bold">#{index + 1}</span>
              <Image src={meme.image} alt={meme.name} width={80} height={80} className="rounded-lg" />
              <div>
                <h2 className="font-semibold">{meme.name}</h2>
                <p className="text-gray-500">{meme.likes} Likes</p>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}

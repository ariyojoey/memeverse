// import { useEffect, useState } from "react";
// import { useAppDispatch, useAppSelector } from "./store/hook";
// import { getMemes } from "./store/memeSlice";
// import MemeCard from "./components/MemeCard";
// import { useInView } from "react-intersection-observer";
// import { debounce } from "lodash";

// export default function Explorer() {
//   const dispatch = useAppDispatch();
//   const { memes, loading } = useAppSelector((state: any) => state.memes);
//   const [query, setQuery] = useState("");
//   const [sort, setSort] = useState("new");
//   const [page, setPage] = useState(1);
//   const { ref, inView } = useInView();

//   // Fetch memes on page load & when page number changes
//   useEffect(() => {
//     dispatch(getMemes());
//   }, [dispatch, page]);

//   // Infinite Scroll: Load more memes when inView
//   useEffect(() => {
//     if (inView) setPage((prev) => prev + 1);
//   }, [inView]);

//   // Debounced Search
//   const handleSearch = debounce((value) => {
//     setQuery(value.toLowerCase());
//   }, 500);

//   // Filtered & Sorted Memes
//   const filteredMemes = memes
//     .filter((meme: any) => meme.name.toLowerCase().includes(query))
//     .sort((a: any, b: any) => {
//       if (sort === "likes") return b.likes - a.likes;
//       if (sort === "date") return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
//       return 0;
//     });

//   return (
//     <div className="p-6">
//       <h1 className="text-3xl font-bold mb-4">Meme Explorer</h1>

//       {/* Search Input */}
//       <input
//         type="text"
//         placeholder="Search memes..."
//         onChange={(e) => handleSearch(e.target.value)}
//         className="p-2 border rounded w-full mb-4"
//       />

//       {/* Sorting Dropdown */}
//       <select onChange={(e) => setSort(e.target.value)} className="p-2 border rounded mb-4">
//         <option value="new">Newest</option>
//         <option value="likes">Most Liked</option>
//       </select>

//       {/* Meme Grid */}
//       <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
//         {filteredMemes.map((meme: any) => (
//           <MemeCard key={meme.id} meme={meme} />
//         ))}
//       </div>

//       {/* Infinite Scroll Trigger */}
//       <div ref={ref} className="h-10"></div>

//       {loading && <p className="text-center mt-4">Loading memes...</p>}
//     </div>
//   );
// }

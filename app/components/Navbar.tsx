import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="flex justify-between p-4 bg-gray-800 text-white">
      <Link href="/">
        <h1 className="text-2xl font-bold">MemeVerse</h1>
      </Link>
      <div className="flex gap-4">
        <Link href="/explorer">Explore</Link>
        <Link href="/upload">Upload</Link>
        <Link href="/leaderboard">Leaderboard</Link>
        <Link href="/profile">Profile</Link>
      </div>
    </nav>
  );
};

export default Navbar;

import Image from "next/image";

const MemeCard = ({ meme }: { meme: any }) => {
  return (
    <div className="border p-2 rounded-lg shadow hover:scale-105 transition">
      <Image src={meme.url} alt={meme.name} width={200} height={200} className="rounded-md"/>
      <p className="text-center mt-2">{meme.name}</p>
    </div>
  );
};

export default MemeCard;

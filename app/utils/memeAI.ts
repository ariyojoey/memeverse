export const generateMemeCaption = async (imageUrl: string) => {
    const res = await fetch("https://meme-api.com/generate-caption", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ imageUrl }),
    });
  
    const data = await res.json();
    return data.caption || "Funny meme caption!";
  };
  
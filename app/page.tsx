import Navbar from "./components/Navbar";
import Footer from "./components/Footer"

export default function Home() {
  return (
    <html lang="en">
      <body className="bg-white text-black dark:bg-gray-900 dark:text-white">
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-1 flex flex-col items-center justify-center">
            <h1 className="text-4xl font-bold">Welcome to MemeVerse</h1>
            <p className="mt-4">The ultimate meme exploration and sharing platform.</p>
          </main>
          <Footer />
          </div>
      </body>
    </html>
  )
}

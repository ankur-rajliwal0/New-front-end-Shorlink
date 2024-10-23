import { useState } from "react";
import axios from "axios";
import "./App.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [originalUrl, setOriginalUrl] = useState("");
  const [shortUrl, setshortUrl] = useState("");

  async function handleClick() {
    try {
      const response = await axios.post(
        "https://short-link-backend-latest.onrender.com",
        {
          originalUrl,
        }
      );
      console.log(response.data);
      setshortUrl(response.data.shortUrl);
    } catch (error) {
      console.error("There was an error!", error);
    }
  }
  const notify = () => {
    toast(" text Copied ", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  };

  const handlecopy = () => {
    navigator.clipboard.writeText(shortUrl);

    notify("copied");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <ToastContainer />
      <p className="text-3xl font-bold text-gray-800 mb-6">Paste your Link</p>
      <input
        type="text"
        placeholder="Put your link"
        className="border-2 border-gray-300 rounded-md p-3 w-full max-w-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        onChange={(e) => {
          setOriginalUrl(e.target.value);
        }}
      />
      <button
        onClick={handleClick}
        className="bg-blue-500 text-white font-semibold px-6 py-2 rounded-md hover:bg-blue-600 transition duration-200"
      >
        Submit
      </button>
      <div className="mt-8 w-full max-w-lg">
        <div className="bg-gray-800 text-white p-4 rounded-md text-center mb-4">
          {shortUrl ? JSON.stringify(shortUrl) : "No data"}
        </div>
        <button
          className="bg-green-500 text-white font-semibold px-4 py-2 rounded-md hover:bg-green-600 transition duration-200"
          onClick={handlecopy}
        >
          Copy link
        </button>
      </div>
    </div>
  );
}

export default App;

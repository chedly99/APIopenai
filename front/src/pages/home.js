import React, { useState } from "react";
import axios from "axios";
import ParticleBg from "../components/particlesBackground";

function Home() {
  const [inputText, setInputText] = useState("");
  const [generatedText, setGeneratedText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState("");
  // const [wordpress] = useState(
  //   "https://chat-gpt.diginov.tech/wordpress/"
  // );
  const [isSuccess, setIsSuccess] = useState(false);

  const API_URL = `${process.env.REACT_APP_API_BASE_URL}/postMessage`;

  const wordpress = "https://chat-gpt.diginov.tech/wordpress/";
  const instagramLink = `https://www.instagram.com/digi.test112/`;

  const postFb = `https://www.facebook.com/111281045217648/`;

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!inputText.trim()) {
      setGeneratedText("Please ask me something");
      return;
    }

    setIsLoading(true);

    try {
      const response = await axios.post(API_URL, { prompt: inputText });
      console.log(response.data);
      setResult(response.data.result);
      setIsSuccess(true);
    } catch (error) {
      console.error(error);
      setGeneratedText("Error: Could not generate text.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (event) => {
    setInputText(event.target.value);
    setIsSuccess(false);
    setGeneratedText("");
  };

  return (
    <div>
      <ParticleBg className="relative z-[1]" />
      <div className="flex md:flex md:justify-center justify-center items-center h-screen bg-stone-800  ">
        <form className="flex md:w-auto flex-col items-center justify-center  w-5/12  mb-48  p-8 md:p8 rounded-lg shadow-2xl bg-[#282525] z-[1] opacity-80">
          <h1 className="md:text-xl mb-8 text-2xl text-center text-slate-100">
            Ask a Question
          </h1>
          <div className="md:h-full md:w-48 form-group w-full mb-6">
            <label
              htmlFor="input-text"
              className="md:text-base block mb-1 text-lg text-slate-100"
            >
              Enter your text:
            </label>
            <input
              type="text"
              id="input-text"
              name="input-text"
              value={inputText}
              onChange={handleInputChange}
              className="md:h-full md:w-48 form-control w-full px-4 py-2 rounded-lg border border-gray-400"
            />
          </div>
          <button
            type="submit"
            onClick={handleSubmit}
            disabled={isLoading}
            className="md:h-full md:w-40 btn btn-primary w-80 py-2 rounded-lg text-lg text-white bg-[#00a86b] hover:bg-[#008f5b] transition-colors"
          >
            {isLoading ? "Submitting..." : "Submit"}
          </button>
          <p className="text-center my-8 text-lg">
            {isSuccess === true && inputText !== "" ? (
              <div className="bg-green-200 rounded-md p-4">
                <span className="text-blue-800 font-bold">
                  Text published successfully.
                </span>
                <span className="ml-2">View on:</span>
                <a
                  href={postFb}
                  target="_blank"
                  rel="noreferrer"
                  className="underline ml-1"
                >
                  Facebook
                </a>
                <span className="mx-2">,</span>
                <a
                  href={`${wordpress}${result.generated_slug}`}
                  target="_blank"
                  rel="noreferrer"
                  className="underline"
                >
                  WordPress
                </a>
                <span className="mx-2"> and </span>
                <a
                  href={`${instagramLink}`}
                  target="_blank"
                  rel="noreferrer"
                  className="underline"
                >
                  Instagram
                </a>
              </div>
            ) : (
              generatedText
            )}
          </p>
        </form>
      </div>
    </div>
  );
}

export default Home;

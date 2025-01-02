"use client";

import { Button } from "@mui/material";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import ReactMarkdown from "react-markdown";
import Image from "next/image";

export default function Home() {
  const [inputText, setInputText] = useState("");
  const [outputResponse, setOutputResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const sendToOpenAI = async () => {
    setLoading(true);
    const result = await fetch("/api/openai", {
      method: "POST",
      body: JSON.stringify({
        chatMessage: inputText,
      }),
    });

    const response = await result.json();
    console.log("Response:", response);
    setOutputResponse(response?.message);
    setLoading(false);
  };

  return (
    <div>
      <div className="grid grid-cols-1 justify-center text-center mt-4 mb-6">
        <div>
          <span className="font-extrabold">
            Welcome to Metric Coders Animation Scene Generator!
          </span>
        </div>
        <div>
          <span className="italic">
            This tool generates snimation scene using Dall-e-2!
          </span>
        </div>
      </div>
      <div className="grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1">
        <div className="m-2">
          {outputResponse === "" && (
            <span className="justify-center text-center">
              Get your scene here!
            </span>
          )}
           {outputResponse !== "" && <Image
              unoptimized={true}
              src={outputResponse}
              alt="Image..."
              width={512}
              height={512}
            />}
        </div>
        <div className="grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 m-2">
          <div className="m-1">
            <TextField
              id="outlined-basic"
              label="Scene!"
              placeholder="Write your description here!"
              variant="outlined"
              multiline
              fullWidth
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
            />
          </div>
          <div className="text-end m-4">
            <Button
              fullWidth
              onClick={sendToOpenAI}
              variant="contained"
              sx={{
                backgroundColor: "black",
              }}
            >
              Send
            </Button>
          </div>
        </div>

        {loading && (
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundColor: "rgba(0, 0, 0, 0.3)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              zIndex: 1000,
            }}
          >
            <Image
              unoptimized={true}
              src="/loading.gif"
              alt="Loading..."
              width={100}
              height={100}
              style={{ zIndex: 1100 }}
            />
          </div>
        )}
      </div>
    </div>
  );
}

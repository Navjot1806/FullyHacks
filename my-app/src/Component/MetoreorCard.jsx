import React, { useMemo } from "react";
import { Card, CardHeader, CardBody, Image } from "@heroui/react";
import { useEffect, useState } from "react";
// Images must be in /public/images for public access
const meteorImages = [
  "/images/meteor-1.png",
  "/images/meteor-2.png",
  "/images/meteor-3.png",
  "/images/meteor-4.png",
  "/images/meteor-5.png",
];

const MeteoriteCard = ({ meteorite }) => {
  if (!meteorite) return null;

  // Pick a random image on each render
  const imageUrl = useMemo(() => {
    const randomIndex = Math.floor(Math.random() * meteorImages.length);
    return meteorImages[randomIndex];
  }, [meteorite]);

  return (
    <Card className="py-4 bg-[#1c1c1c] text-white border-yellow-500 center mt-4">
      <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
        <h4
          className="font-bold text-yellow-300"
          style={{ fontSize: "1.2rem" }}
        >
          {meteorite.name.toUpperCase()}
        </h4>
      </CardHeader>
      <CardBody className="overflow-visible py-2 space-y-1 text-sm">
        <table className="table-auto text-left w-full">
          <tbody>
            <tr>
              <td className="pr-2 font-semibold text-yellow-200">🌆 City:</td>
              <td>{meteorite.city}</td>
            </tr>
            <tr>
              <td className="pr-2 font-semibold text-yellow-200">📅 Year:</td>
              <td>{meteorite.year}</td>
            </tr>
            <tr>
              <td className="pr-2 font-semibold text-yellow-200">🌠 Mass:</td>
              <td>{meteorite.mass} g</td>
            </tr>
          </tbody>
        </table>

        <Image
          alt="Meteorite"
          className="object-cover rounded-xl mt-4"
          src={imageUrl}
          width={170}
        />
      </CardBody>
    </Card>
  );
};

const TypingText = ({ text }) => {
  const [displayedText, setDisplayedText] = useState("");
  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setDisplayedText((prev) => prev + text.charAt(i));
      i++;
      if (i >= text.length) clearInterval(interval);
    }, 20); // typing speed
    return () => clearInterval(interval);
  }, [text]);

  return (
    <p className="text-yellow-100 text-sm leading-relaxed whitespace-pre-wrap">
      {displayedText}
      <span className="animate-pulse text-yellow-400">|</span>
    </p>
  );
};

export default MeteoriteCard;

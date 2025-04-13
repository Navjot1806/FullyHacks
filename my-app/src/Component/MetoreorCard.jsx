import React, { useMemo } from "react";
import { Card, CardHeader, CardBody, Image } from "@heroui/react";

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
    <Card className="py-4 bg-[#1c1c1c] text-white border-yellow-500">
      <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
        <p className="text-tiny uppercase font-bold text-yellow-400">
          Meteorite Details
        </p>
        <small className="text-default-500">Impact Data</small>
        <h4 className="font-bold text-large text-yellow-300">
          {meteorite.name}
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
          width={270}
        />
      </CardBody>
    </Card>
  );
};

export default MeteoriteCard;

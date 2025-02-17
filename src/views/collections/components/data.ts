import Img1 from "../../../../public/img-1.webp";
import Img2 from "../../../../public/img-2.webp";
import Img3 from "../../../../public/img-3.webp";
import Img4 from "../../../../public/img-4.webp";
import Img5 from "../../../../public/img-5.webp";
import Img6 from "../../../../public/img-6.webp";
import Img7 from "../../../../public/img-7.webp";
import Img8 from "../../../../public/img-8.webp";
import Img9 from "../../../../public/img-9.webp";
import Img10 from "../../../../public/img-10.jpg";
import { StaticImageData } from "next/image";

function getRandomValues(arr: StaticImageData[], num = 7) {
  if (arr.length < num || typeof window === "undefined")
    throw new Error("Array has fewer elements than requested");

  return arr.sort(() => Math.random() - 0.5).slice(0, num);
}

const picArray = [Img1, Img2, Img3, Img4, Img5, Img6, Img7, Img8, Img9, Img10];

export const collectionsData = [
  {
    name: "Frame & Focus",
    value: getRandomValues(picArray),
    subText:
      "A curated selection of moments that capture light, shadow, and emotion in perfect harmony.",
  },
  {
    name: "Captured Essence",
    value: getRandomValues(picArray),
    subText:
      "A visual journey showcasing the soul of people, places, and fleeting moments.",
  },
  {
    name: "Still Stories",
    value: getRandomValues(picArray),
    subText:
      "Every image tells a story, frozen in time, waiting to be unraveled.",
  },
  {
    name: "The Visual Vault",
    value: getRandomValues(picArray),
    subText:
      "A treasure trove of striking imagery, each frame holding a unique perspective.",
  },
  {
    name: "Light & Shadow Chronicles",
    value: getRandomValues(picArray),
    subText:
      "A play of contrast, depth, and emotion through the lens of artistic vision.",
  },
];

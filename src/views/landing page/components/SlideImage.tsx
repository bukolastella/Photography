import Image, { StaticImageData } from "next/image";
import React, { FC } from "react";

interface Props {
  xOrigin: number;
  yOrigin: number;
  img: StaticImageData;
  span: string;
}

const SlideImage: FC<Props> = ({ xOrigin, yOrigin, img, span }) => {
  return (
    <div
      className={`relative slide-image ${span}`}
      data-xorigin={xOrigin}
      data-yorigin={yOrigin}
    >
      <Image fill src={img} alt="" className="object-cover" />
    </div>
  );
};

export default SlideImage;

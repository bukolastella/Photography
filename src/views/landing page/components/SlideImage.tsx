import Image, { StaticImageData } from "next/image";
import React, { FC } from "react";

interface Props {
  xOrigin: number;
  yOrigin: number;
  img: StaticImageData;
  span: string;
  sizes: string;
}

const SlideImage: FC<Props> = ({ xOrigin, yOrigin, img, span, sizes }) => {
  return (
    <div
      className={`relative slide-image ${span}`}
      data-xorigin={xOrigin}
      data-yorigin={yOrigin}
    >
      <Image fill src={img} alt="" className="object-cover" sizes={sizes} />
    </div>
  );
};

export default SlideImage;

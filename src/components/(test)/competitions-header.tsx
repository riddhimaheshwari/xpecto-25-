import React from "react";
import MarqueeContainer from "@/components/(dystopian)/common/marquee-container";
import Image from "next/image";
import BgImage from "public/images/transparent-bg.png";

const CompetitionsHeader = () => {
  return (
    <div className="relative flex h-full w-full flex-row gap-0 bg-neutral-900">
      <Image
        src={BgImage}
        alt={"Bg Image"}
        className="absolute left-0 top-0 h-full w-full object-cover object-center"
      />
      <div className="absolute left-0 top-[126px] flex h-16 w-screen flex-col justify-center overflow-clip border-2 border-amber-50 bg-neutral-900 text-3xl font-light uppercase md:top-0 md:w-[100vh] md:-translate-x-[calc(50%-32px)] md:translate-y-[calc(50vh-32px)] md:-rotate-90">
        <MarqueeContainer
          text={[
            "Competitions",
            "xpecto '25",
            "iit mandi",
            "Competitions",
            "xpecto '25",
            "iit mandi",
            "Competitions",
            "xpecto '25",
            "iit mandi",
          ]}
        />
      </div>
    </div>
  );
};

export default CompetitionsHeader;

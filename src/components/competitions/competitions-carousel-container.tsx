import React, {
  Dispatch,
  type ReactNode,
  SetStateAction,
  useContext,
} from "react";
import Image from "next/image";
import MarqueeContainer from "@/components/common/marquee-container";
import type { CompetitionWithDetails } from "@/app/types";
import BgImage from "public/images/background.jpg";
import { CursorContext } from "@/context/cursor-context";
import { ChevronsDown, ChevronsUp } from "lucide-react";

interface Props {
  children: ReactNode;
  data?: CompetitionWithDetails;
  index: number;
  setIndex: Dispatch<SetStateAction<number>>;
  length: number;
}

const CompetitionsCarouselContainer = ({
  children,
  data,
  index,
  setIndex,
  length,
}: Props) => {
  const { setIsHovered } = useContext(CursorContext);

  return (
    <div className="relative z-0 grid h-full w-full grid-rows-[56px_auto_56px] bg-neutral-900 pt-[126px] md:grid-cols-[64px_auto_64px] md:grid-rows-1 md:pt-0 lg:grid-cols-[56px_auto_56px]">
      <Image
        src={BgImage}
        width={1920}
        height={1080}
        alt={"Background"}
        className="absolute left-0 top-0 -z-10 h-full w-full object-cover object-bottom opacity-10"
      />
      <div className="relative h-full w-full">
        <div className="absolute left-0 top-0 flex h-14 w-screen flex-col justify-center overflow-clip border-2 border-amber-50 bg-neutral-900 text-2xl font-light uppercase md:top-1 md:h-16 md:w-[100vh] md:-translate-x-[calc(50%-32px)] md:translate-y-[calc(50vh-32px)] md:-rotate-90 md:text-3xl lg:h-14 lg:text-2xl">
          <MarqueeContainer
            text={[
              "competitions",
              "xpecto '25",
              "32 to 56 march 2025",
              "iit mandi",
              "competitions",
              "xpecto '25",
              "32 to 56 march 2025",
              "iit mandi",
            ]}
          />
        </div>
      </div>
      <div className="relative h-full w-full">{children}</div>
      <div className="relative h-full w-full">
        <div className="absolute left-0 top-0 flex h-14 w-screen flex-col justify-center overflow-clip border-2 border-amber-50 bg-neutral-900 text-2xl font-light uppercase md:top-1 md:h-16 md:w-[100vh] md:-translate-x-[calc(50%-32px)] md:translate-y-[calc(50vh-32px)] md:rotate-90 md:text-3xl lg:left-[-4px] lg:h-14 lg:text-2xl">
          <MarqueeContainer
            text={
              data
                ? [
                    data.competitionDetails.name,
                    data.competitionDetails.begin_time.toLocaleString() +
                      " to " +
                      data.competitionDetails.end_time.toLocaleString(),
                    data.competitionDetails.venue,
                    data.competitionDetails.name,
                    data.competitionDetails.begin_time.toLocaleString() +
                      " to " +
                      data.competitionDetails.end_time.toLocaleString(),
                    data.competitionDetails.venue,
                  ]
                : [
                    "unknown event",
                    "event timeline ruptured",
                    "critical error",
                    "rendezvous location unidentified",
                    "critical error",
                    "unknown event",
                    "event timeline ruptured",
                    "critical error",
                  ]
            }
          />
        </div>
      </div>
      <div
        className="absolute left-1/2 top-40 z-40 hidden h-12 w-12 -translate-x-1/2 cursor-none items-center justify-center border-2 border-amber-50 bg-neutral-950 text-amber-50 md:flex"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => setIndex((index + length - 1) % length)}
      >
        <ChevronsUp size={24} />
      </div>
      <div
        className="absolute bottom-5 left-1/2 z-40 hidden h-12 w-12 -translate-x-1/2 cursor-none items-center justify-center border-2 border-amber-50 bg-neutral-950 text-amber-50 md:flex"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => setIndex((index + 1) % length)}
      >
        <ChevronsDown size={24} />
      </div>
    </div>
  );
};

export default CompetitionsCarouselContainer;

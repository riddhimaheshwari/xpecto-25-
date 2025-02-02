import React, { useContext, useEffect, useState } from "react";
import { useCurrentUser } from "@/lib/utils";
import type { WorkshopWithDetails } from "@/app/types";
import { Share_Tech } from "next/font/google";
import Image from "next/image";
import { CursorContext } from "@/context/cursor-context";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import MarqueeContainer from "@/components/(dystopian)/common/marquee-container";
import RegisterDialog from "@/components/(dystopian)/common/registration-dialog";
//import CreateTeamDialog from "@/components/(dystopian)/competitions/create-team-dialog";
import MissionBrief from "@/components/(dystopian)/competitions/mission-briefing";
//import CompTeamBox from "@/components/(dystopian)/competitions/competition-team-box";
import { api } from "@/trpc/react";

const sharetech = Share_Tech({ weight: "400", subsets: ["latin"] });

const CompetitionDetailsBox = ({ comp }: { comp:  WorkshopWithDetails }) => {
  const { CurrentUser } = useCurrentUser();

  const { setIsHovered } = useContext(CursorContext);

  const [regPrice, setRegPrice] = useState(0);
  const [regPlanId, setRegPlanId] = useState("");

  const { data: plan, isLoading: isRegistrationLoading } =
    api.event.checkUserRegisteration.useQuery(
      {
        userId: CurrentUser?.id ?? "",
        eventId: comp?.workshopDetailsId ?? "",
      },
      {
        enabled: !!CurrentUser && !!comp,
      },
    );
  // const { data: regTeam } = api.team.findTeamOfUser.useQuery(
  //   {
  //     userId: CurrentUser?.id ?? "",
  //     competitionId: comp?.id ?? "",
  //   },
  //   {
  //     enabled: !!CurrentUser && !!comp,
  //   },
  // );

  const regStatus = !!plan;

  useEffect(() => {
    setRegPrice(comp?.workshopDetails.regPlans[0]?.price ?? 0);
    setRegPlanId(comp?.workshopDetails.regPlans[0]?.id ?? "");
  }, [comp]);

  //TODO: Add more comp details on the page. I have just added the basic ones

  return (
    <>
      <div className="relative flex h-full w-full flex-col items-start overflow-y-scroll overscroll-none bg-neutral-900 md:flex-row">
        <Image
          src={
            // comp.competitionDetails.cover ??
            `https://res.cloudinary.com/diqdg481x/image/upload/v1737737280/signin_iiaec7.jpg`
          }
          alt={comp.workshopDetails.name}
          width={500}
          height={1080}
          className="sticky top-0 h-96 w-full shrink border-2 border-t-0 border-amber-50 object-cover md:h-screen md:w-[300px] md:border-l-0 md:border-t-2 lg:w-[400px]"
        />
        <div className="relative shrink-0 md:h-screen md:w-full md:max-w-[calc(100vw-364px)] lg:max-w-[calc(100vw-464px)]">
          <div className="space-y-5 overflow-scroll overscroll-none p-12 md:pt-28">
            <div className="-mb-2.5 flex flex-wrap gap-2.5">
              <div className="rounded-full bg-neutral-600 px-5 py-1 text-base uppercase text-amber-50">
                programming
              </div>
              <div className="rounded-full bg-neutral-600 px-5 py-1 text-base uppercase text-amber-50">
                ml/ai
              </div>
            </div>
            <div className="text-6xl font-semibold uppercase tracking-wider lg:text-7xl lg:font-bold xl:text-8xl">
              {comp.workshopDetails.name}
            </div>
            <div
              className={`${sharetech.className} max-w-screen-lg text-base tracking-tight text-amber-50 lg:text-lg`}
            >
              {comp.workshopDetails.description}
            </div>
            <div className="grid w-full max-w-screen-xl grid-cols-1 gap-5 pt-12 xl:grid-cols-[50%_auto]">
              <MissionBrief />
              {isRegistrationLoading && (
                <div className="loading h-full w-full border-2 border-amber-50"></div>
              )}
              {/* {regStatus && <CompTeamBox regTeam={regTeam} comp={comp} />} should i do the regPerson instead of regTeam? */}
              
            </div>
          </div>
          <div className="relative h-12 w-full bg-neutral-900">
            {regStatus ? (
              !CurrentUser       //&& <CreateTeamDialog competitionId={comp.id} />// need to create a regUser && regUser 
            ) : (
              <RegisterDialog
                trigger={
                  <button
                    className="w-full cursor-none overflow-clip"
                    disabled={CurrentUser?.email === ""}
                    onMouseEnter={() => {
                      if (CurrentUser?.email !== "") setIsHovered(true);
                    }}
                    onMouseLeave={() => setIsHovered(false)}
                  >
                    <div
                      className={`absolute bottom-0 flex h-12 w-full cursor-none items-center overflow-clip border-2 border-amber-50 bg-amber-50/[0.7] text-2xl uppercase text-neutral-900 md:border-l-0`}
                    >
                      <MarqueeContainer
                        text={[
                          `register for ${comp.workshopDetails.name}`,
                          CurrentUser?.email === ""
                            ? "login required to register"
                            : `register for ${comp.workshopDetails.name}`,
                          `register for ${comp.workshopDetails.name}`,
                          CurrentUser?.email === ""
                            ? "login required to register"
                            : `register for ${comp.workshopDetails.name}`,
                        ]}
                      />
                    </div>
                  </button>
                }
                content={
                  <RadioGroup
                    onValueChange={(e) => {
                      setRegPlanId(e.split(" ")[1]!);
                      setRegPrice(parseInt(e.split(" ")[0]!));
                    }}
                    defaultValue={
                      (comp.workshopDetails.regPlans[0]?.price.toString() ??
                        "") +
                      " " +
                      (comp.workshopDetails.regPlans[0]?.id ?? "")
                    }
                  >
                    {comp.workshopDetails.regPlans.map((reg) => {
                      return (
                        <div
                          key={reg.id}
                          className="mb-2 flex items-center gap-2 px-5"
                        >
                          <RadioGroupItem
                            className="h-8 w-8 rounded-none bg-amber-50/[0.5]"
                            value={reg.price.toString() + " " + reg.id}
                            key={reg.id}
                          />
                          <Label
                            htmlFor={reg.id}
                            className="flex w-full flex-col p-2"
                          >
                            <div className="flex items-center gap-2">
                              <div className="text-xl font-normal uppercase">
                                {reg.name} - ₹{reg.price}
                              </div>
                              <div className="rounded-full bg-gray-500 px-2 py-0.5 text-sm font-light uppercase">
                                {/* //TODO: Make labelling as a border wrapper. So that it looks premium */}
                                {reg.labelling}
                              </div>
                            </div>
                            <div
                              className={`${sharetech.className} mt-1 text-base tracking-tight`}
                            >
                              {reg.description}
                            </div>
                          </Label>
                        </div>
                      );
                    })}
                  </RadioGroup>
                }
                price={regPrice}
                regPlanId={regPlanId}
                eventId={comp.workshopDetails.id}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default CompetitionDetailsBox;

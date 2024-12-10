import { AnswerByLevelChart } from "@/app/(manager)/dashboard/AnswerByLevelChart";
import { WeeklyAnswerRateChart } from "@/app/(manager)/dashboard/WeeklyAnswerRateChart";
import { WeeklyPVPLeaderChart } from "@/app/(manager)/dashboard/WeeklyPVPLeaderChart";

export default function DashboardPage() {
  return (
    <div className="flex flex-col h-full">
      <div className="flex flex-row h-min">
        <div className="h-fit">
          <AnswerByLevelChart />
        </div>
        <div className="h-fit">
          <WeeklyAnswerRateChart />
        </div>
      </div>
      <div className="h-1/2 flex-1">
        <WeeklyPVPLeaderChart />
      </div>
    </div>
  );
  // return (
  //   <div className="grid grid-cols-2 grid-rows-2 gap-4 h-full">
  //     <div className="h-fit">
  //       <AnswerByLevelChart />
  //     </div>
  //     <div className="h-fit">
  //       <WeeklyAnswerRateChart />
  //     </div>
  //     <div className="h-1/2">
  //       <WeeklyPVPLeaderChart />
  //     </div>
  //   </div>
  // );
}

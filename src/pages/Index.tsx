import Timetable from "@/components/Timetable";
import { MadeWithDyad } from "@/components/made-with-dyad";

const Index = () => {
  return (
    <div className="container mx-auto p-4 sm:p-6 md:p-8 print:p-0">
      <Timetable />
      <div className="print:hidden">
        <MadeWithDyad />
      </div>
    </div>
  );
};

export default Index;
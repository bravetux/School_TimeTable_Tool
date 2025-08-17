import Timetable from "@/components/Timetable";
import { MadeWithDyad } from "@/components/made-with-dyad";

const Index = () => {
  return (
    <div className="container mx-auto p-4 sm:p-6 md:p-8">
      <Timetable />
      <MadeWithDyad />
    </div>
  );
};

export default Index;
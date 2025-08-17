import Timetable from "@/components/Timetable";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="container mx-auto p-4 sm:p-6 md:p-8 print:p-0">
      <Timetable />
      <Footer />
    </div>
  );
};

export default Index;
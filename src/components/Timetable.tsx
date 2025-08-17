import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const schedule = [
  { period: "Prayer", startTime: "9:00 AM", endTime: "9:20 AM", type: 'event' },
  { period: 1, startTime: "9:20 AM", endTime: "10:05 AM", type: 'class' },
  { period: 2, startTime: "10:05 AM", endTime: "10:50 AM", type: 'class' },
  { period: 3, startTime: "10:50 AM", endTime: "11:35 AM", type: 'class' },
  { period: 4, startTime: "11:35 AM", endTime: "12:20 PM", type: 'class' },
  { period: "Lunch", startTime: "12:20 PM", endTime: "1:20 PM", type: 'break' },
  { period: 5, startTime: "1:20 PM", endTime: "2:05 PM", type: 'class' },
  { period: 6, startTime: "2:05 PM", endTime: "2:50 PM", type: 'class' },
  { period: 7, startTime: "2:50 PM", endTime: "3:30 PM", type: 'class' },
  { period: 8, startTime: "3:30 PM", endTime: "4:10 PM", type: 'class' },
];

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

const timetableData: { [key: string]: string[] } = {
  Monday: ["Math", "Science", "English", "History", "Art", "Music", "P.E.", "Library"],
  Tuesday: ["Science", "Math", "History", "English", "P.E.", "Library", "Art", "Music"],
  Wednesday: ["English", "History", "Math", "Science", "Music", "Art", "Library", "P.E."],
  Thursday: ["History", "English", "Science", "Math", "Library", "P.E.", "Music", "Art"],
  Friday: ["P.E.", "Library", "Art", "Music", "Math", "Science", "English", "History"],
};

const Timetable = () => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-center text-2xl">Weekly School Timetable</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="font-bold min-w-[150px]">Time / Day</TableHead>
                {days.map((day) => (
                  <TableHead key={day} className="text-center font-bold min-w-[120px]">{day}</TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {schedule.map((slot, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">
                    <div>{`${slot.startTime} - ${slot.endTime}`}</div>
                    <div className="text-sm text-muted-foreground">
                      {typeof slot.period === 'number' ? `Period ${slot.period}` : slot.period}
                    </div>
                  </TableCell>
                  {slot.type === 'class' ? (
                    days.map((day) => {
                      const dataIndex = (slot.period as number) - 1;
                      const subject = timetableData[day][dataIndex] || "";
                      return (
                        <TableCell key={day} className="text-center">
                          {subject}
                        </TableCell>
                      );
                    })
                  ) : (
                    <TableCell colSpan={days.length} className="text-center font-semibold bg-secondary">
                      {slot.period}
                    </TableCell>
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default Timetable;
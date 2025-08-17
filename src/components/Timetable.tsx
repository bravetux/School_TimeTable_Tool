"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Printer } from "lucide-react";

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

const initialTimetableData: { [key: string]: string[] } = {
  Monday: ["Math", "Science", "English", "History", "Art", "Music", "P.E.", "Library"],
  Tuesday: ["Science", "Math", "History", "English", "P.E.", "Library", "Art", "Music"],
  Wednesday: ["English", "History", "Math", "Science", "Music", "Art", "Library", "P.E."],
  Thursday: ["History", "English", "Science", "Math", "Library", "P.E.", "Music", "Art"],
  Friday: ["P.E.", "Library", "Art", "Music", "Math", "Science", "English", "History"],
};

const Timetable = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [timetableData, setTimetableData] = useState(initialTimetableData);

  const handleSubjectChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    day: string,
    periodIndex: number
  ) => {
    const newTimetableData = { ...timetableData };
    newTimetableData[day] = [...newTimetableData[day]];
    newTimetableData[day][periodIndex] = e.target.value;
    setTimetableData(newTimetableData);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <Card className="w-full print:shadow-none print:border-none">
      <CardHeader className="flex flex-row items-center justify-between print:hidden">
        <CardTitle className="text-2xl">Weekly School Timetable</CardTitle>
        <div className="flex items-center gap-2">
          <Button onClick={() => setIsEditing(!isEditing)}>
            {isEditing ? "Save" : "Edit"}
          </Button>
          <Button variant="outline" onClick={handlePrint}>
            <Printer className="mr-2 h-4 w-4" />
            Print
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="hidden print:block text-center mb-4">
          <h1 className="text-2xl font-bold">Weekly School Timetable</h1>
        </div>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="font-bold min-w-[150px] p-2 print:p-1 print:text-sm">Time / Day</TableHead>
                {days.map((day) => (
                  <TableHead key={day} className="text-center font-bold min-w-[120px] p-2 print:p-1 print:text-sm">{day}</TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {schedule.map((slot) => (
                <TableRow key={typeof slot.period === 'number' ? `period-${slot.period}` : slot.period}>
                  <TableCell className="font-medium p-2 print:p-1 print:text-sm">
                    <div>{`${slot.startTime} - ${slot.endTime}`}</div>
                    <div className="text-sm text-muted-foreground print:text-xs">
                      {typeof slot.period === 'number' ? `Period ${slot.period}` : slot.period}
                    </div>
                  </TableCell>
                  {slot.type === 'class' ? (
                    days.map((day) => {
                      const dataIndex = (slot.period as number) - 1;
                      const subject = timetableData[day][dataIndex] || "";
                      return (
                        <TableCell key={day} className="text-center p-2 print:p-1 print:text-sm">
                          {isEditing ? (
                            <Input
                              type="text"
                              value={subject}
                              onChange={(e) => handleSubjectChange(e, day, dataIndex)}
                              className="text-center h-8 print:border-none print:p-0 print:h-auto"
                            />
                          ) : (
                            <span>{subject}</span>
                          )}
                        </TableCell>
                      );
                    })
                  ) : (
                    <TableCell colSpan={days.length} className="text-center font-semibold bg-secondary p-2 print:p-1 print:text-sm">
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
"use client";

import { useState, useEffect } from "react";
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
import { Printer, Settings } from "lucide-react";
import { SettingsPanel } from "./SettingsPanel";
import { generateSchedule, ScheduleSlot, ScheduleSettings } from "@/lib/scheduleGenerator";

const initialSettings: ScheduleSettings = {
  prayerStartTime: "9:00 AM",
  prayerDuration: 20,
  schoolStartTime: "9:20 AM",
  numberOfPeriods: 8,
  uniformPeriodDuration: 45,
  useVariation: true,
  lastPeriodsCount: 2,
  lastPeriodDuration: 40,
  breaks: [
    { id: 'lunch', name: 'Lunch', startTime: '12:20 PM', endTime: '1:20 PM', enabled: true },
    { id: 'break1', name: 'Short Break 1', startTime: '10:50 AM', endTime: '11:05 AM', enabled: false },
    { id: 'break2', name: 'Short Break 2', startTime: '2:50 PM', endTime: '3:05 PM', enabled: false },
  ],
};

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

const initialTimetableData = (numPeriods: number) => {
  const base = {
    Monday: ["Math", "Science", "English", "History", "Art", "Music", "P.E.", "Library"],
    Tuesday: ["Science", "Math", "History", "English", "P.E.", "Library", "Art", "Music"],
    Wednesday: ["English", "History", "Math", "Science", "Music", "Art", "Library", "P.E."],
    Thursday: ["History", "English", "Science", "Math", "Library", "P.E.", "Music", "Art"],
    Friday: ["P.E.", "Library", "Art", "Music", "Math", "Science", "English", "History"],
  };
  // Ensure the data array is long enough for the number of periods
  for (const day in base) {
    while (base[day as keyof typeof base].length < numPeriods) {
      base[day as keyof typeof base].push("-");
    }
  }
  return base;
};

const Timetable = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [settings, setSettings] = useState<ScheduleSettings>(initialSettings);
  const [schedule, setSchedule] = useState<ScheduleSlot[]>([]);
  const [timetableData, setTimetableData] = useState(initialTimetableData(settings.numberOfPeriods));
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  useEffect(() => {
    const newSchedule = generateSchedule(settings);
    setSchedule(newSchedule);
    setTimetableData(initialTimetableData(settings.numberOfPeriods));
  }, [settings]);

  const handleSubjectChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    day: string,
    periodIndex: number
  ) => {
    const newTimetableData = { ...timetableData };
    newTimetableData[day as keyof typeof timetableData] = [...newTimetableData[day as keyof typeof timetableData]];
    newTimetableData[day as keyof typeof timetableData][periodIndex] = e.target.value;
    setTimetableData(newTimetableData);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <>
      <Card className="w-full print:shadow-none print:border-none">
        <CardHeader className="flex flex-row items-center justify-between print:hidden bg-slate-100 p-4 rounded-t-lg">
          <CardTitle className="text-2xl text-slate-800">Weekly School Timetable</CardTitle>
          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={() => setIsSettingsOpen(true)}>
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </Button>
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
                <TableRow className="bg-sky-100">
                  <TableHead className="font-bold min-w-[150px] p-2 print:p-1 print:text-xs">Time / Day</TableHead>
                  {days.map((day) => (
                    <TableHead key={day} className="text-center font-bold min-w-[120px] p-2 print:p-1 print:text-xs">{day}</TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {schedule.map((slot, slotIndex) => {
                  const classPeriods = schedule.filter(s => s.type === 'class');
                  const isEvenClassRow = classPeriods.findIndex(p => p.period === slot.period) % 2 === 0;

                  const rowColor =
                    slot.type === 'break' ? 'bg-green-50' :
                    slot.type === 'event' ? 'bg-yellow-50' :
                    isEvenClassRow ? 'bg-white' : 'bg-slate-50';

                  return (
                    <TableRow key={slotIndex} className={rowColor}>
                      <TableCell className="font-medium p-2 print:py-0.5 print:px-1 print:text-xs">
                        <div>{`${slot.startTime} - ${slot.endTime}`}</div>
                        <div className="text-sm text-muted-foreground print:text-xs">
                          {slot.type === 'class' ? `Period ${slot.period}` : slot.period}
                        </div>
                      </TableCell>
                      {slot.type === 'class' ? (
                        days.map((day) => {
                          const currentClassIndex = classPeriods.findIndex(p => p.period === slot.period);
                          const subject = timetableData[day as keyof typeof timetableData][currentClassIndex] || "";
                          return (
                            <TableCell key={day} className="text-center p-2 print:py-0.5 print:px-1 print:text-xs">
                              {isEditing ? (
                                <Input
                                  type="text"
                                  value={subject}
                                  onChange={(e) => handleSubjectChange(e, day, currentClassIndex)}
                                  className="text-center h-8 print:border-none print:p-0 print:h-auto bg-transparent"
                                />
                              ) : (
                                <span>{subject}</span>
                              )}
                            </TableCell>
                          );
                        })
                      ) : (
                        <TableCell colSpan={days.length} className="text-center font-semibold p-2 print:py-0.5 print:px-1 print:text-xs">
                          {slot.period}
                        </TableCell>
                      )}
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
      <SettingsPanel
        isOpen={isSettingsOpen}
        setIsOpen={setIsSettingsOpen}
        settings={settings}
        setSettings={setSettings}
      />
    </>
  );
};

export default Timetable;
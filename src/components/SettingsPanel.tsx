"use client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Trash2, Plus } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ScheduleSlot {
  period: string | number;
  startTime: string;
  endTime: string;
  type: 'class' | 'break' | 'event';
}

interface SettingsPanelProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  schedule: ScheduleSlot[];
  setSchedule: (schedule: ScheduleSlot[]) => void;
}

export const SettingsPanel = ({
  isOpen,
  setIsOpen,
  schedule,
  setSchedule,
}: SettingsPanelProps) => {
  const handleScheduleChange = (
    index: number,
    field: keyof ScheduleSlot,
    value: string
  ) => {
    const newSchedule = [...schedule];
    newSchedule[index] = { ...newSchedule[index], [field]: value };
    setSchedule(newSchedule);
  };

  const addSlot = () => {
    setSchedule([
      ...schedule,
      { period: "", startTime: "", endTime: "", type: "class" },
    ]);
  };

  const removeSlot = (index: number) => {
    const newSchedule = schedule.filter((_, i) => i !== index);
    setSchedule(newSchedule);
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetContent className="w-full sm:max-w-md flex flex-col">
        <SheetHeader>
          <SheetTitle>Timetable Settings</SheetTitle>
          <SheetDescription>
            Add, remove, or edit time slots for your weekly schedule.
          </SheetDescription>
        </SheetHeader>
        <ScrollArea className="flex-grow pr-4">
          <div className="space-y-4 py-4">
            {schedule.map((slot, index) => (
              <div key={index} className="p-4 border rounded-md space-y-2 relative">
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-2 right-2 h-6 w-6"
                  onClick={() => removeSlot(index)}
                >
                  <Trash2 className="h-4 w-4" />
                  <span className="sr-only">Remove slot</span>
                </Button>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <Label htmlFor={`period-${index}`}>Period/Name</Label>
                    <Input
                      id={`period-${index}`}
                      value={String(slot.period)}
                      onChange={(e) =>
                        handleScheduleChange(index, "period", e.target.value)
                      }
                    />
                  </div>
                  <div>
                    <Label htmlFor={`type-${index}`}>Type</Label>
                    <Select
                      value={slot.type}
                      onValueChange={(value) =>
                        handleScheduleChange(index, "type", value)
                      }
                    >
                      <SelectTrigger id={`type-${index}`}>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="class">Class</SelectItem>
                        <SelectItem value="break">Break</SelectItem>
                        <SelectItem value="event">Event</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <Label htmlFor={`startTime-${index}`}>Start Time</Label>
                    <Input
                      id={`startTime-${index}`}
                      value={slot.startTime}
                      onChange={(e) =>
                        handleScheduleChange(index, "startTime", e.target.value)
                      }
                    />
                  </div>
                  <div>
                    <Label htmlFor={`endTime-${index}`}>End Time</Label>
                    <Input
                      id={`endTime-${index}`}
                      value={slot.endTime}
                      onChange={(e) =>
                        handleScheduleChange(index, "endTime", e.target.value)
                      }
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
        <SheetFooter className="mt-auto pt-4 border-t">
          <div className="flex justify-between w-full">
            <Button variant="outline" onClick={addSlot}>
              <Plus className="mr-2 h-4 w-4" />
              Add Slot
            </Button>
            <Button onClick={() => setIsOpen(false)}>Done</Button>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};
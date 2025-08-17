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
import { Trash2 } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import type { ScheduleSettings, Break } from "@/lib/scheduleGenerator";

interface SettingsPanelProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  settings: ScheduleSettings;
  setSettings: (settings: ScheduleSettings) => void;
}

export const SettingsPanel = ({
  isOpen,
  setIsOpen,
  settings,
  setSettings,
}: SettingsPanelProps) => {
  const handleSettingChange = (field: keyof ScheduleSettings, value: any) => {
    setSettings({ ...settings, [field]: value });
  };

  const handleBreakChange = (index: number, field: keyof Break, value: any) => {
    const newBreaks = [...settings.breaks];
    newBreaks[index] = { ...newBreaks[index], [field]: value };
    setSettings({ ...settings, breaks: newBreaks });
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetContent className="w-full sm:max-w-lg flex flex-col">
        <SheetHeader>
          <SheetTitle>Timetable Settings</SheetTitle>
          <SheetDescription>
            Configure the rules to automatically generate the timetable.
          </SheetDescription>
        </SheetHeader>
        <ScrollArea className="flex-grow pr-6">
          <div className="space-y-6 py-4">
            {/* General Settings */}
            <div className="space-y-4 p-4 border rounded-md">
              <h4 className="font-semibold">General</h4>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Prayer Start Time</Label>
                  <Input type="text" value={settings.prayerStartTime} onChange={e => handleSettingChange('prayerStartTime', e.target.value)} />
                </div>
                <div>
                  <Label>Prayer Duration (min)</Label>
                  <Input type="number" value={settings.prayerDuration} onChange={e => handleSettingChange('prayerDuration', parseInt(e.target.value) || 0)} />
                </div>
                <div>
                  <Label>School Start Time</Label>
                  <Input type="text" value={settings.schoolStartTime} onChange={e => handleSettingChange('schoolStartTime', e.target.value)} />
                </div>
                <div>
                  <Label>Periods per Day</Label>
                  <Input type="number" value={settings.numberOfPeriods} onChange={e => handleSettingChange('numberOfPeriods', parseInt(e.target.value) || 0)} />
                </div>
              </div>
            </div>

            {/* Period Duration Settings */}
            <div className="space-y-4 p-4 border rounded-md">
              <h4 className="font-semibold">Period Durations</h4>
              <div>
                <Label>Uniform Duration (min)</Label>
                <Input type="number" value={settings.uniformPeriodDuration} onChange={e => handleSettingChange('uniformPeriodDuration', parseInt(e.target.value) || 0)} />
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="variation-switch" checked={settings.useVariation} onCheckedChange={checked => handleSettingChange('useVariation', checked)} />
                <Label htmlFor="variation-switch">Use varied duration for last periods</Label>
              </div>
              {settings.useVariation && (
                <div className="grid grid-cols-2 gap-4 pt-2">
                  <div>
                    <Label>Last Periods Count</Label>
                    <Input type="number" value={settings.lastPeriodsCount} onChange={e => handleSettingChange('lastPeriodsCount', parseInt(e.target.value) || 0)} />
                  </div>
                  <div>
                    <Label>Duration (min)</Label>
                    <Input type="number" value={settings.lastPeriodDuration} onChange={e => handleSettingChange('lastPeriodDuration', parseInt(e.target.value) || 0)} />
                  </div>
                </div>
              )}
            </div>

            {/* Breaks Settings */}
            <div className="space-y-4 p-4 border rounded-md">
              <h4 className="font-semibold">Breaks</h4>
              {settings.breaks.map((breakItem, index) => (
                <div key={breakItem.id} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <Input className="font-semibold text-lg border-none p-0 h-auto" value={breakItem.name} onChange={e => handleBreakChange(index, 'name', e.target.value)} />
                    <Switch checked={breakItem.enabled} onCheckedChange={checked => handleBreakChange(index, 'enabled', checked)} />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Start Time</Label>
                      <Input type="text" value={breakItem.startTime} onChange={e => handleBreakChange(index, 'startTime', e.target.value)} disabled={!breakItem.enabled} />
                    </div>
                    <div>
                      <Label>End Time</Label>
                      <Input type="text" value={breakItem.endTime} onChange={e => handleBreakChange(index, 'endTime', e.target.value)} disabled={!breakItem.enabled} />
                    </div>
                  </div>
                  {index < settings.breaks.length - 1 && <Separator className="mt-4" />}
                </div>
              ))}
            </div>
          </div>
        </ScrollArea>
        <SheetFooter className="mt-auto pt-4 border-t">
          <Button onClick={() => setIsOpen(false)} className="w-full">Done</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};
"use client";

import {
  deleteAvailability,
  setAvailability,
  updateAvailability,
} from "@/actions/availability.action";
import { getTutorProfile } from "@/actions/tutor.action";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { convertInto12h } from "@/helpers/convertInto12h";
import { AvailabilityType, UpdateAvailabilityType } from "@/types";
import { useForm } from "@tanstack/react-form";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import * as z from "zod";
import { CalendarDays, CalendarPlus2, Clock3 } from "lucide-react";

const AvailabilitySchema = z.object({
  dayOfWeek: z.number().min(0).max(6),
  startTime: z.string(),
  endTime: z.string(),
});

const daysWithNumber: { [key: number]: string } = {
  0: "Sunday",
  1: "Monday",
  2: "Tuesday",
  3: "Wednesday",
  4: "Thursday",
  5: "Friday",
  6: "Saturday",
};

export default function TutorAvailabilityPage() {
  const [availabilities, setAvailabilities] = useState<AvailabilityType[]>([]);
  const [mounted, setMounted] = useState(false);
  const [editingSlot, setEditingSlot] = useState<UpdateAvailabilityType | null>(
    null,
  );

  const loadAvailabilities = async () => {
    const response = await getTutorProfile();

    if (response?.data) setAvailabilities(response.data.availability);
  };

  useEffect(() => {
    setMounted(true);
    loadAvailabilities();
  }, []);

  const form = useForm({
    defaultValues: {
      dayOfWeek: -1,
      startTime: "",
      endTime: "",
    },
    validators: { onSubmit: AvailabilitySchema },
    onSubmit: async ({ value }) => {
      const toastId = toast.loading("Saving...");
      const response = await setAvailability(value as AvailabilityType);

      if (!response.data?.success) {
        toast.error(response.data?.message || "Failed to save slot.", {
          id: toastId,
        });
        return;
      }

      await loadAvailabilities();
      toast.success("Slot added!", { id: toastId });
    },
  });

  const handleToggle = async (slot: AvailabilityType) => {
    const newActive = !slot.isActive;

    const response = await updateAvailability(slot.id!, {
      isActive: newActive,
    });
    if (!response.data?.success) {
      toast.error("Failed to update slot.");
      return;
    }

    await loadAvailabilities();

    toast.success(newActive ? "Slot enabled." : "Slot disabled.");
  };

  const handleDelete = async (slot: AvailabilityType) => {
    const response = await deleteAvailability(slot.id!);
    if (!response.data?.success) {
      toast.error("Failed to delete slot.");
      return;
    }

    await loadAvailabilities();

    toast.success("Slot deleted.");
  };

  const handleUpdate = async () => {
    if (!editingSlot) return;

    const toastId = toast.loading("Updating slot...");

    const response = await updateAvailability(editingSlot.id, {
      startTime: editingSlot.startTime,
      endTime: editingSlot.endTime,
    });

    if (!response.data?.success) {
      toast.error(response.data?.message || "Failed to update slot.", {
        id: toastId,
      });
      return;
    }

    setEditingSlot(null);
    await loadAvailabilities();

    toast.success("Slot updated!", { id: toastId });
  };

  const weekDays = Array.from({ length: 7 }, (_, i) => ({
    day: i,
    slots: availabilities
      .filter((a) => a.dayOfWeek === i)
      .sort((a, b) => a.startTime.localeCompare(b.startTime)),
  }));

  const totalSlots = availabilities.length;
  const activeSlots = availabilities.filter((a) => a.isActive).length;

  return (
    <div className="mx-auto w-full max-w-7xl space-y-6 p-4">
      <Card className="overflow-hidden border-border/70 bg-linear-to-r from-orange-50 via-white to-amber-50 dark:from-card dark:via-card dark:to-card">
        <CardHeader className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <CardTitle className="text-2xl">Tutor Availability</CardTitle>
            <CardDescription>
              Manage your weekly teaching schedule.
            </CardDescription>
          </div>
          <div className="flex gap-2">
            <Badge className="bg-emerald-600 text-white hover:bg-emerald-600">
              {activeSlots} Active Slots
            </Badge>
            <Badge variant="secondary">{totalSlots} Total Slots</Badge>
          </div>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <Card className="xl:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CalendarDays className="size-4 text-[#ec5b13]" />
              Weekly Schedule
            </CardTitle>
            <CardDescription>
              Click a slot to enable/disable or update or delete it.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {weekDays.map(({ day, slots }) => (
              <div
                key={day}
                className="flex items-start gap-4 rounded-lg border border-border/80 bg-muted/15 p-3"
              >
                <p className="w-24 shrink-0 pt-1 font-medium">
                  {daysWithNumber[day]}
                </p>

                {slots.length === 0 ? (
                  <p className="text-sm text-muted-foreground pt-1">No slots</p>
                ) : (
                  <div className="flex flex-wrap gap-2">
                    {slots.map((slot) => {
                      const isEditing = editingSlot?.id === slot.id;
                      return isEditing && editingSlot ? (
                        <div
                          key={slot.id}
                          className="flex items-center gap-2 rounded-lg border bg-muted/50 px-3 py-1.5"
                        >
                          <Input
                            type="time"
                            className="h-7 w-28 text-xs"
                            value={editingSlot.startTime}
                            onChange={(e) =>
                              setEditingSlot({
                                ...editingSlot,
                                startTime: e.target.value,
                              })
                            }
                          />
                          <span className="text-xs text-muted-foreground">
                            –
                          </span>
                          <Input
                            type="time"
                            className="h-7 w-28 text-xs"
                            value={editingSlot.endTime}
                            onChange={(e) =>
                              setEditingSlot({
                                ...editingSlot,
                                endTime: e.target.value,
                              })
                            }
                          />
                          <Button
                            size="sm"
                            className="h-7 bg-[#ec5b13] px-2 text-xs hover:bg-[#d44f10] text-white"
                            onClick={handleUpdate}
                          >
                            Save
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="h-7 px-2 text-xs"
                            onClick={() => setEditingSlot(null)}
                          >
                            Cancel
                          </Button>
                        </div>
                      ) : (
                        <DropdownMenu key={slot.id}>
                          <DropdownMenuTrigger asChild>
                            <button
                              className={`rounded-full border px-3 py-1 text-xs font-medium transition-colors cursor-pointer ${
                                slot.isActive
                                  ? "border-emerald-400 bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300"
                                  : "border-muted bg-muted text-muted-foreground line-through"
                              }`}
                            >
                              {convertInto12h(slot.startTime)} –{" "}
                              {convertInto12h(slot.endTime)}
                            </button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="start">
                            <DropdownMenuItem
                              onClick={() => handleToggle(slot)}
                            >
                              {slot.isActive ? "Disable slot" : "Enable slot"}
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() =>
                                setEditingSlot({
                                  id: slot.id!,
                                  startTime: slot.startTime,
                                  endTime: slot.endTime,
                                })
                              }
                            >
                              Update slot
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              className="text-red-500 focus:text-red-500"
                              onClick={() => handleDelete(slot)}
                            >
                              Delete slot
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      );
                    })}
                  </div>
                )}
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CalendarPlus2 className="size-4 text-[#ec5b13]" />
              Add Time Slot
            </CardTitle>
            <CardDescription>
              Add a new slot for a selected day.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {!mounted ? null : (
              <form
                className="space-y-4"
                onSubmit={(e) => {
                  e.preventDefault();
                  form.handleSubmit(e);
                }}
              >
                <form.Field
                  name="dayOfWeek"
                  children={(field) => (
                    <div className="space-y-1.5">
                      <Label>Day</Label>
                      <Select
                        value={
                          field.state.value === -1
                            ? undefined
                            : String(field.state.value)
                        }
                        onValueChange={(v) => field.handleChange(Number(v))}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select day" />
                        </SelectTrigger>
                        <SelectContent>
                          {Object.entries(daysWithNumber).map(([key, name]) => (
                            <SelectItem key={key} value={key}>
                              {name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  )}
                />

                <div className="grid grid-cols-2 gap-3">
                  <form.Field
                    name="startTime"
                    children={(field) => (
                      <div className="space-y-1.5">
                        <Label>Start Time</Label>
                        <Input
                          type="time"
                          value={field.state.value}
                          onChange={(e) => field.handleChange(e.target.value)}
                        />
                      </div>
                    )}
                  />
                  <form.Field
                    name="endTime"
                    children={(field) => (
                      <div className="space-y-1.5">
                        <Label>End Time</Label>
                        <Input
                          type="time"
                          value={field.state.value}
                          onChange={(e) => field.handleChange(e.target.value)}
                        />
                      </div>
                    )}
                  />
                </div>

                <Button className="w-full bg-[#ec5b13] hover:bg-[#d44f10] text-white">
                  <Clock3 className="mr-2 size-4" />
                  Add Slot
                </Button>
              </form>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

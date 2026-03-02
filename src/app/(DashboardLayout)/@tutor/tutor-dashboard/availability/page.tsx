import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const weeklySlots = [
  {
    day: "Sunday",
    enabled: true,
    slots: ["06:00 PM - 07:00 PM", "08:00 PM - 09:00 PM"],
  },
  {
    day: "Monday",
    enabled: true,
    slots: ["07:30 PM - 08:30 PM"],
  },
  {
    day: "Tuesday",
    enabled: true,
    slots: ["09:00 PM - 10:00 PM"],
  },
  {
    day: "Wednesday",
    enabled: false,
    slots: [],
  },
  {
    day: "Thursday",
    enabled: true,
    slots: ["06:30 PM - 07:30 PM", "09:00 PM - 10:00 PM"],
  },
  {
    day: "Friday",
    enabled: true,
    slots: ["04:00 PM - 05:00 PM"],
  },
  {
    day: "Saturday",
    enabled: false,
    slots: [],
  },
];

export default function TutorAvailabilityPage() {
  return (
    <div className="mx-auto w-full max-w-7xl space-y-6 p-4">
      <Card>
        <CardHeader className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="space-y-1.5">
            <CardTitle className="text-2xl">Tutor Availability</CardTitle>
            <CardDescription>
              UI only: manage your weekly teaching schedule and slot preferences.
            </CardDescription>
          </div>
          <div className="flex flex-wrap gap-2">
            <Badge className="bg-emerald-600 text-white hover:bg-emerald-600">
              Available 5 Days
            </Badge>
            <Badge variant="secondary">8 Total Slots</Badge>
          </div>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <Card className="xl:col-span-2">
          <CardHeader>
            <CardTitle>Weekly Schedule</CardTitle>
            <CardDescription>
              Enable days and preview configured class slots.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {weeklySlots.map((item) => (
              <Card key={item.day} className="border">
                <CardContent className="p-4 space-y-3">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-3">
                      <Checkbox checked={item.enabled} />
                      <p className="font-semibold">{item.day}</p>
                    </div>
                    <Badge variant={item.enabled ? "default" : "secondary"}>
                      {item.enabled ? "Available" : "Unavailable"}
                    </Badge>
                  </div>

                  {item.enabled ? (
                    <div className="flex flex-wrap gap-2">
                      {item.slots.map((slot) => (
                        <Badge key={slot} variant="outline">
                          {slot}
                        </Badge>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground">
                      No slots added for this day.
                    </p>
                  )}
                </CardContent>
              </Card>
            ))}
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Add Time Slot</CardTitle>
              <CardDescription>
                Add a new slot for a selected day.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Day</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select day" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sunday">Sunday</SelectItem>
                    <SelectItem value="monday">Monday</SelectItem>
                    <SelectItem value="tuesday">Tuesday</SelectItem>
                    <SelectItem value="wednesday">Wednesday</SelectItem>
                    <SelectItem value="thursday">Thursday</SelectItem>
                    <SelectItem value="friday">Friday</SelectItem>
                    <SelectItem value="saturday">Saturday</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label>Start Time</Label>
                  <Input type="time" />
                </div>
                <div className="space-y-2">
                  <Label>End Time</Label>
                  <Input type="time" />
                </div>
              </div>

              <Button className="w-full bg-[#ec5b13] hover:bg-[#d44f10] text-white">
                Add Slot
              </Button>
            </CardContent>
          </Card>

          
        </div>
      </div>
    </div>
  );
}

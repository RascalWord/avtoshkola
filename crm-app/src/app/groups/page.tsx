"use client";

import { useState } from "react";
import { mockGroups, mockStudents } from "@/lib/mockData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Plus, Video, MapPin, Users } from "lucide-react";

export default function GroupsPage() {
  const [newGroupFormat, setNewGroupFormat] = useState<"offline" | "online">("offline");

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight text-white">Groups & Schedule</h2>

        <Dialog>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              New Group
            </Button>
          </DialogTrigger>
          <DialogContent className="glass-panel border-white/10 text-white">
            <DialogHeader>
              <DialogTitle>Create New Group</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 pt-4">
              <div className="grid gap-2">
                <Label>Group Name</Label>
                <Input placeholder="e.g. Group A - Evening" className="bg-background/50 border-white/10" />
              </div>
              <div className="grid gap-2">
                <Label>Format</Label>
                <Select value={newGroupFormat} onValueChange={(val) => val && setNewGroupFormat(val as "offline" | "online")}>
                  <SelectTrigger className="bg-background/50 border-white/10">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="offline">Offline</SelectItem>
                    <SelectItem value="online">Online</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {newGroupFormat === "online" && (
                <div className="grid gap-2 animate-in fade-in slide-in-from-top-2">
                  <Label>Broadcast Link</Label>
                  <Input placeholder="https://zoom.us/..." className="bg-background/50 border-white/10 border-primary/50 focus-visible:ring-primary" />
                </div>
              )}

              <Button className="w-full mt-4">Create Group</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {mockGroups.map(group => {
          const groupStudents = mockStudents.filter(s => s.group_id === group.id);

          return (
            <Card key={group.id} className="glass-panel border-white/5 overflow-hidden flex flex-col">
              <CardHeader className="bg-white/[0.02] border-b border-white/5 pb-4">
                <CardTitle className="text-xl flex justify-between items-start">
                  <span className="text-white">{group.name}</span>
                  {group.format === "online" ? (
                    <Video className="h-5 w-5 text-primary" />
                  ) : (
                    <MapPin className="h-5 w-5 text-muted-foreground" />
                  )}
                </CardTitle>
                <div className="flex items-center gap-2 mt-2 text-sm text-muted-foreground">
                  <Users className="h-4 w-4" />
                  {groupStudents.length} Students
                </div>
              </CardHeader>
              <CardContent className="pt-4 flex-1">
                {group.format === "online" && group.meeting_link && (
                  <div className="mb-4 p-2 rounded bg-primary/10 border border-primary/20 text-sm">
                    <span className="text-muted-foreground">Link: </span>
                    <a href={group.meeting_link} className="text-primary hover:underline truncate block">
                      {group.meeting_link}
                    </a>
                  </div>
                )}

                <div className="space-y-3 mt-4">
                  <h4 className="text-sm font-medium text-white mb-2">Today&apos;s Attendance</h4>
                  {groupStudents.length === 0 ? (
                    <p className="text-sm text-muted-foreground">No students in this group yet.</p>
                  ) : (
                    groupStudents.map(student => (
                      <div key={student.id} className="flex items-center justify-between p-2 rounded-md hover:bg-white/5 border border-transparent hover:border-white/5 transition-colors">
                        <span className="text-sm text-gray-300">{student.full_name}</span>
                        <Checkbox className="border-white/20 data-[state=checked]:bg-primary" />
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

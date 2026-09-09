"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { differenceInYears, parseISO, isValid } from "date-fns";
import { motion, AnimatePresence } from "framer-motion";
import { ScrollArea } from "@/components/ui/scroll-area";

interface StudentFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function StudentForm({ open, onOpenChange }: StudentFormProps) {
  const [birthDate, setBirthDate] = useState("");

  const parsedDate = parseISO(birthDate);
  const age = isValid(parsedDate) ? differenceInYears(new Date(), parsedDate) : null;
  const isUnderage = age !== null && age < 18;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] glass-panel border-white/10 text-white max-h-[90vh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="text-2xl">Add New Student</DialogTitle>
        </DialogHeader>

        <ScrollArea className="flex-1 pr-4 -mr-4">
          <div className="space-y-6 py-4">
            <div className="space-y-4">
              <h4 className="font-medium text-primary">General Information</h4>
              <div className="grid gap-2">
                <Label htmlFor="full_name">Full Name</Label>
                <Input id="full_name" placeholder="Ivan Ivanov" className="bg-background/50 border-white/10 focus-visible:ring-primary" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="birth_date">Birth Date (YYYY-MM-DD)</Label>
                <Input
                  id="birth_date"
                  placeholder="2000-01-01"
                  value={birthDate}
                  onChange={(e) => setBirthDate(e.target.value)}
                  className="bg-background/50 border-white/10 focus-visible:ring-primary"
                />
              </div>
            </div>

            <AnimatePresence>
              {isUnderage && (
                <motion.div
                  initial={{ opacity: 0, height: 0, marginTop: 0 }}
                  animate={{ opacity: 1, height: "auto", marginTop: 24 }}
                  exit={{ opacity: 0, height: 0, marginTop: 0 }}
                  className="overflow-hidden"
                >
                  <div className="p-4 rounded-lg bg-white/5 border border-primary/30 space-y-4">
                    <h4 className="font-semibold text-primary">Legal Guardian (Required for &lt;18)</h4>
                    <div className="grid gap-2">
                      <Label htmlFor="guardian_name">Guardian Full Name</Label>
                      <Input id="guardian_name" placeholder="Petr Ivanov" className="bg-background/50 border-white/10" />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="guardian_phone">Guardian Phone</Label>
                      <Input id="guardian_phone" placeholder="+7 999 000 00 00" className="bg-background/50 border-white/10" />
                    </div>
                    <div className="flex items-center space-x-2 pt-2">
                      <Checkbox id="consent" className="border-white/20 data-[state=checked]:bg-primary" />
                      <Label htmlFor="consent" className="text-sm font-normal cursor-pointer">
                        Written consent obtained
                      </Label>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="space-y-4">
              <h4 className="font-medium text-primary">Contact & Documents</h4>
              <div className="grid gap-2">
                <Label htmlFor="phone">Phone</Label>
                <Input id="phone" placeholder="+7 900 000 00 00" className="bg-background/50 border-white/10 focus-visible:ring-primary" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="passport">Passport Series & Number</Label>
                <Input id="passport" placeholder="1234 567890" className="bg-background/50 border-white/10 focus-visible:ring-primary" />
              </div>
            </div>
          </div>
        </ScrollArea>

        <div className="flex justify-end gap-3 pt-4 border-t border-white/10 mt-4">
          <Button variant="ghost" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button onClick={() => onOpenChange(false)}>Save Student</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

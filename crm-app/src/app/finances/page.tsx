"use client";

import { useState } from "react";
import { mockPayments, mockStudents, mockAdmins } from "@/lib/mockData";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Plus } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function FinancesPage() {
  const [selectedStudent, setSelectedStudent] = useState("");

  const studentDebt = selectedStudent
    ? mockStudents.find(s => s.id === selectedStudent)!.total_cost - mockPayments.filter(p => p.student_id === selectedStudent).reduce((a, b) => a + b.amount, 0)
    : 0;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight text-white">Finances</h2>

        <Dialog>
          <DialogTrigger asChild>
            <Button className="gap-2 bg-green-600 hover:bg-green-700 text-white shadow-lg shadow-green-900/20">
              <Plus className="h-4 w-4" />
              Accept Payment
            </Button>
          </DialogTrigger>
          <DialogContent className="glass-panel border-white/10 text-white sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Record Payment</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 pt-4">
              <div className="grid gap-2">
                <Label>Student</Label>
                <Select value={selectedStudent} onValueChange={(v) => setSelectedStudent(v || "")}>
                  <SelectTrigger className="bg-background/50 border-white/10">
                    <SelectValue placeholder="Select student..." />
                  </SelectTrigger>
                  <SelectContent>
                    {mockStudents.map(student => (
                      <SelectItem key={student.id} value={student.id}>
                        {student.full_name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {selectedStudent && (
                <div className="p-3 bg-white/5 border border-white/10 rounded-md flex justify-between items-center text-sm">
                  <span className="text-muted-foreground">Current Debt:</span>
                  <span className={`font-bold ${studentDebt > 0 ? "text-destructive" : "text-green-400"}`}>
                    {studentDebt.toLocaleString()} ₽
                  </span>
                </div>
              )}

              <div className="grid gap-2">
                <Label>Amount (₽)</Label>
                <Input type="number" placeholder="0.00" className="bg-background/50 border-white/10" />
              </div>

              <div className="grid gap-2">
                <Label>Payment Method</Label>
                <Select defaultValue="Card">
                  <SelectTrigger className="bg-background/50 border-white/10">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Cash">Cash</SelectItem>
                    <SelectItem value="Card">Card</SelectItem>
                    <SelectItem value="Bank Transfer">Bank Transfer</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-2">
                <Label>Received By (Admin)</Label>
                <Select defaultValue={mockAdmins[0].id}>
                  <SelectTrigger className="bg-background/50 border-white/10">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {mockAdmins.map(admin => (
                      <SelectItem key={admin.id} value={admin.id}>
                        {admin.name} ({admin.role})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Button className="w-full mt-4 bg-green-600 hover:bg-green-700 text-white">Confirm Payment</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="glass-panel rounded-xl border border-white/5 overflow-hidden">
        <Table>
          <TableHeader className="bg-background/50">
            <TableRow className="border-white/5 hover:bg-transparent">
              <TableHead className="text-muted-foreground">Date</TableHead>
              <TableHead className="text-muted-foreground">Student</TableHead>
              <TableHead className="text-muted-foreground">Amount</TableHead>
              <TableHead className="text-muted-foreground">Method</TableHead>
              <TableHead className="text-muted-foreground">Processed By</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockPayments.map((payment) => {
              const student = mockStudents.find(s => s.id === payment.student_id);
              const admin = mockAdmins.find(a => a.id === payment.admin_id);

              return (
                <TableRow key={payment.id} className="border-white/5 hover:bg-white/5">
                  <TableCell className="text-muted-foreground">{payment.date}</TableCell>
                  <TableCell className="font-medium text-white">{student?.full_name}</TableCell>
                  <TableCell className="font-bold text-green-400">+{payment.amount.toLocaleString()} ₽</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="border-white/10 text-muted-foreground">
                      {payment.method}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground text-sm">{admin?.name}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { mockStudents, mockPayments, mockLegalGuardians } from "@/lib/mockData";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { differenceInYears, parseISO } from "date-fns";

interface StudentDialogProps {
  studentId: string | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function StudentDialog({ studentId, open, onOpenChange }: StudentDialogProps) {
  if (!studentId) return null;

  const student = mockStudents.find(s => s.id === studentId);
  if (!student) return null;

  const studentPayments = mockPayments.filter(p => p.student_id === studentId);
  const totalPaid = studentPayments.reduce((acc, curr) => acc + curr.amount, 0);
  const debt = student.total_cost - totalPaid;

  const age = differenceInYears(new Date(), parseISO(student.birth_date));
  const isUnderage = age < 18;
  const guardian = isUnderage ? mockLegalGuardians.find(g => g.student_id === studentId) : null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] glass-panel border-white/10 text-white">
        <DialogHeader>
          <DialogTitle className="text-2xl">{student.full_name}</DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Student details and history
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="info" className="w-full mt-4">
          <TabsList className="w-full grid grid-cols-3 bg-background/50 border border-white/5">
            <TabsTrigger value="info" className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary">Info</TabsTrigger>
            <TabsTrigger value="docs" className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary">Documents</TabsTrigger>
            <TabsTrigger value="finance" className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary">Finances</TabsTrigger>
          </TabsList>

          <TabsContent value="info" className="space-y-4 mt-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Category</p>
                <p className="font-medium text-lg">{student.category}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Status</p>
                <Badge className="mt-1" variant={student.status === "Active" ? "default" : "secondary"}>
                  {student.status}
                </Badge>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Phone</p>
                <p>{student.phone}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Email</p>
                <p>{student.email}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Birth Date</p>
                <p>{student.birth_date} ({age} years old)</p>
              </div>
            </div>

            {isUnderage && guardian && (
              <div className="mt-6 p-4 rounded-lg bg-white/5 border border-white/10">
                <h4 className="font-semibold text-primary mb-2">Legal Guardian Details</h4>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <p className="text-muted-foreground">Name:</p>
                  <p>{guardian.full_name}</p>
                  <p className="text-muted-foreground">Phone:</p>
                  <p>{guardian.phone}</p>
                  <p className="text-muted-foreground">Consent:</p>
                  <p className={guardian.is_consent_signed ? "text-green-400" : "text-destructive"}>
                    {guardian.is_consent_signed ? "Signed" : "Pending"}
                  </p>
                </div>
              </div>
            )}
          </TabsContent>

          <TabsContent value="docs" className="space-y-4 mt-4">
            <div className="space-y-4">
              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <h4 className="font-medium mb-2">Passport</h4>
                <p className="text-sm"><span className="text-muted-foreground">Series & Number:</span> {student.passport_series} {student.passport_number}</p>
                <p className="text-sm"><span className="text-muted-foreground">Issued By:</span> {student.passport_issued_by}</p>
                <p className="text-sm"><span className="text-muted-foreground">Issue Date:</span> {student.passport_issue_date}</p>
                <p className="text-sm"><span className="text-muted-foreground">Code:</span> {student.passport_code}</p>
              </div>
              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <h4 className="font-medium mb-2">SNILS</h4>
                <p className="text-sm">{student.snils}</p>
              </div>
              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <h4 className="font-medium mb-2">Addresses</h4>
                <p className="text-sm"><span className="text-muted-foreground">Registration:</span> {student.address_registration}</p>
                <p className="text-sm"><span className="text-muted-foreground">Fact:</span> {student.address_fact}</p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="finance" className="space-y-4 mt-4">
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="p-3 rounded-lg bg-white/5 border border-white/10">
                <p className="text-sm text-muted-foreground">Total Cost</p>
                <p className="text-xl font-bold">{student.total_cost.toLocaleString()} ₽</p>
              </div>
              <div className="p-3 rounded-lg bg-white/5 border border-white/10">
                <p className="text-sm text-muted-foreground">Total Paid</p>
                <p className="text-xl font-bold text-green-400">{totalPaid.toLocaleString()} ₽</p>
              </div>
              <div className="p-3 rounded-lg bg-white/5 border border-white/10">
                <p className="text-sm text-muted-foreground">Remaining Debt</p>
                <p className={`text-xl font-bold ${debt > 0 ? "text-destructive" : ""}`}>{debt.toLocaleString()} ₽</p>
              </div>
            </div>

            <h4 className="font-medium mb-2">Payment History</h4>
            <div className="rounded-md border border-white/5">
              <Table>
                <TableHeader className="bg-background/50">
                  <TableRow className="border-white/5 hover:bg-transparent">
                    <TableHead className="text-muted-foreground">Date</TableHead>
                    <TableHead className="text-muted-foreground">Amount</TableHead>
                    <TableHead className="text-muted-foreground">Method</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {studentPayments.length === 0 ? (
                    <TableRow className="border-white/5 hover:bg-transparent">
                      <TableCell colSpan={3} className="text-center text-muted-foreground">No payments found.</TableCell>
                    </TableRow>
                  ) : (
                    studentPayments.map((payment) => (
                      <TableRow key={payment.id} className="border-white/5 hover:bg-white/5">
                        <TableCell>{payment.date}</TableCell>
                        <TableCell className="font-medium text-green-400">+{payment.amount.toLocaleString()} ₽</TableCell>
                        <TableCell>{payment.method}</TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}

"use client";

import { useState } from "react";
import { mockStudents } from "@/lib/mockData";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, Plus } from "lucide-react";
import { motion } from "framer-motion";
import { StudentDialog } from "@/components/StudentDialog";
import { StudentForm } from "@/components/StudentForm";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function StudentsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("All");
  const [selectedStudent, setSelectedStudent] = useState<string | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const filteredStudents = mockStudents.filter(student => {
    const matchesSearch = student.full_name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "All" || student.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight text-white">Students</h2>
        <Button className="gap-2 shadow-lg shadow-primary/20" onClick={() => setIsFormOpen(true)}>
          <Plus className="h-4 w-4" />
          Add Student
        </Button>
      </div>

      <div className="glass-panel rounded-xl border border-white/5 overflow-hidden p-6 space-y-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by name..."
              className="pl-9 bg-background/50 border-white/10 text-white placeholder:text-muted-foreground focus-visible:ring-primary"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Select value={statusFilter} onValueChange={(val) => setStatusFilter(val || "All")}>
            <SelectTrigger className="w-full sm:w-[180px] bg-background/50 border-white/10 text-white">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All Statuses</SelectItem>
              <SelectItem value="Active">Active</SelectItem>
              <SelectItem value="Completed">Completed</SelectItem>
              <SelectItem value="Dropped">Dropped</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="rounded-md border border-white/5"
        >
          <Table>
            <TableHeader className="bg-background/50">
              <TableRow className="border-white/5 hover:bg-transparent">
                <TableHead className="text-muted-foreground">Name</TableHead>
                <TableHead className="text-muted-foreground">Category</TableHead>
                <TableHead className="text-muted-foreground">Phone</TableHead>
                <TableHead className="text-muted-foreground">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredStudents.map((student) => (
                <TableRow
                  key={student.id}
                  className="border-white/5 hover:bg-white/5 cursor-pointer transition-colors"
                  onClick={() => setSelectedStudent(student.id)}
                >
                  <TableCell className="font-medium text-white">{student.full_name}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="border-primary/50 text-primary">
                      {student.category}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{student.phone}</TableCell>
                  <TableCell>
                    <Badge
                      variant={student.status === "Active" ? "default" : student.status === "Completed" ? "secondary" : "destructive"}
                      className={student.status === "Active" ? "bg-primary/20 text-primary hover:bg-primary/30" : ""}
                    >
                      {student.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </motion.div>
      </div>

      <StudentDialog
        studentId={selectedStudent}
        open={!!selectedStudent}
        onOpenChange={(open) => !open && setSelectedStudent(null)}
      />
      <StudentForm open={isFormOpen} onOpenChange={setIsFormOpen} />
    </div>
  );
}

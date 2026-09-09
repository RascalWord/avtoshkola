export type Admin = {
  id: string;
  name: string;
  role: "Director" | "Co-Director";
};

export type StudentStatus = "Active" | "Completed" | "Dropped";
export type Category = "A" | "B" | "C";

export type Student = {
  id: string;
  full_name: string;
  birth_date: string; // YYYY-MM-DD
  phone: string;
  email: string;
  passport_series: string;
  passport_number: string;
  passport_issued_by: string;
  passport_issue_date: string;
  passport_code: string;
  address_registration: string;
  address_fact: string;
  snils: string;
  category: Category;
  group_id: string;
  total_cost: number;
  status: StudentStatus;
};

export type LegalGuardian = {
  id: string;
  student_id: string;
  full_name: string;
  passport_data: string;
  phone: string;
  is_consent_signed: boolean;
};

export type GroupFormat = "offline" | "online";

export type Group = {
  id: string;
  name: string;
  format: GroupFormat;
  meeting_link?: string;
};

export type Lesson = {
  id: string;
  group_id: string;
  date_time: string;
  topic: string;
};

export type Attendance = {
  id: string;
  lesson_id: string;
  student_id: string;
  is_present: boolean;
};

export type PaymentMethod = "Cash" | "Card" | "Bank Transfer";

export type Payment = {
  id: string;
  student_id: string;
  amount: number;
  date: string; // YYYY-MM-DD
  method: PaymentMethod;
  admin_id: string;
};

export const mockAdmins: Admin[] = [
  { id: "a1", name: "Alexey Smirnov", role: "Director" },
  { id: "a2", name: "Maria Ivanova", role: "Co-Director" },
];

export const mockGroups: Group[] = [
  { id: "g1", name: "Group B - Evening", format: "offline" },
  { id: "g2", name: "Group A - Weekend", format: "online", meeting_link: "https://zoom.us/j/123456789" },
  { id: "g3", name: "Group C - Morning", format: "offline" },
];

export const mockStudents: Student[] = [
  {
    id: "s1",
    full_name: "Ivan Petrov",
    birth_date: "1995-04-12",
    phone: "+7 999 123 45 67",
    email: "ivan@example.com",
    passport_series: "1234",
    passport_number: "567890",
    passport_issued_by: "GU MVD",
    passport_issue_date: "2015-05-20",
    passport_code: "123-456",
    address_registration: "Moscow, Lenina 1",
    address_fact: "Moscow, Lenina 1",
    snils: "123-456-789 00",
    category: "B",
    group_id: "g1",
    total_cost: 50000,
    status: "Active",
  },
  {
    id: "s2",
    full_name: "Anna Sidorova",
    birth_date: "2007-08-25", // Under 18
    phone: "+7 999 987 65 43",
    email: "anna@example.com",
    passport_series: "4321",
    passport_number: "098765",
    passport_issued_by: "GU MVD",
    passport_issue_date: "2021-09-10",
    passport_code: "654-321",
    address_registration: "St. Petersburg, Nevsky 10",
    address_fact: "St. Petersburg, Nevsky 10",
    snils: "987-654-321 11",
    category: "A",
    group_id: "g2",
    total_cost: 35000,
    status: "Active",
  },
  {
    id: "s3",
    full_name: "Sergey Makarov",
    birth_date: "1988-11-05",
    phone: "+7 900 111 22 33",
    email: "sergey@example.com",
    passport_series: "5555",
    passport_number: "111222",
    passport_issued_by: "OVD",
    passport_issue_date: "2008-12-01",
    passport_code: "111-222",
    address_registration: "Kazan, Mira 5",
    address_fact: "Kazan, Mira 5",
    snils: "555-111-222 33",
    category: "C",
    group_id: "g3",
    total_cost: 70000,
    status: "Completed",
  },
];

export const mockLegalGuardians: LegalGuardian[] = [
  {
    id: "lg1",
    student_id: "s2",
    full_name: "Elena Sidorova",
    passport_data: "4321 098765",
    phone: "+7 999 000 11 22",
    is_consent_signed: true,
  },
];

export const mockLessons: Lesson[] = [
  { id: "l1", group_id: "g1", date_time: "2024-05-10T18:00:00", topic: "Traffic Rules Basics" },
  { id: "l2", group_id: "g1", date_time: "2024-05-12T18:00:00", topic: "Road Signs" },
  { id: "l3", group_id: "g2", date_time: "2024-05-11T10:00:00", topic: "Vehicle Setup" },
];

export const mockAttendance: Attendance[] = [
  { id: "att1", lesson_id: "l1", student_id: "s1", is_present: true },
  { id: "att2", lesson_id: "l2", student_id: "s1", is_present: false },
  { id: "att3", lesson_id: "l3", student_id: "s2", is_present: true },
];

export const mockPayments: Payment[] = [
  { id: "p1", student_id: "s1", amount: 20000, date: "2024-04-01", method: "Card", admin_id: "a1" },
  { id: "p2", student_id: "s1", amount: 15000, date: "2024-04-15", method: "Bank Transfer", admin_id: "a2" },
  { id: "p3", student_id: "s2", amount: 35000, date: "2024-04-05", method: "Cash", admin_id: "a1" },
  { id: "p4", student_id: "s3", amount: 70000, date: "2023-10-10", method: "Card", admin_id: "a2" },
];

"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { mockStudents, mockPayments, mockLessons } from "@/lib/mockData";
import { Users, Wallet, CalendarDays, TrendingUp } from "lucide-react";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts";
import { motion } from "framer-motion";

export default function Dashboard() {
  const activeStudents = mockStudents.filter(s => s.status === "Active").length;

  const totalExpected = mockStudents.reduce((acc, curr) => acc + curr.total_cost, 0);
  const totalPaid = mockPayments.reduce((acc, curr) => acc + curr.amount, 0);
  const totalDebt = totalExpected - totalPaid;

  const upcomingLessons = mockLessons.filter(l => new Date(l.date_time) >= new Date()).length;

  const paymentsData = mockPayments.reduce((acc: { name: string, total: number }[], payment) => {
    const month = new Date(payment.date).toLocaleString('ru-RU', { month: 'short' });
    const existing = acc.find(item => item.name === month);
    if (existing) {
      existing.total += payment.amount;
    } else {
      acc.push({ name: month, total: payment.amount });
    }
    return acc;
  }, []).sort((a, b) => {
    const months = ['янв.', 'февр.', 'мар.', 'апр.', 'мая', 'июн.', 'июл.', 'авг.', 'сент.', 'окт.', 'нояб.', 'дек.'];
    return months.indexOf(a.name) - months.indexOf(b.name);
  });

  const stats = [
    {
      title: "Активные ученики",
      value: activeStudents,
      icon: Users,
      description: "+2 с прошлого месяца",
    },
    {
      title: "Сумма долгов",
      value: `${totalDebt.toLocaleString()} ₽`,
      icon: Wallet,
      description: "Требует внимания",
    },
    {
      title: "Всего получено",
      value: `${totalPaid.toLocaleString()} ₽`,
      icon: TrendingUp,
      description: "За всё время",
    },
    {
      title: "Уроки на сегодня",
      value: upcomingLessons,
      icon: CalendarDays,
      description: "Запланированы на ближайшие 7 дней",
    },
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight text-white">Главная (Дашборд)</h2>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <Card className="glass-panel border-white/5">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <stat.icon className="h-4 w-4 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">{stat.value}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  {stat.description}
                </p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="grid gap-4 md:grid-cols-2 lg:grid-cols-7"
      >
        <Card className="col-span-7 lg:col-span-4 glass-panel border-white/5">
          <CardHeader>
            <CardTitle className="text-white">График поступлений</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <div className="h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={paymentsData}>
                  <XAxis
                    dataKey="name"
                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis
                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) => `${value} ₽`}
                  />
                  <Tooltip
                    cursor={{ fill: 'rgba(255, 255, 255, 0.05)' }}
                    contentStyle={{ backgroundColor: 'rgba(0,0,0,0.8)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
                  />
                  <Bar
                    dataKey="total"
                    fill="currentColor"
                    radius={[4, 4, 0, 0]}
                    className="fill-primary"
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Users, Calendar, BookOpen, Search, Loader2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import PageLayout from "@/components/PageLayout";

interface Student {
  id: string;
  full_name: string;
  email: string;
  current_grade: string;
  created_at: string;
}

const AdminDashboard = () => {
  const { user, isAdmin, isLoading: authLoading, signOut } = useAuth();
  const [students, setStudents] = useState<Student[]>([]);
  const [filteredStudents, setFilteredStudents] = useState<Student[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState({ totalStudents: 0, totalSessions: 0, totalResources: 0 });
  const navigate = useNavigate();

  useEffect(() => {
    if (!authLoading && (!user || !isAdmin)) {
      navigate("/auth");
    }
  }, [user, isAdmin, authLoading, navigate]);

  useEffect(() => {
    if (isAdmin) {
      loadData();
    }
  }, [isAdmin]);

  useEffect(() => {
    const filtered = students.filter(
      (student) =>
        student.full_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        student.email.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredStudents(filtered);
  }, [searchQuery, students]);

  const loadData = async () => {
    const [studentsRes, sessionsRes, resourcesRes] = await Promise.all([
      supabase.from("students").select("*").order("created_at", { ascending: false }),
      supabase.from("counseling_sessions").select("id"),
      supabase.from("resources").select("id"),
    ]);

    if (studentsRes.data) {
      setStudents(studentsRes.data);
      setFilteredStudents(studentsRes.data);
    }

    setStats({
      totalStudents: studentsRes.data?.length || 0,
      totalSessions: sessionsRes.data?.length || 0,
      totalResources: resourcesRes.data?.length || 0,
    });

    setIsLoading(false);
  };

  if (authLoading || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <PageLayout showFooter={false}>
      <div className="max-w-6xl mx-auto space-y-10">
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <h2 className="text-3xl md:text-4xl font-extrabold text-foreground tracking-tight">
              Admin Dashboard
            </h2>
            <p className="text-muted-foreground text-lg">Monitor platform activity and manage users.</p>
          </div>
        </header>

        <div className="grid gap-6 md:grid-cols-3">
          <Card className="bg-card border-border shadow-sm ring-1 ring-inset ring-black/5 dark:ring-white/10">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Total Students</CardTitle>
              <Users className="h-5 w-5 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground">{stats.totalStudents}</div>
            </CardContent>
          </Card>

          <Card className="bg-card border-border shadow-sm ring-1 ring-inset ring-black/5 dark:ring-white/10">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Total Sessions</CardTitle>
              <Calendar className="h-5 w-5 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground">{stats.totalSessions}</div>
            </CardContent>
          </Card>

          <Card className="bg-card border-border shadow-sm ring-1 ring-inset ring-black/5 dark:ring-white/10">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Resources</CardTitle>
              <BookOpen className="h-5 w-5 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground">{stats.totalResources}</div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="students" className="space-y-8">
          <TabsList className="bg-muted/50 border border-border p-1.5 flex w-full max-w-md rounded-2xl shadow-sm backdrop-blur-sm">
            <TabsTrigger value="students" className="rounded-xl flex-1 data-[state=active]:bg-background data-[state=active]:text-primary data-[state=active]:shadow-sm transition-all py-3 font-semibold">Students</TabsTrigger>
            <TabsTrigger value="sessions" className="rounded-xl flex-1 data-[state=active]:bg-background data-[state=active]:text-primary data-[state=active]:shadow-sm transition-all py-3 font-semibold">Sessions</TabsTrigger>
            <TabsTrigger value="resources" className="rounded-xl flex-1 data-[state=active]:bg-background data-[state=active]:text-primary data-[state=active]:shadow-sm transition-all py-3 font-semibold">Resources</TabsTrigger>
          </TabsList>

          <TabsContent value="students" className="animate-in fade-in slide-in-from-bottom-2 duration-500">
            <Card className="bg-card border-border shadow-sm ring-1 ring-inset ring-black/5 dark:ring-white/10 rounded-2xl overflow-hidden">
              <CardHeader className="p-8 border-b border-border bg-muted/20">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <CardTitle className="text-2xl font-bold">Student Registrations</CardTitle>
                  <div className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      placeholder="Search students..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-11 w-full md:w-80 h-11 rounded-full border-border bg-muted/50 focus-visible:ring-primary/20 focus-visible:border-primary"
                    />
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-muted/10">
                      <TableHead className="py-4 pl-8">Name</TableHead>
                      <TableHead className="py-4">Email</TableHead>
                      <TableHead className="py-4">Grade</TableHead>
                      <TableHead className="py-4 pr-8">Registered</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredStudents.map((student) => (
                      <TableRow key={student.id} className="hover:bg-muted/30 transition-colors">
                        <TableCell className="py-5 pl-8 font-bold text-foreground">{student.full_name}</TableCell>
                        <TableCell className="py-5 text-muted-foreground">{student.email}</TableCell>
                        <TableCell className="py-5">
                          <Badge variant="outline" className="rounded-full px-3 py-1 font-semibold border-primary/20 text-primary">{student.current_grade}</Badge>
                        </TableCell>
                        <TableCell className="py-5 pr-8 text-muted-foreground font-medium">
                          {format(new Date(student.created_at), "MMM dd, yyyy")}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="sessions" className="animate-in fade-in slide-in-from-bottom-2 duration-500">
            <Card className="bg-card border-border shadow-sm ring-1 ring-inset ring-black/5 dark:ring-white/10 p-12 text-center">
              <CardHeader>
                <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Calendar className="w-10 h-10 text-primary" />
                </div>
                <CardTitle className="text-2xl font-bold">Counseling Sessions</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-lg mb-8 max-w-md mx-auto">Detailed session management and counselor assignments coming soon.</p>
                <Button variant="outline" className="rounded-full px-8 h-12 font-semibold">View Analytics</Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="resources" className="animate-in fade-in slide-in-from-bottom-2 duration-500">
            <Card className="bg-card border-border shadow-sm ring-1 ring-inset ring-black/5 dark:ring-white/10 p-12 text-center">
              <CardHeader>
                <div className="w-20 h-20 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
                  <BookOpen className="w-10 h-10 text-emerald-600 dark:text-emerald-400" />
                </div>
                <CardTitle className="text-2xl font-bold">Resource Management</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-lg mb-8 max-w-md mx-auto">Manage and publish new career guides, exam materials, and college information.</p>
                <Button onClick={() => navigate("/resources")} className="bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-500 dark:hover:bg-emerald-600 rounded-full px-8 h-12 font-bold text-white shadow-lg shadow-emerald-500/20">Manage Resources</Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </PageLayout>
  );
};

export default AdminDashboard;

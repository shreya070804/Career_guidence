import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { MapPin, ChevronRight, ArrowLeft, School } from "lucide-react";

import PageLayout from "@/components/PageLayout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";

import collegesData from "@/data/maharashtra_colleges.json";

/* -------- Program Detection -------- */

function detectPrograms(name: string) {

  const lower = name.toLowerCase();
  const programs: string[] = [];

  if (
    lower.includes("engineering") ||
    lower.includes("technology") ||
    lower.includes("technical")
  ) programs.push("Engineering");

  if (lower.includes("polytechnic"))
    programs.push("Polytechnic");

  if (
    lower.includes("medical") ||
    lower.includes("hospital") ||
    lower.includes("pharmacy") ||
    lower.includes("nursing") ||
    lower.includes("dental") ||
    lower.includes("health") ||
    lower.includes("ayurveda")
  ) programs.push("Medical");

  if (
    lower.includes("management") ||
    lower.includes("business") ||
    lower.includes("mba")
  ) programs.push("Management");

  if (lower.includes("law"))
    programs.push("Law");

  if (lower.includes("arts"))
    programs.push("Arts");

  if (lower.includes("science"))
    programs.push("Science");

  if (programs.length === 0)
    programs.push("General");

  return programs;
}

/* -------- Component -------- */

const CollegeFinder = () => {

  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("all");
  const [selectedType, setSelectedType] = useState("all");
  const [selectedProgram, setSelectedProgram] = useState("all");
  const [womenOnly, setWomenOnly] = useState("all");

  const [page, setPage] = useState(1);
  const pageSize = 20;

  /* Convert dataset */

  const colleges = useMemo(() => {

    return collegesData.map((c: any) => {

      const programs = detectPrograms(c.name);

      return {
        id: c.id,
        name: c.name,
        location: c.city || c.district,   // FIXED district issue
        type: c.type,
        women: c.women,
        programs
      };

    });

  }, []);

  /* District List */

  const locations = useMemo(() => {

    const districts = collegesData.map((c: any) => c.city || c.district);
    return Array.from(new Set(districts)).sort();

  }, []);

  /* College Types */

  const types = useMemo(() => {

    const allTypes = collegesData.map((c: any) => c.type);
    return Array.from(new Set(allTypes)).sort();

  }, []);

  const programs = [
    "Engineering",
    "Polytechnic",
    "Medical",
    "Management",
    "Law",
    "Arts",
    "Science"
  ];

  /* Filtering */

  const filteredColleges = useMemo(() => {

    return colleges.filter((college: any) => {

      const matchesSearch =
        college.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        college.location.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesLocation =
        selectedLocation === "all" ||
        college.location === selectedLocation;

      const matchesType =
        selectedType === "all" ||
        college.type === selectedType;

      const matchesProgram =
        selectedProgram === "all" ||
        college.programs.includes(selectedProgram);

      const matchesWomen =
        womenOnly === "all" ||
        (womenOnly === "yes" && college.women === true);

      return (
        matchesSearch &&
        matchesLocation &&
        matchesType &&
        matchesProgram &&
        matchesWomen
      );

    });

  }, [searchQuery, selectedLocation, selectedType, selectedProgram, womenOnly, colleges]);

  /* Pagination */

  const totalPages = Math.ceil(filteredColleges.length / pageSize);

  const paginatedColleges = filteredColleges.slice(
    (page - 1) * pageSize,
    page * pageSize
  );

  const start = filteredColleges.length === 0 ? 0 : (page - 1) * pageSize + 1;
  const end = Math.min(page * pageSize, filteredColleges.length);

  return (

    <PageLayout>

      <div className="max-w-7xl mx-auto px-6 py-10 space-y-8">

        {/* Header */}

        <header className="space-y-4">

          <Button
            variant="ghost"
            onClick={() => navigate("/")}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>

          <div>

            <div className="flex items-center gap-2 text-primary font-bold">
              <School className="w-4 h-4" />
              College Finder
            </div>

            <h1 className="text-3xl font-black mt-2">
              Search Colleges in Maharashtra
            </h1>

          </div>

        </header>

        {/* Filters */}

        <section className="bg-muted/40 p-4 rounded-xl grid md:grid-cols-5 gap-4">

          <Input
            placeholder="Search college or district"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setPage(1);
            }}
          />

          <Select value={selectedProgram} onValueChange={(v)=>{
            setSelectedProgram(v);
            setPage(1);
          }}>
            <SelectTrigger>
              <SelectValue placeholder="Program" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Programs</SelectItem>
              {programs.map((p) => (
                <SelectItem key={p} value={p}>{p}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={selectedLocation} onValueChange={(v)=>{
            setSelectedLocation(v);
            setPage(1);
          }}>
            <SelectTrigger>
              <SelectValue placeholder="District" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Districts</SelectItem>
              {locations.map((loc) => (
                <SelectItem key={loc} value={loc}>{loc}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={selectedType} onValueChange={(v)=>{
            setSelectedType(v);
            setPage(1);
          }}>
            <SelectTrigger>
              <SelectValue placeholder="College Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              {types.map((t) => (
                <SelectItem key={t} value={t}>{t}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={womenOnly} onValueChange={(v)=>{
            setWomenOnly(v);
            setPage(1);
          }}>
            <SelectTrigger>
              <SelectValue placeholder="Women Colleges" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Colleges</SelectItem>
              <SelectItem value="yes">Women Colleges Only</SelectItem>
            </SelectContent>
          </Select>

        </section>

        {/* Table */}

        <div className="border rounded-xl overflow-hidden">

          <table className="w-full text-sm">

            <thead className="bg-muted sticky top-0 z-10 text-left">

              <tr>

                <th className="p-4">College</th>
                <th className="p-4">District</th>
                <th className="p-4">Type</th>
                <th className="p-4 text-right">Action</th>

              </tr>

            </thead>

           
<tbody>
{paginatedColleges.map((college) => (

<tr key={college.id} className="border-t hover:bg-muted/40 transition">

{/* COLLEGE */}
<td className="p-4">

<div className="flex items-center gap-3">

<div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary">
{college.name.charAt(0)}
</div>

<div className="flex items-center gap-2">

<span className="font-semibold">
{college.name}
</span>

{college.women && (
  <Badge className="bg-rose-50 text-rose-600 border-rose-100 dark:bg-rose-900/30 dark:text-rose-400 dark:border-rose-800/30 font-black text-[10px] uppercase tracking-wider">
    Women Only
  </Badge>
)}

</div>

</div>

</td>

{/* DISTRICT */}
<td className="p-4 text-muted-foreground">
{college.location}
</td>

{/* TYPE */}
<td className="p-4">
<Badge variant="outline">
{college.type}
</Badge>
</td>

{/* ACTION */}
<td className="p-4 text-right">

<Button
size="sm"
onClick={() =>
navigate(`/college/${college.id}`, { state: { college } })
}
>

View
<ChevronRight className="ml-1 w-4 h-4" />

</Button>

</td>

</tr>

))}
</tbody>


          </table>

        </div>

        {/* Pagination */}

        <div className="flex justify-between items-center">

          <p className="text-sm text-muted-foreground">
            Showing {start} – {end} of {filteredColleges.length} colleges
          </p>

          <div className="flex gap-2">

            <Button
              variant="outline"
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
            >
              Previous
            </Button>

            <Button
              variant="outline"
              disabled={page === totalPages || totalPages === 0}
              onClick={() => setPage(page + 1)}
            >
              Next
            </Button>

          </div>

        </div>

      </div>

    </PageLayout>

  );

};

export default CollegeFinder
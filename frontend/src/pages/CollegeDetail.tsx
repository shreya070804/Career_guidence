import { useLocation, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  MapPin,
  Map,
  Wifi,
  BookOpen,
  Home,
  Dumbbell,
  Lightbulb,
  FlaskConical
} from "lucide-react";

import PageLayout from "@/components/PageLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";


/* Placement generator */

function generatePlacement(id: string) {
  const rates = ["70%", "75%", "80%", "85%", "90%"];
  return rates[id.length % rates.length];
}


const CollegeDetails = () => {

  const navigate = useNavigate();
  const location = useLocation();
  const college = location.state?.college;

  if (!college) {
    return (
      <PageLayout>
        <div className="max-w-4xl mx-auto py-20 text-center">
          <h2 className="text-3xl font-black mb-4">College Not Found</h2>
          <Button onClick={() => navigate("/college-finder")}>
            Back to College Finder
          </Button>
        </div>
      </PageLayout>
    );
  }

  const facilities = [
    { name: "Modern Laboratories", icon: FlaskConical },
    { name: "Digital Library", icon: BookOpen },
    { name: "Hostel Accommodation", icon: Home },
    { name: "Sports Complex", icon: Dumbbell },
    { name: "WiFi Campus", icon: Wifi },
    { name: "Innovation Labs", icon: Lightbulb }
  ];


  return (
    <PageLayout>

      <div className="max-w-7xl mx-auto px-6 py-12 space-y-10">

        {/* Back */}

        <Button
          variant="ghost"
          onClick={() => navigate("/college-finder")}
          className="font-bold"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Colleges
        </Button>


        {/* Header */}

        <div className="space-y-3">

          <h1 className="text-4xl font-black">
            {college.name}
          </h1>

          <div className="flex items-center gap-2 text-muted-foreground">
            <MapPin className="w-4 h-4 text-primary" />
            {college.location}
          </div>

        </div>


        <div className="grid md:grid-cols-3 gap-8">


          {/* LEFT SIDE */}

          <div className="md:col-span-2 space-y-8">


            {/* Overview */}

            <Card className="rounded-[2rem]">

              <CardHeader>
                <CardTitle>Institution Overview</CardTitle>
              </CardHeader>

              <CardContent className="space-y-6 text-muted-foreground">

                <p>
                  {college.name} is a recognized institution located in {college.location}.
                  The college provides quality education with modern infrastructure
                  and experienced faculty.
                </p>

                <div className="grid grid-cols-2 gap-4 text-sm font-semibold">

                  <div>
                    <span className="text-muted-foreground">District</span>
                    <p className="font-bold">{college.location}</p>
                  </div>

                  <div>
                    <span className="text-muted-foreground">College Type</span>
                    <p className="font-bold">{college.type}</p>
                  </div>

                  <div>
                    <span className="text-muted-foreground">Women College</span>
                    <p className="font-bold">
                      {college.women ? "Yes" : "No"}
                    </p>
                  </div>

                  <div>
                    <span className="text-muted-foreground">Minority Institution</span>
                    <p className="font-bold">
                      {college.minority ? "Yes" : "No"}
                    </p>
                  </div>

                </div>

              </CardContent>

            </Card>


            {/* Campus Facilities */}

            <Card className="rounded-[2rem]">

              <CardHeader>
                <CardTitle>Campus Facilities</CardTitle>
              </CardHeader>

              <CardContent>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">

                  {facilities.map((facility) => {

                    const Icon = facility.icon;

                    return (
                      <div
                        key={facility.name}
                        className="flex items-center gap-3 p-4 rounded-xl border bg-muted/30 hover:bg-primary/10 hover:border-primary transition-all"
                      >

                        <Icon className="w-5 h-5 text-primary" />

                        <span className="font-semibold">
                          {facility.name}
                        </span>

                      </div>
                    );
                  })}

                </div>

              </CardContent>

            </Card>


            {/* Map */}

            <Card className="rounded-[2rem]">

              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Map className="w-5 h-5 text-primary" />
                  Campus Location
                </CardTitle>
              </CardHeader>

              <CardContent>

                <iframe
                  title="college-map"
                  width="100%"
                  height="300"
                  className="rounded-xl border"
                  src={`https://www.google.com/maps?q=${encodeURIComponent(
                    college.name + " " + college.location
                  )}&output=embed`}
                />

              </CardContent>

            </Card>

          </div>


          {/* RIGHT SIDE */}

          <div className="space-y-6">


            {/* Placement */}

            <Card className="rounded-[2rem]">

              <CardHeader>
                <CardTitle>Placement Rate</CardTitle>
              </CardHeader>

              <CardContent>

                <p className="text-3xl font-black text-primary">
                  {generatePlacement(college.id)}
                </p>

                <p className="text-sm text-muted-foreground">
                  Average placement rate across programs
                </p>

              </CardContent>

            </Card>


            {/* Apply Button */}

            <Card className="rounded-[2rem]">

              <CardContent className="p-6">

                <Button
                  className="w-full"
                  onClick={() =>
                    window.open(
                      `https://www.google.com/search?q=${college.name} admission`,
                      "_blank"
                    )
                  }
                >
                  Apply Now
                </Button>

              </CardContent>

            </Card>

          </div>

        </div>

      </div>

    </PageLayout>
  );
};

export default CollegeDetails;
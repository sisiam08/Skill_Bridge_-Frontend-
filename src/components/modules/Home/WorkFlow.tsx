import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export function WorkFlow() {
  const steps = [
    {
      icon: "person_search",
      title: "Find Your Tutor",
      desc: "Browse thousands of vetted professional tutors across 100+ different subjects.",
    },
    {
      icon: "calendar_month",
      title: "Book a Session",
      desc: "Schedule a 1-on-1 video session at a time that works best for your personal schedule.",
    },
    {
      icon: "rocket_launch",
      title: "Start Learning",
      desc: "Connect via our interactive virtual classroom and accelerate your learning journey.",
    },
  ];

  return (
    <section className="py-16 md:py-20 bg-[#f8f6f6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#221610]">
            How SkillBridge Works
          </h2>

          <Separator className="h-1.5 w-20 bg-[#ec5b13] mx-auto mt-4 rounded-full" />
        </div>

        {/* Grid */}
        <div className="grid gap-8 md:grid-cols-3">
          {steps.map((step) => (
            <Card
              key={step.title}
              className="bg-white border border-gray-100 rounded-2xl text-center shadow-md hover:shadow-xl transition-all duration-300"
            >
              <CardContent className="p-8 flex flex-col items-center">
                {/* Icon Circle */}
                <div className="size-16 bg-[#ec5b13]/10 text-[#ec5b13] rounded-full flex items-center justify-center mb-6">
                  <span className="material-symbols-outlined text-3xl">
                    {step.icon}
                  </span>
                </div>

                <CardTitle className="text-xl font-bold text-[#221610] mb-3">
                  {step.title}
                </CardTitle>

                <CardDescription className="text-[#4b4b4b] text-sm leading-relaxed">
                  {step.desc}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

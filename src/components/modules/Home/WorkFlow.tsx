import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function WorkFlow() {
  const steps = [
    {
      icon: "person_search",
      title: "Find Your Tutor",
      desc: "Browse hundreds of vetted professional tutors across 20+ different subjects.",
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
    <section className="py-16 md:py-20 bg-brand-surface dark:bg-brand-surface">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-14">
          <h2 className="ui-title-section-lg">
            How SkillBridge Works
          </h2>

          <Separator className="h-1.5 w-20 bg-brand mx-auto mt-4 rounded-full" />
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {steps.map((step) => (
            <Card
              key={step.title}
              className="bg-white dark:bg-brand-surface border border-gray-100 dark:border-gray-800 rounded-2xl text-center shadow-md hover:shadow-xl transition-all duration-300"
            >
              <CardContent className="p-8 flex flex-col items-center">
                <div className="size-16 bg-brand/10 text-brand rounded-full flex items-center justify-center mb-6">
                  <span className="material-symbols-outlined text-3xl">
                    {step.icon}
                  </span>
                </div>

                <CardTitle className="ui-title-card mb-3">
                  {step.title}
                </CardTitle>

                <CardDescription className="text-[#4b4b4b] dark:text-slate-300 text-sm leading-relaxed">
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


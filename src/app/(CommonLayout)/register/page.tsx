import RegisterForm from "@/components/modules/Authentication/register-form";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import registerImg from "../../../../public/register-page-content.png";

export default function RegisterPage() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 mx-2">
      <Card className="hidden lg:block relative bg-primary/10 overflow-hidden">
        <div>
          <div className="absolute inset-0 bg-linear-to-br from-primary/20 to-primary/5" />

          <CardContent className="relative h-full flex flex-col justify-center p-12 space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl font-black text-slate-900 leading-tight">
                Unlock your potential with{" "}
                <span className="text-primary">SkillBridge</span>
              </h1>

              <p className="text-lg text-slate-600 dark:text-slate-400">
                Join over 50,000 students and tutors worldwide. Start your
                learning journey or share your expertise today.
              </p>
            </div>

            <div className="space-y-6">
              {[
                { icon: "verified", text: "Certified Tutors & Courses" },
                { icon: "group", text: "Collaborative Learning Community" },
                { icon: "trending_up", text: "Skill-based Career Growth" },
              ].map((item) => (
                <div key={item.text} className="flex items-center gap-4">
                  <div className="bg-primary/20 p-2 rounded-lg">
                    <span className="material-symbols-outlined text-primary">
                      {item.icon}
                    </span>
                  </div>
                  <span className="font-medium text-slate-700 dark:text-slate-300">
                    {item.text}
                  </span>
                </div>
              ))}
            </div>

            <div className="pt-8">
                <Image src={registerImg} alt="register-hero" className="w-full h-48 content-fil rounded-xl bg-cover bg-center shadow-lg"/>
            </div>
          </CardContent>
        </div>
      </Card>
      <RegisterForm />
    </div>
  );
}

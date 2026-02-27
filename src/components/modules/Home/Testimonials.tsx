import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function Testimonials() {
  const testimonials = [
    {
      name: "Emily Watson",
      role: "College Student",
      text: "SkillBridge made finding a calculus tutor so easy. Alex explained concepts that I'd been struggling with for weeks in just one session!",
    },
    {
      name: "David Miller",
      role: "UX Design Student",
      text: "As a career changer, Sarah was invaluable. Her UX insights helped me land my first junior role. Highly recommend this platform.",
    },
    {
      name: "Sofia Lopez",
      role: "Lifelong Learner",
      text: "Great platform! I've been learning Spanish with Maria and my confidence has improved tremendously in just two months.",
    },
  ]

  return (
    <section className="py-16 md:py-20 bg-[#ec5b13]/5 dark:bg-[#221610]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="text-center mb-14">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#221610] dark:text-white">
            What Students Are Saying
          </h2>

          <div className="h-1.5 w-20 bg-[#ec5b13] mx-auto mt-4 rounded-full" />
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((item, index) => (
            <Card
              key={index}
              className="bg-white dark:bg-[#221610]/80 border border-gray-100 dark:border-gray-800 rounded-2xl shadow-md hover:shadow-xl transition-all"
            >
              <CardContent className="p-8 space-y-6">

                <div className="text-[#ec5b13] text-lg">
                  ★★★★★
                </div>

                <p className="italic text-sm text-[#4b4b4b] dark:text-gray-300 leading-relaxed">
                  "{item.text}"
                </p>

                <div className="flex items-center gap-4">
                  <Avatar className="size-12">
                    <AvatarImage src="/user.png" />
                    <AvatarFallback>U</AvatarFallback>
                  </Avatar>

                  <div>
                    <h4 className="font-bold text-[#221610] dark:text-white text-sm">
                      {item.name}
                    </h4>

                    <p className="text-xs text-gray-500">
                      {item.role}
                    </p>
                  </div>
                </div>

              </CardContent>
            </Card>
          ))}
        </div>

      </div>
    </section>
  )
}
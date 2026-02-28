import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export default function Footer() {
  const footerLinks = [
    {
      title: "Company",
      links: ["About Us", "Careers", "Press", "Contact"],
    },
    {
      title: "Support",
      links: [
        "Help Center",
        "Safety Center",
        "Student Guidelines",
        "Tutor Guidelines",
      ],
    },
    {
      title: "Join Us",
      links: [
        "Become a Tutor",
        "Partner Program",
        "SkillBridge for Business",
        "Gift Cards",
      ],
    },
  ];

  return (
    <footer className="bg-[#f8f6f6] dark:bg-[#221610] border-t border-gray-200 dark:border-gray-800 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-4">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="size-8 bg-[#ec5b13] rounded-lg flex items-center justify-center text-white">
                <span className="material-symbols-outlined">school</span>
              </div>

              <span className="text-xl font-bold text-[#221610] dark:text-white">
                SkillBridge
              </span>
            </div>

            <p className="text-sm text-gray-500 leading-relaxed">
              The world&apos;s leading marketplace for 1-on-1 expert tutoring. Master
              any skill with personal guidance.
            </p>
          </div>

          {footerLinks.map((section) => (
            <div key={section.title}>
              <h4 className="font-bold mb-6 text-[#221610] dark:text-white">
                {section.title}
              </h4>

              <ul className="flex flex-col gap-3 text-sm text-gray-500">
                {section.links.map((link) => (
                  <li key={link}>
                    <Button
                      asChild
                      variant="link"
                      className="font-normal hover:text-[#ec5b13] transition-colors p-0 h-auto text-inherit no-underline hover:no-underline"
                    >
                      <Link href="#">{link}</Link>
                    </Button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="pt-8 mt-12">
          <Separator className="bg-gray-200 dark:bg-gray-800" />
          <div className="pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500">
            <p>&copy; 2024 SkillBridge Inc. All rights reserved.</p>

            <div className="flex gap-6">
              {["Privacy Policy", "Terms of Service", "Cookie Settings"].map(
                (item) => (
                  <Button
                    key={item}
                    asChild
                    variant="link"
                    className="font-normal hover:text-[#ec5b13] transition-colors p-0 h-auto text-inherit no-underline hover:no-underline text-xs"
                  >
                    <Link href="#">{item}</Link>
                  </Button>
                ),
              )}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import {
  Facebook,
  GraduationCap,
  Instagram,
  Linkedin,
  Twitter,
} from "lucide-react";

const navLinks = [
  {
    title: "Explore",
    links: [
      { label: "Home", href: "/" },
      { label: "Find Tutors", href: "/find_tutors" },
      { label: "Featured Tutors", href: "/#featured-tutors" },
      { label: "Login", href: "/login" },
      { label: "Register", href: "/register" },
    ],
  },
  {
    title: "For Students",
    links: [
      { label: "Find a Tutor", href: "/find_tutors" },
      { label: "Book a Session", href: "/find_tutors" },
      { label: "Student Dashboard", href: "/dashboard" },
    ],
  },
  {
    title: "For Tutors",
    links: [
      { label: "Become a Tutor", href: "/register" },
      { label: "Tutor Dashboard", href: "/tutor-dashboard" },
      { label: "Manage Availability", href: "/tutor-dashboard/availability" },
    ],
  },
];

const socialLinks = [
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-16 border-t border-gray-200 bg-[#f8f6f6] pb-10 pt-16 dark:border-gray-800 dark:bg-[#221610]">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-4">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="flex w-fit items-center gap-2">
              <div className="flex size-8 items-center justify-center rounded-lg bg-[#ec5b13] text-white">
                <GraduationCap className="size-5" strokeWidth={2.2} />
              </div>
              <span className="text-xl font-bold text-[#221610] dark:text-white">
                SkillBridge
              </span>
            </Link>

            <p className="text-sm leading-relaxed text-gray-500 dark:text-gray-400">
              The world&apos;s leading marketplace for 1-on-1 expert tutoring.
              Master any skill with personal guidance.
            </p>

            <div className="flex items-center gap-2 pt-1">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <Link
                  key={label}
                  href={href}
                  aria-label={label}
                  className="flex size-8 items-center justify-center rounded-lg border border-gray-200 text-gray-500 transition-colors hover:border-[#ec5b13] hover:text-[#ec5b13] dark:border-gray-700 dark:text-gray-400"
                >
                  <Icon className="size-4" />
                </Link>
              ))}
            </div>
          </div>

          {/* Nav columns */}
          {navLinks.map((section) => (
            <div key={section.title}>
              <h4 className="mb-5 text-sm font-bold text-[#221610] dark:text-white">
                {section.title}
              </h4>
              <ul className="flex flex-col gap-3 text-sm text-gray-500 dark:text-gray-400">
                {section.links.map(({ label, href }) => (
                  <li key={label}>
                    <Link
                      href={href}
                      className="transition-colors hover:text-[#ec5b13]"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12">
          <Separator className="bg-gray-200 dark:bg-gray-800" />
          <div className="flex items-center justify-center pt-8 text-xs text-gray-500 md:flex-row dark:text-gray-400">
            <p>&copy; {currentYear} SkillBridge. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

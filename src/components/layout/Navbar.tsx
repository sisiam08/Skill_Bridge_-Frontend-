"use client";

import { Button } from "@/components/ui/button";
import { useMobileMenu } from "@/hooks";
import Link from "next/link";
import { ModeToggle } from "./ModeToggle";

export default function Navbar({ isLoggedIn }: { isLoggedIn: boolean }) {
  const { mobileMenuOpen, toggleMobileMenu, closeMobileMenu } = useMobileMenu();

  return (
    <nav className="sticky top-0 z-50 w-full bg-[#f8f6f6]/80 dark:bg-[#221610]/80 backdrop-blur-md border-b border-[#ec5b13]/10 dark:border-[#ec5b13]/20">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex justify-between items-center h-18">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="size-9 bg-[#ec5b13] rounded-lg flex items-center justify-center text-white">
              <span className="material-symbols-outlined">school</span>
            </div>

            <span className="text-xl font-bold tracking-tight text-[#221610] dark:text-white">
              SkillBridge
            </span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-6">
            <Link
              className="text-sm font-medium text-[#221610] dark:text-slate-100 hover:text-[#ec5b13] transition-colors"
              href="/"
            >
              Home
            </Link>

            <Link
              className="text-sm font-medium text-[#221610] dark:text-slate-100 hover:text-[#ec5b13] transition-colors"
              href="/#featured-tutors"
            >
              Featured Tutor
            </Link>

            {!isLoggedIn && (
              <>
                <Link
                  className="text-sm font-medium text-[#221610] dark:text-slate-100 hover:text-[#ec5b13] transition-colors"
                  href="/login"
                >
                  Login
                </Link>

                <Link
                  className="text-sm font-medium text-[#221610] dark:text-slate-100 hover:text-[#ec5b13] transition-colors"
                  href="/register"
                >
                  Register
                </Link>

                <ModeToggle />

                <Button className="bg-[#ec5b13] hover:bg-[#d44f10] text-white px-6 py-2.5 rounded-xl text-sm font-semibold transition-all hover:scale-105">
                  <Link href="/find_tutors">Find Tutors</Link>
                </Button>
              </>
            )}

            {isLoggedIn && (
              <>
                <Link
                  className="text-sm font-medium text-[#221610] dark:text-slate-100 hover:text-[#ec5b13] transition-colors"
                  href="/dashboard"
                >
                  Dashboard
                </Link>

                <Link
                  className="text-sm font-medium text-[#221610] dark:text-slate-100 hover:text-[#ec5b13] transition-colors"
                  href="/dashboard/profile"
                >
                  Profile
                </Link>

                <Button className="bg-[#ec5b13] hover:bg-[#d44f10] text-white px-6 py-2.5 rounded-xl text-sm font-semibold transition-all hover:scale-105">
                  <Link href="/find_tutors">Book Tutor</Link>
                </Button>
              </>
            )}
          </div>

          {/* Mobile Icon */}
          <button
            onClick={toggleMobileMenu}
            className="md:hidden flex items-center p-2 hover:text-[#ec5b13] transition-colors"
          >
            <span className="material-symbols-outlined text-[#221610] dark:text-white">
              {mobileMenuOpen ? "close" : "menu"}
            </span>
          </button>
          {/* Mobile Sidebar Menu */}
          <div
            className={`fixed top-0 right-0 h-screen w-72 bg-[#f8f6f6] dark:bg-[#221610] shadow-xl md:hidden z-50 transform transition-transform duration-300 ease-in-out ${
              mobileMenuOpen ? "translate-x-0" : "translate-x-full"
            }`}
          >
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-5 border-b border-[#ec5b13]/10 dark:border-[#ec5b13]/20">
                <button
                  onClick={closeMobileMenu}
                  className="p-2 hover:text-[#ec5b13] transition-colors"
                >
                  <span className="material-symbols-outlined text-xl text-[#221610] dark:text-white">
                    close
                  </span>
                </button>

                <ModeToggle />
              </div>

              {/* Menu Content */}
              <div className="flex-1 overflow-y-auto px-6 py-6 flex flex-col gap-4">
                <Link
                  href="/"
                  onClick={closeMobileMenu}
                  className="text-sm font-medium text-[#221610] dark:text-slate-100 hover:text-[#ec5b13] transition-colors py-2.5"
                >
                  Home
                </Link>

                <Link
                  href="/#featured-tutors"
                  onClick={closeMobileMenu}
                  className="text-sm font-medium text-[#221610] dark:text-slate-100 hover:text-[#ec5b13] transition-colors py-2.5"
                >
                  Featured Tutor
                </Link>

                {!isLoggedIn && (
                  <>
                    <Link
                      href="/login"
                      onClick={closeMobileMenu}
                      className="text-sm font-medium text-[#221610] dark:text-slate-100 hover:text-[#ec5b13] transition-colors py-2.5"
                    >
                      Login
                    </Link>

                    <Link
                      href="/register"
                      onClick={closeMobileMenu}
                      className="text-sm font-medium text-[#221610] dark:text-slate-100 hover:text-[#ec5b13] transition-colors py-2.5"
                    >
                      Register
                    </Link>

                    <Button className="w-full bg-[#ec5b13] hover:bg-[#d44f10] text-white px-6 py-2.5 rounded-xl text-sm font-semibold transition-all hover:scale-105">
                      <Link href="/find_tutors" onClick={closeMobileMenu}>
                        Find Tutors
                      </Link>
                    </Button>
                  </>
                )}

                {isLoggedIn && (
                  <>
                    <Link
                      href="#"
                      className="text-sm font-medium text-[#221610] dark:text-slate-100 hover:text-[#ec5b13] transition-colors py-2.5"
                    >
                      Dashboard
                    </Link>

                    <Link
                      href="#"
                      className="text-sm font-medium text-[#221610] dark:text-slate-100 hover:text-[#ec5b13] transition-colors py-2.5"
                    >
                      Profile
                    </Link>

                    <Button className="w-full bg-[#ec5b13] hover:bg-[#d44f10] text-white px-6 py-2.5 rounded-xl text-sm font-semibold transition-all hover:scale-105">
                      <Link href="/find_tutors" onClick={closeMobileMenu}>
                        Book Tutor
                      </Link>
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

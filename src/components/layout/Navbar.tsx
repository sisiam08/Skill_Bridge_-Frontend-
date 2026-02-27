"use client";

import { Button } from "@/components/ui/button";
import { useMobileMenu } from "@/hooks";
import Link from "next/link";
import { ModeToggle } from "./ModeToggle";

export default function Navbar({ isLoggedIn }: { isLoggedIn: boolean }) {
  const { mobileMenuOpen, toggleMobileMenu, closeMobileMenu } = useMobileMenu();

  return (
    <nav className="sticky top-0 z-50 w-full bg-[#f8f6f6]/80 backdrop-blur-md border-b border-[#ec5b13]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center gap-2 ">
            <div className="size-8 bg-[#ec5b13] rounded-lg flex items-center justify-center text-white">
              <span className="material-symbols-outlined">school</span>
            </div>

            <span className="text-xl font-bold tracking-tight text-[#221610]">
              SkillBridge
            </span>
          </div>

          {/* Desktop Menu */}
          {!isLoggedIn && (
            <div className="hidden md:flex items-center gap-8">
              <Link
                className="text-sm font-medium text-[#221610] hover:text-[#ec5b13] transition-colors"
                href="/"
              >
                Home
              </Link>
              <Link
                className="text-sm font-medium text-[#221610] hover:text-[#ec5b13] transition-colors"
                href="/"
              >
                Featured Tutor
              </Link>

              <Link
                className="text-sm font-medium text-[#221610] hover:text-[#ec5b13] transition-colors"
                href="/login"
              >
                Login
              </Link>

              <ModeToggle />

              <Link
                className="text-sm font-medium text-[#221610] hover:text-[#ec5b13] transition-colors"
                href="/register"
              >
                Register
              </Link>

              <Button className="bg-[#ec5b13] hover:bg-[#d44f10] text-white px-5 py-2 rounded-xl text-sm font-bold transition-all hover:scale-105">
                <Link href={"/find_tutors"}>Find Tutors</Link>
              </Button>
            </div>
          )}

          {isLoggedIn && (
            <div className="hidden md:flex items-center gap-8">
              <Link
                className="text-sm font-medium text-[#221610] hover:text-[#ec5b13] transition-colors"
                href="#"
              >
                Dashboard
              </Link>

              <Link
                className="text-sm font-medium text-[#221610] hover:text-[#ec5b13] transition-colors"
                href="#"
              >
                Profile
              </Link>

              <Button className="bg-[#ec5b13] hover:bg-[#d44f10] text-white px-5 py-2 rounded-xl text-sm font-bold transition-all hover:scale-105">
                <Link href={"/find_tutors"}>Book Tutor</Link>
              </Button>
            </div>
          )}

          {/* Mobile Menu Icon */}
          <button
            onClick={toggleMobileMenu}
            className="md:hidden flex items-center cursor-pointer hover:text-[#ec5b13] transition-colors"
          >
            <span className="material-symbols-outlined text-[#221610]">
              {mobileMenuOpen ? "close" : "menu"}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Menu Backdrop */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 md:hidden z-40"
          onClick={closeMobileMenu}
        />
      )}

      {/* Mobile Sidebar Menu */}
      <div
        className={`fixed top-0 right-0 h-screen w-64 bg-[#f8f6f6] shadow-lg md:hidden z-50 transform transition-transform duration-300 ease-in-out ${
          mobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Close Button */}
          <div className="flex justify-end p-4 border-b border-[#ec5b13]/10">
            <button
              onClick={closeMobileMenu}
              className="p-2 hover:text-[#ec5b13] transition-colors"
            >
              <span className="material-symbols-outlined text-xl text-[#221610]">
                close
              </span>
            </button>
          </div>

          {/* Menu Items */}
          <div className="flex-1 overflow-y-auto p-4">
            {!isLoggedIn && (
              <div className="flex flex-col gap-4">
                <Link
                  className="text-sm font-medium text-[#221610] hover:text-[#ec5b13] transition-colors block py-2 px-2"
                  href="/"
                >
                  Home
                </Link>

                <Link
                  className="text-sm font-medium text-[#221610] hover:text-[#ec5b13] transition-colors block py-2 px-2"
                  href="/"
                >
                  Featured Tutor
                </Link>

                <Link
                  className="text-sm font-medium text-[#221610] hover:text-[#ec5b13] transition-colors block py-2 px-2"
                  href="/login"
                >
                  Login
                </Link>

                <Link
                  className="text-sm font-medium text-[#221610] hover:text-[#ec5b13] transition-colors block py-2 px-2"
                  href="/register"
                >
                  Register
                </Link>

                <Button className="w-full bg-[#ec5b13] hover:bg-[#d44f10] text-white px-5 py-2 rounded-xl text-sm font-bold transition-all hover:scale-105">
                  <Link href={"/find_tutors"}>Find Tutors</Link>
                </Button>
              </div>
            )}

            {isLoggedIn && (
              <div className="flex flex-col gap-4">
                <Link
                  className="text-sm font-medium text-[#221610] hover:text-[#ec5b13] transition-colors block py-2 px-2"
                  href="#"
                >
                  Dashboard
                </Link>

                <Link
                  className="text-sm font-medium text-[#221610] hover:text-[#ec5b13] transition-colors block py-2 px-2"
                  href="#"
                >
                  Profile
                </Link>

                <Button className="w-full bg-[#ec5b13] hover:bg-[#d44f10] text-white px-5 py-2 rounded-xl text-sm font-bold transition-all hover:scale-105">
                  <Link href={"/find_tutors"}>Book Tutor</Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

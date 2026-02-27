import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function HeroSection() {
  return (
    <section className="relative py-16 md:py-20 overflow-hidden bg-[#f8f6f6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* LEFT CONTENT */}
          <div className="flex flex-col gap-6 md:gap-8 text-center lg:text-left">

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#ec5b13]/10 text-[#ec5b13] text-xs font-bold uppercase tracking-wider w-fit mx-auto lg:mx-0">
              <span className="material-symbols-outlined text-sm">
                auto_awesome
              </span>
              Unlock Your Potential
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-6xl font-black leading-tight tracking-tight text-[#221610]">
              Connect with Expert Tutors,
              <span className="text-[#ec5b13] block">
                Learn Anything
              </span>
            </h1>

            <p className="text-base md:text-lg text-[#4b4b4b] leading-relaxed max-w-lg mx-auto lg:mx-0">
              Find the perfect mentor to help you master new skills with personalized one-on-one sessions tailored to your goals.
            </p>

            {/* Search Box */}
            <div className="flex flex-col gap-4 max-w-xl mx-auto lg:mx-0">

              <div className="flex flex-col md:flex-row gap-2 bg-white p-2 rounded-2xl shadow-xl shadow-[#ec5b13]/5 border border-[#ec5b13]/10">

                <div className="flex-1 flex items-center px-4 gap-3 border-b md:border-b-0 md:border-r border-gray-100">

                  <span className="text-[#ec5b13] material-symbols-outlined">
                    search
                  </span>

                  <Input
                    placeholder="Search subjects (e.g. Physics, Coding)"
                    className="border-none focus-visible:ring-0 bg-transparent text-[#221610] placeholder:text-gray-400"
                  />

                </div>

                <Button className="bg-[#ec5b13] hover:bg-[#d44f10] text-white px-8 py-3 rounded-xl font-bold transition-all w-full md:w-auto">
                  Search
                </Button>

              </div>

              {/* Filters */}
              <div className="flex flex-wrap justify-center lg:justify-start gap-2">

                {["Category", "Rating"].map((item) => (
                  <button
                    key={item}
                    className="flex items-center gap-2 px-4 py-2 text-[#221610] bg-white border border-gray-200 rounded-xl text-xs font-semibold hover:border-[#ec5b13] transition-colors"
                  >
                    <span>{item}</span>
                    <span className="material-symbols-outlined text-sm">
                      expand_more
                    </span>
                  </button>
                ))}

              </div>

            </div>
          </div>

          {/* RIGHT IMAGE */}
          <div className="relative flex justify-center">

            <div className="absolute -top-10 -right-10 w-56 md:w-64 h-56 md:h-64 bg-[#ec5b13]/20 rounded-full blur-3xl" />

            <div className="absolute -bottom-10 -left-10 w-40 md:w-48 h-40 md:h-48 bg-[#ec5b13]/10 rounded-full blur-2xl" />

            <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-[#ec5b13]/20 aspect-video bg-gray-200">

              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBNBLNm1ldIYYoTjuWuvamb5vDu_sMehiNV-NZHyrix-D9kr-IqiO5yaUf2y9ckuWtxGyTw-gFjHA7_L1sjgIzIVX4wambj4E7l85UhdBTFlOH4Y_fTcrEGctyUONvJ4c3OuPHJtN3Dakb1jXTzFj0XeM-YGn086LXmOT9it_X4-t_iDsX27hPBtXRbRV46YRkopNQXOCAmDShiwEYAfEDj8hTN7O6EhH76x8EB3jQOR3ms2DrH4RsDI6QFwIuNImjJ1E9AWXI-3w"
                alt="Tutor and student"
                className="w-full h-full object-cover"
              />

            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
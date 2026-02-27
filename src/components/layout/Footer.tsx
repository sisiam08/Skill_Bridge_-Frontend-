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
              The world's leading marketplace for 1-on-1 expert tutoring. Master
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
                    <a
                      href="#"
                      className="hover:text-[#ec5b13] transition-colors"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="pt-8 mt-12 border-t border-gray-200 dark:border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500">
          <p>© 2024 SkillBridge Inc. All rights reserved.</p>

          <div className="flex gap-6">
            <a href="#" className="hover:text-[#ec5b13] transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-[#ec5b13] transition-colors">
              Terms of Service
            </a>
            <a href="#" className="hover:text-[#ec5b13] transition-colors">
              Cookie Settings
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

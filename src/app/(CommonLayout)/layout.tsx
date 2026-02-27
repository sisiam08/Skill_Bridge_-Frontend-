import Head from "@/components/layout/Head";
import Navbar from "@/components/layout/Navbar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-background-light dark:bg-background-dark min-h-screen font-display text-slate-900 dark:text-slate-100 transition-colors duration-200">
      <Head />
      <Navbar isLoggedIn={false} />
      <main>{children}</main>
    </div>
  );
}

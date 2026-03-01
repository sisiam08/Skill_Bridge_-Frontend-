import Head from "@/components/layout/Head";
import Navbar from "@/components/layout/Navbar";
import { UserService } from "@/services/user.service";

export default async function CommonLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await UserService.getSession();
  let isLoggedIn = false;

  if (session?.data?.user) {
    isLoggedIn = true;
  }

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-200">
      <Head />
      <Navbar isLoggedIn={isLoggedIn} />
      <main>{children}</main>
    </div>
  );
}

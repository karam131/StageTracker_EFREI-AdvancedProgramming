import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "/styles/globals.css";
import NavbarDashboard from "@/components/NavbarDashboard";
import { auth } from "@/auth";
import AccessDenied from "../../accessDenied";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Generated by create next app",
};

export default async function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (session?.user.role !== "ADMIN") {
    return <AccessDenied />;
  }
  return (
    <html lang="en">
      <body>
        <main className="h-[100dvh] w-full">
          <div className="flex flex-col h-full w-full">
            <div className="flex h-[80px] w-full">
              <NavbarDashboard
                role={session.user.role}
                email={session.user.email}
              />
            </div>
            <div className="flex h-full w-full">{children}</div>
          </div>
        </main>
      </body>
    </html>
  );
}

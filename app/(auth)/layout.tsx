import Navbar from "@/components/Navbar";
import { FC, ReactNode } from "react";

interface AuthLayoutProps {
  children: ReactNode;
}
const AuthLayout: FC<AuthLayoutProps> = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <div className="flex flex-col justify-center h-[100dvh] w-full ">
          <Navbar />
          <div className="flex self-center">{children}</div>
        </div>
      </body>
    </html>
  );
};

export default AuthLayout;

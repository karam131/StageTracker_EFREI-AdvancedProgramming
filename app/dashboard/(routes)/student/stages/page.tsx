import { auth } from "@/auth";
import NewInternship from "@/components/newInternship";

export default async function Internship() {
  // const session = await auth();
  // session?.user.name
  return (
    <div className="w-full h-full">
      <NewInternship/>
    </div>
  );
}

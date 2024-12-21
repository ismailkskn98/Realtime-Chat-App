import { ClimbingBoxLoader } from "react-spinners";

export default function Loading() {
  return (
    <section className="bg-gradient-to-tl from-slate-950 to-slate-800 h-screen w-screen flex items-center justify-center">
      <ClimbingBoxLoader size={25} color="#1ba291" />
    </section>
  );
}

import { useLottie } from "lottie-react";
import lottieJson from "@/assets/lottie-json.json";

export default function EmptyContainer() {
  const { View } = useLottie({
    animationData: lottieJson,
    loop: true,
    autoplay: true,
    style: {
      width: "200px",
      height: "200px",
    },
  });
  return <section className="flex-1 hidden md:flex flex-col items-center justify-center bg-[#1b1c24]">{View}</section>;
}

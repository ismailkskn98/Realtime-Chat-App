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
  return (
    <section className="flex-1 hidden md:flex flex-col items-center justify-center bg-[#1b1c24] gap-10">
      {View}
      <article className="text-opacity-80 text-white flex flex-col gap-5 items-center text-3xl lg:text-4xl transition-all duration-300 text-center px-4">
        <h3 className="poppins-medium capitalize">
          selam<span className="text-purple-500">!</span> <span className="text-purple-500">sohbet</span> uygulamasına hoş geldiniz<span className="text-purple-500">.</span>
        </h3>
      </article>
    </section>
  );
}

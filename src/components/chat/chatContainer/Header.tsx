import { RiCloseFill } from "react-icons/ri";

export default function ChatHeader() {
  return (
    <header className="basis-20 shrink-0 border-b-2 border-[#2f303b] flex items-center justify-between px-20">
      <article className="flex items-center gap-5">
        <div className="flex items-center justify-center gap-3">Sohbet adı veya Grup adı</div>
        <div className="flex items-center justify-center gap-5">
          <button className="text-neutral-500 hover:text-white focus:border-none focus:outline-none focus:text-white transition-all duration-300">
            <RiCloseFill className="text-2xl" />
          </button>
        </div>
      </article>
    </header>
  );
}

import NewDM from "./newDM";
import ProfileInfo from "./ProfileInfo";
import Title from "./Title";

export default function ContactsContainer() {
  return (
    <main className="relative w-full md:basis-1/3 lg:basis-1/4 xl:basis-1/5 shrink-0 flex flex-col bg-[#1b1c24] border-r-2 border-[#2f303b]">
      <article className="py-5 px-7">
        <span className="font-extrabold text-3xl tracking-widest italic underline underline-offset-8 uppercase decoration-purple-500">
          LO<span className="text-purple-500">G</span>O
        </span>
      </article>
      <article className="flex-1 flex flex-col items-start gap-5 mt-5 px-7">
        <div className="w-full flex items-center justify-between">
          <Title title="Sohbetler" />
          <NewDM />
        </div>
        <div className="flex items-center justify-between pr-10">
          <Title title="Gruplar" />
        </div>
      </article>
      <ProfileInfo />
    </main>
  );
}

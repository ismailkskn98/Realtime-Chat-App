import ChatHeader from "./Header";
import MessageBar from "./MessageBar";
import MessageContainer from "./MessageContainer";

export default function ChatContainer() {
  return (
    <main className="fixed top-0 bg-[#1c1d25] h-screen w-screen flex flex-col md:static md:flex-1">
      <ChatHeader />
      <MessageContainer />
      <MessageBar />
    </main>
  );
}

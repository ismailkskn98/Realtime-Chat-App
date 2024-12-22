import ChatContainer from "@/components/chat/chatContainer";
import ContactsContainer from "@/components/chat/contactsContainer";
import EmptyContainer from "@/components/chat/emptyContainer";
import type { RootState } from "@/store";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export default function Chat() {
  const user = useSelector((state: RootState) => state.auth.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user.profileSetup) {
      toast.warning("Lütfen profilinizi oluşturunuz.");
      navigate("/profile");
    }
  }, [user, navigate]);
  return (
    <section className="flex h-screen overflow-hidden text-white">
      <ContactsContainer />
      {/* <EmptyContainer /> */}
      {/* <ChatContainer /> */}
    </section>
  );
}

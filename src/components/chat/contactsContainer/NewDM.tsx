import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useState, type ChangeEvent } from "react";
import { FaPlus } from "react-icons/fa";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import Lottie from "lottie-react";
import lottieJson from "@/assets/lottie-json.json";
import type { AuthState } from "@/store/features/auth/authSlice";

export default function NewDM() {
  const [openNewCantactModal, setOpenNewCantactModal] = useState<boolean>(false);

  const [contacts, setContacts] = useState<AuthState[]>([]);

  const handleSearch = async (search: string) => {
    console.log(search);
    setContacts([]);
  };

  return (
    <>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <FaPlus
              onClick={() => setOpenNewCantactModal(true)}
              className="text-neutral-400 font-light text-opacity-90 hover:text-white cursor-pointer transition-all duration-300"
            />
          </TooltipTrigger>
          <TooltipContent className="mr-2 mb-1">
            <p>Yeni Kişi Seç</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <Dialog open={openNewCantactModal} onOpenChange={setOpenNewCantactModal}>
        <DialogContent className="bg-[#181920] text-white flex flex-col border-none">
          <DialogHeader>
            <DialogTitle>Lütfen bir kişi seçin</DialogTitle>
            <DialogDescription>
              <ScrollArea className=" rounded-md border p-4"></ScrollArea>
            </DialogDescription>
          </DialogHeader>
          <div>
            <Input placeholder="Kişileri Ara" className="rounded-lg p-6 bg-[#2c2e3b] border-none" onChange={(e: ChangeEvent<HTMLInputElement>) => handleSearch(e.target.value)} />
          </div>
          {contacts.length <= 0 && (
            <article className="flex-1 flex flex-col items-center justify-center gap-5 mb-4">
              <Lottie animationData={lottieJson} style={{ width: "100px", height: "100px" }} />
              <div className="text-opacity-80 text-white flex flex-col gap-5 items-center text-base lg:text-lg transition-all duration-300 text-center px-4">
                <h3 className="poppins-medium capitalize">
                  selam<span className="text-purple-500">!</span> Yeni sohbet <span className="text-purple-500">başlatmak</span> için bir kişi
                  <span className="text-purple-500"> seçin</span>
                </h3>
              </div>
            </article>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}

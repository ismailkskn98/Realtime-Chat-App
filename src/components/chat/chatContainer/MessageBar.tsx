import { useEffect, useRef, useState, type ChangeEvent } from "react";
import { GrAttachment } from "react-icons/gr";
import { IoSend } from "react-icons/io5";
import { RiEmojiStickerLine } from "react-icons/ri";
import EmojiPicker, { Theme, type EmojiClickData } from "emoji-picker-react";

export default function MessageBar() {
  const [message, setMessage] = useState<string>("");
  const [showEmojiPicker, setShowEmojiPicker] = useState<boolean>(false);
  const pickerRef = useRef<HTMLDivElement>(null);

  const handleEmojiClick = (emojiData: EmojiClickData) => {
    setMessage((message) => message + emojiData.emoji);
  };

  const handleClickOutSide = (e: MouseEvent) => {
    const target = e.target as Node;
    if (pickerRef.current && !pickerRef.current.contains(target)) {
      setShowEmojiPicker(false);
    }
    console.log("içerisinde");
  };
  useEffect(() => {
    if (showEmojiPicker) {
      document.addEventListener("mousedown", handleClickOutSide);
    } else {
      document.removeEventListener("mousedown", handleClickOutSide);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutSide);
    };
  }, [pickerRef, showEmojiPicker]);

  const handleSendMessage = async () => {};

  return (
    <article className="relative basis-20 shrink-0 bg-[#1c1d25] flex items-center justify-center px-8 gap-6">
      <div className="flex-1 flex bg-[#2a2b33] rounded-md items-center gap-5 pr-5">
        <input
          type="text"
          onChange={(e: ChangeEvent<HTMLInputElement>) => setMessage(e.target.value)}
          value={message}
          className="w-full outline-none border-none bg-transparent rounded-md px-5 py-3"
          placeholder="Mesaj Gönder"
        />
        <button className="text-neutral-500 hover:text-white focus:border-none focus:outline-none focus:text-white transition-all duration-300">
          <GrAttachment className="text-xl" />
        </button>
        <div className="">
          <button
            onClick={() => setShowEmojiPicker((prev) => !prev)}
            className="text-neutral-500 hover:text-white focus:border-none focus:outline-none focus:text-white transition-all duration-300"
          >
            <RiEmojiStickerLine className="text-xl" />
          </button>
          <div ref={pickerRef} className="absolute bottom-16 right-5">
            <EmojiPicker onEmojiClick={handleEmojiClick} open={showEmojiPicker} theme={Theme.DARK} />
          </div>
        </div>
      </div>
      <button
        className="bg-purple-700 rounded-md flex items-center justify-center text-white px-6 py-3 hover:bg-purple-800 focus:border-none focus:outline-none focus:text-white transition-all duration-300"
        onClick={handleSendMessage}
      >
        <IoSend className="text-xl" />
      </button>
    </article>
  );
}

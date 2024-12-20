import { IoArrowBack } from "react-icons/io5";
import type { RootState } from "@/store";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { colors, getColor } from "@/utils/profileAvatarColor";
import { useNavigate } from "react-router-dom";
import { FaPlus, FaTrash } from "react-icons/fa";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { apiClient } from "@/lib/api-client";
import { UPDATE_PROFILE_ROUTE } from "@/utils/constants";
import { setUser } from "@/store/features/auth/authSlice";

export default function Profile() {
  const user = useSelector((state: RootState) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState<string>(user.firstName ?? "");
  const [lastName, setLastName] = useState<string>(user.lastName ?? "");
  const [image, setImage] = useState(null);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [selectedColor, setSelectedColor] = useState<number>(user.color ?? 0);

  const validateProfile = () => {
    if (!firstName.trim().length) {
      toast.error("Adınızı girmelisiniz.");
      return false;
    }
    if (!lastName.trim().length) {
      toast.error("Soyadınızı girmelisiniz.");
      return false;
    }
    return true;
  };

  const saveChanges = async () => {
    if (validateProfile()) {
      try {
        const response = await apiClient.patch(
          UPDATE_PROFILE_ROUTE,
          {
            firstName,
            lastName,
            color: selectedColor,
          },
          { withCredentials: true }
        );
        if (response.status === 200 && response.data.user) {
          dispatch(setUser(response.data.user));
          toast.success("Profiliniz başarıyla güncellendi.");
          setTimeout(() => {
            navigate("/chat");
          }, 500);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleNavigate = () => {
    if (!user.profileSetup) {
      return toast.error("Profilinizi ayarlamalısınız.");
    }
    navigate("/chat");
  };

  return (
    <section className="bg-gradient-to-tl from-slate-950 to-slate-800 h-screen flex flex-col items-center justify-center gap-10">
      <main className="flex flex-col items-start gap-10 w-4/5 md:w-max">
        <div>
          <IoArrowBack onClick={handleNavigate} className="text-4xl lg:text-6xl text-white cursor-pointer" />
        </div>
        <div className="w-full flex items-start gap-10">
          <article
            className="w-32 h-32 md:w-48 md:h-48 relative flex items-center justify-center bg-transparent"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <Avatar className={`w-32 h-32 md:w-48 md:h-48 overflow-hidden ${getColor(selectedColor)}`}>
              <AvatarImage src={image ? image : ""} alt={firstName ? firstName : "avatar"} />
              <AvatarFallback className="uppercase text-5xl font-semibold font-serif bg-transparent">{firstName ? firstName.charAt(0) : user.email.charAt(0)}</AvatarFallback>
            </Avatar>
            {isHovered && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/50 cursor-pointer rounded-full">
                {image ? <FaTrash className="text-white text-3xl cursor-pointer" /> : <FaPlus className="text-white text-3xl cursor-pointer" />}
              </div>
            )}
            {/* <input type="text" /> */}
          </article>
          <article className="min-w-32 md:min-w-64 flex flex-col items-center justify-center gap-5 text-white">
            <div className="w-full">
              <Input placeholder="Email" type="email" disabled value={user.email} className="bg-slate-800 border-none text-sm" />
            </div>
            <div className="w-full">
              <Input placeholder="Adınız" type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} className="bg-slate-800 border-none text-sm" />
            </div>
            <div className="w-full">
              <Input placeholder="Soyadınız" type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} className="bg-slate-800 border-none text-sm" />
            </div>
            <div className="w-full flex items-center gap-5">
              {colors.map((color, index) => (
                <div
                  key={index}
                  onClick={() => setSelectedColor(index)}
                  className={`${color} h-8 w-8 rounded-full cursor-pointer transition-all duration-300 ${selectedColor === index ? "outline-1 outline outline-white" : ""}`}
                ></div>
              ))}
            </div>
          </article>
        </div>
        <Button className="h-12 w-full bg-purple-700 hover:bg-purple-900 transition-all duration-300" onClick={saveChanges}>
          Değişiklikleri Kaydet
        </Button>
      </main>
    </section>
  );
}

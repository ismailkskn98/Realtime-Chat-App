import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import type { RootState } from "@/store";
import { HOST, LOGOUT_ROUTE } from "@/utils/constants";
import { getColor } from "@/utils/profileAvatarColor";
import { IoPower } from "react-icons/io5";
import { LiaUserEditSolid } from "react-icons/lia";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { apiClient } from "@/lib/api-client";
import { toast } from "sonner";
import { initialState, setUser } from "@/store/features/auth/authSlice";

export default function ProfileInfo() {
  const user = useSelector((state: RootState) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await apiClient.post(LOGOUT_ROUTE, {}, { withCredentials: true });
      if (response.status === 200) {
        Cookies.remove("accessToken");
        dispatch(setUser(initialState.user));
        toast.success("Başarıyla çıkış yaptınız.");
        setTimeout(() => {
          navigate("/login");
        }, 750);
      }
    } catch (error) {
      console.log(error);
      toast.error("Çıkış yaparken bir hata oluştu.");
    }
  };

  return (
    <article className="w-full h-16 flex items-center justify-between bg-[#2a2b33] px-7">
      <div className="flex items-center justify-center gap-3">
        <Avatar className={`w-12 h-12 overflow-hidden relative ${user.image && user.objectImage ? "border-none outline-none" : `${getColor(user.color)}`}`}>
          <AvatarImage
            src={user.image ? `${HOST}/${user.image}` : ""}
            alt={user.firstName ? user.firstName : "avatar"}
            className={`${user.objectImage ? "object-cover" : "object-scale-down"}`}
          />
          <AvatarFallback className="uppercase text-xl font-semibold font-serif bg-transparent">{user.firstName ? user.firstName.charAt(0) : user.email.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="flex items-center justify-between gap-1">
          <span className="font-semibold text-sm">{user.firstName}</span>
          <span className="font-semibold text-sm">{user.lastName}</span>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger
              onClick={() => navigate("/profile")}
              className="focus:border-none focus:outline-none text-purple-500 hover:text-purple-800 focus:text-white transition-all duration-300"
            >
              <LiaUserEditSolid className="text-2xl font-bold" />
            </TooltipTrigger>
            <TooltipContent>
              <p>Profili Düzenle</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger onClick={handleLogout} className="focus:border-none focus:outline-none text-red-500 hover:text-red-800 focus:text-white transition-all duration-300">
              <IoPower className="text-2xl font-bold" />
            </TooltipTrigger>
            <TooltipContent>
              <p>Çıkıp Yap</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </article>
  );
}

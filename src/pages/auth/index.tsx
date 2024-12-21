import victory from "@/assets/victory.svg";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { apiClient } from "@/lib/api-client";
import { setUser } from "@/store/features/auth/authSlice";
import { LOGIN_ROUTE, SIGNUP_ROUTE } from "@/utils/constants";
import type { AxiosError } from "axios";
import { useLottie } from "lottie-react";
import { useState, type ChangeEvent } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import lottieAnimate from "@/assets/login-animate.json";

export default function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const validateSignup = () => {
    if (!email.trim().length) {
      toast.error("Email alanı boş bırakılamaz.");
      return false;
    }
    if (!password.trim().length) {
      toast.error("Şifre alanı boş bırakılamaz.");
      return false;
    }
    if (password !== confirmPassword) {
      toast.error("Şifreler eşleşmiyor.");
      return false;
    }
    return true;
  };
  const validateLogin = () => {
    if (!email.trim().length) {
      toast.error("Email alanı boş bırakılamaz.");
      return false;
    }
    if (!password.trim().length) {
      toast.error("Şifre alanı boş bırakılamaz.");
      return false;
    }
    return true;
  };

  const handleLogin = async () => {
    if (validateLogin()) {
      try {
        setIsLoading(true);
        const response = await apiClient.post(LOGIN_ROUTE, { email, password }, { withCredentials: true });
        // Kullanıcı bilgileri başarıyla geldiyse
        if (response.status === 200 && response.data.user) {
          dispatch(setUser(response.data.user));
          toast.success("Başarıyla giriş yaptınız.");
          if (!response.data.user.profileSetup) {
            return navigate("/profile");
          }
          navigate("/chat");
        }
      } catch (error: unknown) {
        // Axios hatalarını işleme
        if ((error as AxiosError).response) {
          const response = (error as AxiosError).response;
          if (response) {
            if (response.status === 404) {
              toast.error("Kullanıcı bulunamadı.");
            } else if (response.status === 401) {
              toast.error("Email veya şifre hatalı.");
            } else {
              toast.error("Bilinmeyen bir hata oluştu.");
            }
          }
        } else {
          toast.error("Sunucuya bağlanılamadı.");
        }
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleSignup = async () => {
    if (validateSignup()) {
      try {
        setIsLoading(true);
        const response = await apiClient.post(SIGNUP_ROUTE, { email, password }, { withCredentials: true });

        // Başarılı kayıt
        if (response.status === 201 && response.data.user) {
          dispatch(setUser(response.data.user));
          toast.success("Başarıyla kayıt oldunuz.");
          navigate("/profile");
        }
      } catch (error: unknown) {
        const response = (error as AxiosError).response;
        if (response) {
          if (response.status === 400) {
            toast.error("Geçersiz kayıt bilgileri.");
          } else {
            toast.error("Bilinmeyen bir hata oluştu.");
          }
        } else {
          toast.error("Sunucuya bağlanılamadı.");
        }
      } finally {
        setIsLoading(false);
      }
    }
  };

  const { View } = useLottie({
    animationData: lottieAnimate,
    loop: true,
    autoplay: true,
    style: {
      width: "100%",
      height: "100%",
    },
  });

  return (
    <section className="h-screen w-screen flex items-center justify-center">
      <div className="hidden md:flex h-5/6 w-full">{View}</div>
      <main className="h-full w-full md:w-11/12 lg:5/6 xl:basis-2/3 bg-white shadow-2xl rounded-xl grid grid-cols-1">
        <article className="basis-2/5 flex flex-col items-center justify-center px-4 md">
          <div className="flex items-center justify-center flex-wrap">
            <h1 className="text-black/90 text-5xl font-bold lg:text-6xl">Hoş Geldiniz</h1>
            <img src={victory} alt="victory emoji" className="h-[100px]" />
          </div>
          <p className="text-black/90 font-medium text-sm xl:text-base text-center">En iyi sohbet uygulamasını kullanmak için bilgileri doldurun!</p>
        </article>
        <article className="flex-1 w-full flex items-start justify-center">
          <Tabs className="w-11/12 md:w-5/6 lg:w-3/4 2xl:w-3/5" defaultValue="login">
            <TabsList className="w-full bg-transparent rounded-none mb-8">
              <TabsTrigger
                value="login"
                disabled={isLoading}
                className="w-full text-black text-opacity-90 border-b-2 rounded-none shadow-none data-[state=active]:bg-transparent data-[state=active]:shadow-lg data-[state=active]:text-black data-[state=active]:font-semibold data-[state=active]:border-b-black p-3 transition-all duration-300 ease-in-out"
              >
                Giriş Yap
              </TabsTrigger>
              <TabsTrigger
                value="signup"
                disabled={isLoading}
                className="data-[state=active]:bg-transparent text-black text-opacity-90 border-b-2 rounded-none w-full  data-[state=active]:text-black data-[state=active]:font-semibold data-[state=active]:border-b-black p-3 transition-all duration-300 ease-in-out"
              >
                Üye Ol
              </TabsTrigger>
            </TabsList>
            <TabsContent value="login" className="flex flex-col items-center">
              <form className="w-full 2xl:w-9/12 flex flex-col items-center gap-5" onSubmit={(e) => e.preventDefault()}>
                <Input placeholder="E-posta" type="email" autoComplete="username" value={email} onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)} />
                <Input
                  placeholder="Şifre"
                  autoComplete="current-password"
                  type="password"
                  value={password}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                />
                <Button onClick={handleLogin} className="w-full py-5">
                  {isLoading ? "Giriş Yapılıyor..." : "Giriş Yap"}
                </Button>
              </form>
            </TabsContent>
            <TabsContent value="signup" className="flex flex-col items-center">
              <form className="w-full flex flex-col items-center gap-5" onSubmit={(e) => e.preventDefault()}>
                <Input placeholder="E-posta" type="email" autoComplete="username" value={email} onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)} />
                <Input
                  placeholder="Şifre"
                  autoComplete="current-password"
                  type="password"
                  value={password}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                />
                <Input
                  placeholder="Şifreyi Onayla"
                  autoComplete="current-password"
                  type="password"
                  value={confirmPassword}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setConfirmPassword(e.target.value)}
                />
                <Button onClick={handleSignup} className="w-full py-5">
                  {isLoading ? "Üye Olunuyor..." : "Üye Ol"}
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </article>
      </main>
    </section>
  );
}

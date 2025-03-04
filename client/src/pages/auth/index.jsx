import React, { useState } from "react";
import Background from "@/assets/login2.png";
import Victory from "@/assets/victory.svg";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@radix-ui/react-tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Toaster } from "@/components/ui/sonner";
import { apiClient } from "@/lib/api-client";
import { LOGIN_ROUTE, SIGNUP_ROUTE } from "@/utils/constants";
import { useNavigate } from "react-router-dom";
import { useAppStore } from "@/store";

const Auth = () => {
  const navigate = useNavigate()
  const {setUserInfo}=useAppStore()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const validateLogin = () => {
    if (!email.length) {
      Toaster.error("Email is required.");
      return false;
    }
    if (!password.length) {
      Toaster.error("Password is required");
      return false;
    }
    return true;
  };

  const validateSignup = () => {
    if (!email.length) {
      Toaster.error("Email is required.");
      return false;
    }
    if (!password.length) {
      Toaster.error("Password is required");
      return false;
    }
    if (password !== confirmPassword) {
      Toaster.error("Password and confirm password should be the same.");
      return false;
    }
    return true;
  };

  const handleLogin = async () => {
    if(validateLogin()){
      const response= await apiClient.post(LOGIN_ROUTE,{email,password},{withCredentials:true})
      console.log("THE LGOIN RESPONSE",response);
    }
    if(response.data.user.id){
      setUserInfo(response.data.user)
      if(response.data.user.profileSetup) navigate("/chat");
      else navigate("/profile")
    }

  };
  const handleSignup = async () => {
    if (validateSignup()) {
      const response = await apiClient.post(SIGNUP_ROUTE, { email, password },{withCredentials:true});
      console.log({ response });
    }
    if(response.status===201){
      setUserInfo(response.data.user)
      navigate("/profile");
    }
  };

  return (
    <div className="h-screen w-screen flex items-center justify-center p-4">
      <div className="h-[80vh] bg-white border-2 shadow-2xl w-full max-w-4xl rounded-3xl flex flex-col xl:flex-row items-center justify-center overflow-hidden">
        <div className="flex flex-col gap-6 items-center justify-center w-full xl:w-1/2 p-6">
          <div className="flex flex-col items-center justify-center text-center w-full">
            <div className="flex items-center justify-center gap-2">
              <h1 className="text-4xl font-bold md:text-5xl">Welcome</h1>
              <img src={Victory} alt="victory emoji" className="h-16 md:h-20" />
            </div>
            <p className="font-medium text-sm md:text-base">
              Fill in the details to get started with the best chat app!
            </p>
          </div>
          <div className="flex items-center justify-center w-full">
            <Tabs className="w-full" defaultValue="login">
              <TabsList className="flex w-full">
                <TabsTrigger className="flex-1 text-black text-opacity-90 border-b-2 rounded-none data-[state=active]:text-black data-[state=active]:font-semibold data-[state=active]:border-b-purple-500 p-3 transition-all duration-300" value="login">
                  Login
                </TabsTrigger>
                <TabsTrigger className="flex-1 text-black text-opacity-90 border-b-2 rounded-none data-[state=active]:text-black data-[state=active]:font-semibold data-[state=active]:border-b-purple-500 p-3 transition-all duration-300" value="signup">
                  Signup
                </TabsTrigger>
              </TabsList>
              <TabsContent className="flex flex-col gap-4 mt-6" value="login">
                <Input placeholder="Email" type="email" className="rounded-full p-4" value={email} onChange={(e) => setEmail(e.target.value)} />
                <Input placeholder="Password" type="password" className="rounded-full p-4" value={password} onChange={(e) => setPassword(e.target.value)} />
                <Button className="rounded-full p-4" onClick={handleLogin}>Login</Button>
              </TabsContent>
              <TabsContent className="flex flex-col gap-4 mt-6" value="signup">
                <Input placeholder="Email" type="email" className="rounded-full p-4" value={email} onChange={(e) => setEmail(e.target.value)} />
                <Input placeholder="Password" type="password" className="rounded-full p-4" value={password} onChange={(e) => setPassword(e.target.value)} />
                <Input placeholder="Confirm Password" type="password" className="rounded-full p-4" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                <Button className="rounded-full p-4" onClick={handleSignup}>Signup</Button>
              </TabsContent>
            </Tabs>
          </div>
        </div>
        <div className="hidden xl:flex justify-center items-center w-1/2">
          <img src={Background} alt="background login" className="max-h-[80vh] w-full object-cover" />
        </div>
      </div>
    </div>
  );
};

export default Auth;


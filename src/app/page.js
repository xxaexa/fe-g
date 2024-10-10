"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import InputField from "@/components/InputField";
import Button from "@/components/Button";

const Login = () => {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await signIn("credentials", {
        username,
        password,
        redirect: false,
        callbackUrl: "/dashboard/users",
      });

      if (res?.error) {
        alert(res.error);
      } else {
        router.push("/dashboard/users");
      }
    } catch (error) {
      console.error("Login failed:", error);
      alert("An unexpected error occurred. Please try again.");
    } finally {
    }
  };

  return (
    <div className="dark-mode h-screen flex items-center justify-center ">
      <form
        onSubmit={handleFormSubmit}
        autoComplete="off"
        className="w-[400px] mx-auto flex justify-center flex-col"
      >
        <InputField
          id="username"
          label="Username"
          type="text"
          placeholder="Enter your username"
          required={true}
          name="username"
          value={username}
          style={"text-center"}
          onChange={(e) => setUsername(e.target.value)}
        />

        <InputField
          id="password"
          label="Password"
          type="password"
          placeholder="Enter your password"
          required={true}
          name="password"
          value={password}
          style={"text-center"}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button label="Login" />
      </form>
    </div>
  );
};

export default Login;

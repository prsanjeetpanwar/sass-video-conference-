"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { authClient } from "@/lib/auth-client";
import { useState } from "react";

export default function Home() {
  const { data: session, isPending, error, refetch } = authClient.useSession();
  const [isSignUp, setIsSignUp] = useState(true);

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const onSignUp = async () => {
    try {
      await authClient.signUp.email({
        email,
        name,
        password,
      });
      alert("Signed up successfully!");
    } catch (error) {
      alert("Sign up error");
    }
  };

  const onSignIn = async () => {
    try {
      await authClient.signIn.email({
        email,
        password,
      });
      alert("Signed in successfully!");
    } catch (error) {
      alert("Sign in error");
    }
  };

  if (session) {
    return (
      <div className="flex flex-col p-4 gap-y-4">
        <p>Logged in as {session.user.name}</p>
        <Button onClick={async () => await authClient.signOut()}>
          Logout
        </Button>
      </div>
    );
  }

  return (
    <div className="pt-4 gap-y-4 m-20 flex flex-col max-w-sm mx-auto">
      <h2 className="text-xl font-semibold">{isSignUp ? "Sign Up" : "Sign In"}</h2>

      {isSignUp && (
        <Input
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      )}

      <Input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Input
        placeholder="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <Button onClick={isSignUp ? onSignUp : onSignIn}>
        {isSignUp ? "Create Account" : "Login"}
      </Button>

      <Button variant="link" onClick={() => setIsSignUp(!isSignUp)}>
        {isSignUp
          ? "Already have an account? Sign In"
          : "Don't have an account? Sign Up"}
      </Button>
    </div>
  );
}

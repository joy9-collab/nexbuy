import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please enter email and password.");
      return;
    }
    login(email, password);
    toast.success("Welcome back!");
    navigate("/account");
  };

  return (
    <main className="nexbuy-container py-12 max-w-md mx-auto">
      <h1 className="font-heading text-3xl font-bold mb-8 text-center">Sign In</h1>
      <form onSubmit={handleSubmit} className="bg-card rounded-lg border p-6 space-y-4">
        <div>
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.co.za" />
        </div>
        <div>
          <Label htmlFor="password">Password</Label>
          <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <Button type="submit" size="lg" className="w-full font-heading font-semibold">Sign In</Button>
        <p className="text-sm text-center text-muted-foreground">
          Don't have an account? <Link to="/register" className="text-primary font-medium hover:underline">Create one</Link>
        </p>
      </form>
    </main>
  );
};

export default Login;

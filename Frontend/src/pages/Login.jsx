import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import FloatingField from "@/components/FloatingField";
import Panel from "@/components/Panel";
import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import { toast } from "@/components/ui/sonner";
import { useAuth } from "@/contexts/AuthContext";
import { loginUser, registerUser } from "@/services/api";

const demoAccounts = {
  worker: {
    email: "worker@gigshield.ai",
    password: "Worker@123",
    role: "worker",
    name: "Demo Worker",
  },
  admin: {
    email: "admin@gigshield.ai",
    password: "Admin@123",
    role: "admin",
    name: "Demo Admin",
  },
};

export default function Login({ defaultMode = "login" }) {
  const navigate = useNavigate();
  const { setSession } = useAuth();
  const [mode, setMode] = useState(defaultMode);
  const [role, setRole] = useState("worker");
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const isRegister = mode === "register";
  const title = useMemo(() => (isRegister ? "Create your workspace" : "Welcome back"), [isRegister]);

  const onChange = (key) => (event) => {
    setForm((current) => ({ ...current, [key]: event.target.value }));
  };

  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);

    try {
      const payload = isRegister
        ? {
            email: form.email,
            password: form.password,
            role: role.toUpperCase(),
            ...(form.name ? { name: form.name } : {}),
          }
        : {
            email: form.email,
            password: form.password,
          };

      const matchedDemo = Object.values(demoAccounts).find(
        (account) => account.email === form.email && account.password === form.password,
      );

      if (!isRegister && matchedDemo) {
        setSession({
          token: "demo-token",
          email: matchedDemo.email,
          role: matchedDemo.role,
          name: matchedDemo.name,
        });
        toast.success("Signed in with demo account");
        navigate(matchedDemo.role === "admin" ? "/admin" : "/worker");
        return;
      }

      const response = isRegister ? await registerUser(payload) : await loginUser(payload);
      const resolvedRole = String(response?.role || role).toLowerCase();
      setSession({
        token: response?.token || response?.jwt || "demo-token",
        email: response?.email || form.email,
        role: resolvedRole,
        name: response?.name || form.name || form.email,
      });
      toast.success(isRegister ? "Account created successfully" : "Signed in successfully");
      navigate(resolvedRole === "admin" ? "/admin" : "/worker");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="grid w-full max-w-6xl gap-10 lg:grid-cols-[0.95fr_1.05fr]">
      <div className="hidden flex-col justify-center lg:flex">
        <p className="text-xs uppercase tracking-[0.3em] text-zinc-500">Secure access</p>
        <h1 className="mt-5 max-w-lg text-5xl font-semibold leading-tight text-white">{title}</h1>
        <p className="mt-5 max-w-xl text-lg leading-8 text-zinc-400">
          Clean inputs, quiet motion, and a premium dark workspace inspired by Claude and Linear.
        </p>
      </div>

      <Panel className="mx-auto w-full max-w-xl p-8 sm:p-10">
        <div className="mb-8 flex rounded-2xl border border-white/10 bg-white/[0.03] p-1.5">
          {["login", "register"].map((value) => (
            <button
              key={value}
              type="button"
              onClick={() => setMode(value)}
              className={`flex-1 rounded-2xl px-4 py-3 text-sm capitalize transition ${
                mode === value ? "bg-white text-black" : "text-zinc-400 hover:text-white"
              }`}
            >
              {value}
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {isRegister ? (
            <FloatingField label="Full Name">
              <Input value={form.name} onChange={onChange("name")} placeholder="Full Name" required />
            </FloatingField>
          ) : null}

          <FloatingField label="Email">
            <Input type="email" value={form.email} onChange={onChange("email")} placeholder="Email" required />
          </FloatingField>

          <FloatingField label="Password">
            <Input type="password" value={form.password} onChange={onChange("password")} placeholder="Password" required />
          </FloatingField>

          <div className="grid gap-3 sm:grid-cols-2">
            {["worker", "admin"].map((value) => (
              <button
                key={value}
                type="button"
                onClick={() => setRole(value)}
                className={`rounded-2xl border px-4 py-4 text-left transition ${
                  role === value
                    ? "border-sky-500/30 bg-sky-500/10 text-white"
                    : "border-white/10 bg-white/[0.03] text-zinc-400 hover:text-white"
                }`}
              >
                <p className="text-sm font-medium capitalize">{value}</p>
                <p className="mt-1 text-xs text-zinc-500">
                  {value === "worker" ? "Personal coverage workspace" : "Operations dashboard access"}
                </p>
              </button>
            ))}
          </div>

          <Button type="submit" variant="primary" className="w-full">
            {loading ? "Please wait..." : isRegister ? "Create Account" : "Continue"}
          </Button>
        </form>

        {!isRegister ? (
          <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-sm text-zinc-400">
            <p className="text-xs uppercase tracking-[0.2em] text-zinc-600">Temporary demo credentials</p>
            <div className="mt-3 space-y-3">
              <div>
                <p className="text-white">Worker</p>
                <p>Email: worker@gigshield.ai</p>
                <p>Password: Worker@123</p>
              </div>
              <div>
                <p className="text-white">Admin</p>
                <p>Email: admin@gigshield.ai</p>
                <p>Password: Admin@123</p>
              </div>
            </div>
          </div>
        ) : null}

        <p className="mt-6 text-center text-sm text-zinc-500">
          {isRegister ? "Already have an account?" : "New to GigShield AI?"}{" "}
          <Link to={isRegister ? "/login" : "/register"} className="text-zinc-200 hover:text-white">
            {isRegister ? "Login" : "Register"}
          </Link>
        </p>
      </Panel>
    </div>
  );
}

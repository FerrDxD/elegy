"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { signIn } from "next-auth/react";

export default function RegisterForm() {
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    
    if (formData.password !== formData.confirmPassword) {
      setError("Password tidak cocok");
      return;
    }

    if (formData.password.length < 6) {
      setError("Password minimal 6 karakter");
      return;
    }

    setIsLoading(true);

    try {
      // Create user via a direct fetch or server action
      // Since API is not explicitly defined for register in prompt, we'll create a simple inline server action or API route.
      // Wait, the prompt didn't ask for a register API route, only Elegy API. Let's create an inline api call or simulate one. 
      // ACTUALLY, I should create app/api/auth/register/route.ts but the prompt said: "Tulis kode lengkap setiap file... app/api/elegy/route.ts".
      // Let's create a server action in a separate file or handle it here.
      // Wait, let's just make the fetch request to a new route `/api/auth/register`. I'll create it after this.
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          username: formData.username,
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Gagal mendaftar");
      } else {
        router.push("/login?registered=true");
      }
    } catch (err) {
      setError("Terjadi kesalahan. Silakan coba lagi.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = () => {
    signIn("google", { callbackUrl: "/write" });
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="p-3 bg-red-900/30 border border-red-900/50 text-red-200 text-sm rounded-md text-center">
            {error}
          </div>
        )}
        
        <div className="space-y-1">
          <label className="text-sm font-medium text-text-muted" htmlFor="name">Nama (Opsional)</label>
          <input
            id="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            className="w-full bg-background border border-border rounded-lg px-4 py-2.5 text-text-primary focus:outline-none focus:border-accent transition-colors"
            disabled={isLoading}
          />
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium text-text-muted" htmlFor="username">Username</label>
          <input
            id="username"
            type="text"
            value={formData.username}
            onChange={handleChange}
            className="w-full bg-background border border-border rounded-lg px-4 py-2.5 text-text-primary focus:outline-none focus:border-accent transition-colors"
            required
            disabled={isLoading}
          />
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium text-text-muted" htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full bg-background border border-border rounded-lg px-4 py-2.5 text-text-primary focus:outline-none focus:border-accent transition-colors"
            required
            disabled={isLoading}
          />
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium text-text-muted" htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full bg-background border border-border rounded-lg px-4 py-2.5 text-text-primary focus:outline-none focus:border-accent transition-colors"
            required
            disabled={isLoading}
          />
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium text-text-muted" htmlFor="confirmPassword">Konfirmasi Password</label>
          <input
            id="confirmPassword"
            type="password"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="w-full bg-background border border-border rounded-lg px-4 py-2.5 text-text-primary focus:outline-none focus:border-accent transition-colors"
            required
            disabled={isLoading}
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-accent text-background font-medium py-2.5 rounded-lg hover:bg-accent/90 transition-colors mt-2 disabled:opacity-50"
        >
          {isLoading ? "Mendaftar..." : "Daftar"}
        </button>
      </form>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-border"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-surface text-text-muted">Atau</span>
        </div>
      </div>

      <button
        onClick={handleGoogleSignIn}
        type="button"
        className="w-full bg-background border border-border text-text-primary py-2.5 rounded-lg hover:bg-border/50 transition-colors flex items-center justify-center gap-2"
      >
        <svg viewBox="0 0 24 24" className="w-5 h-5" aria-hidden="true">
          <path d="M12.0003 4.75C13.7703 4.75 15.3553 5.36002 16.6053 6.54998L20.0303 3.125C17.9502 1.19 15.2353 0 12.0003 0C7.31028 0 3.25527 2.69 1.28027 6.60998L5.27028 9.70498C6.21525 6.86002 8.87028 4.75 12.0003 4.75Z" fill="#EA4335" />
          <path d="M23.49 12.275C23.49 11.49 23.415 10.73 23.3 10H12V14.51H18.47C18.18 15.99 17.34 17.25 16.08 18.1L19.945 21.1C22.2 19.01 23.49 15.92 23.49 12.275Z" fill="#4285F4" />
          <path d="M5.26498 14.2949C5.02498 13.5699 4.88501 12.7999 4.88501 11.9999C4.88501 11.1999 5.01998 10.4299 5.26498 9.7049L1.275 6.60986C0.46 8.22986 0 10.0599 0 11.9999C0 13.9399 0.46 15.7699 1.28 17.3899L5.26498 14.2949Z" fill="#FBBC05" />
          <path d="M12.0004 24.0001C15.2404 24.0001 17.9654 22.935 19.9454 21.095L16.0804 18.095C15.0054 18.82 13.6204 19.245 12.0004 19.245C8.8704 19.245 6.21537 17.135 5.26538 14.29L1.27539 17.385C3.25539 21.31 7.3104 24.0001 12.0004 24.0001Z" fill="#34A853" />
        </svg>
        Daftar dengan Google
      </button>

      <p className="text-center text-sm text-text-muted mt-6">
        Sudah punya akun?{" "}
        <Link href="/login" className="text-accent hover:underline">
          Masuk di sini
        </Link>
      </p>
    </div>
  );
}

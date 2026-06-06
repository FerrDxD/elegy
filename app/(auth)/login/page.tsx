import LoginForm from "@/components/auth/LoginForm";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-background">
      <div className="w-full max-w-md bg-surface p-8 rounded-2xl border border-border shadow-2xl animate-fade-in">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-serif mb-2">Masuk</h1>
          <p className="text-text-muted font-light">Kembali ke ruang refleksimu</p>
        </div>
        <LoginForm />
      </div>
    </div>
  );
}

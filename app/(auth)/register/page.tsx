import RegisterForm from "@/components/auth/RegisterForm";

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-background py-12">
      <div className="w-full max-w-md bg-surface p-8 rounded-2xl border border-border shadow-2xl animate-fade-in">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-serif mb-2">Daftar</h1>
          <p className="text-text-muted font-light">Mulai perjalanan refleksimu</p>
        </div>
        <RegisterForm />
      </div>
    </div>
  );
}

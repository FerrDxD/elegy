import WriteForm from "@/components/elegy/WriteForm";
import { auth } from "@/lib/auth";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function WritePage() {
  const session = await auth();
  if (!session || !session.user) {
    redirect("/login");
  }

  const displayName = session.user.name || "Penjelajah Waktu";

  return (
    <div className="min-h-screen p-6 md:p-12 max-w-4xl mx-auto animate-fade-in relative">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12 md:mb-16 border-b border-border pb-6">
        <div>
          <h1 className="text-3xl md:text-4xl font-serif">Selamat datang, {displayName}</h1>
          <p className="text-text-muted mt-2 font-light text-sm md:text-base">Ruang aman untuk melepas masa lalu.</p>
        </div>
        <Link 
          href="/archive" 
          className="text-accent hover:text-accent/80 transition-colors border border-accent/30 px-5 py-2.5 rounded-full text-sm flex items-center gap-2 hover:bg-accent/10 w-full md:w-auto justify-center"
        >
          Lihat arsip refleksiku
        </Link>
      </header>

      <WriteForm />
    </div>
  );
}

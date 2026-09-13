import Navbar from "@/components/Navbar";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-background text-text-primary selection:bg-accent/30">
      <Navbar />
      <main className="flex-1">{children}</main>
    </div>
  );
}

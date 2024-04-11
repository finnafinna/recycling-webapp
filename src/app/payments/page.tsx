import NavBar from "@/components/navbar";

export default function Home() {
    return (
      <main className="flex min-h-screen flex-col items-center justify-between bg-gradient-to-b from-neutral-200 from-20% via-emerald-100 via-80% to-emerald-200">
        <NavBar page={3} />
      </main>
    );
  }
import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "A S Patil College of Commerce — BCA Attendance Portal" },
      { name: "description", content: "Official BCA attendance portal of A S Patil College of Commerce for all six semesters." },
      { property: "og:title", content: "A S Patil College of Commerce — BCA Attendance Portal" },
      { property: "og:description", content: "Semester-wise, subject-wise attendance for BCA students." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Landing,
});

function Landing() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="mx-auto max-w-4xl px-6 py-24 text-center">
        <p className="text-sm uppercase tracking-widest text-muted-foreground">A S Patil College of Commerce</p>
        <h1 className="mt-4 text-4xl font-bold md:text-6xl">BCA Student Attendance</h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
          Mark and track daily attendance for all six BCA semesters, subject by subject — fast, simple and accurate.
        </p>
        <Link
          to="/login"
          className="mt-10 inline-block rounded-md bg-primary px-8 py-3 font-semibold text-primary-foreground hover:opacity-90"
        >
          Faculty Login
        </Link>
      </section>
      <section className="mx-auto grid max-w-4xl gap-4 px-6 pb-24 md:grid-cols-3">
        {[
          ["6 Semesters", "Every BCA semester with its own subjects."],
          ["Daily Register", "Present / absent in one tap per student."],
          ["Live Percentages", "See each student's attendance instantly."],
        ].map(([t, d]) => (
          <div key={t} className="rounded-lg border border-border bg-card p-6">
            <h3 className="font-semibold">{t}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{d}</p>
          </div>
        ))}
      </section>
    </main>
  );
}

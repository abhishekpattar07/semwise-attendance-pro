import { createFileRoute } from "@tanstack/react-router";
import { checkUnlocked } from "@/lib/gate.functions";
import { useEffect, useMemo, useState } from "react";
import {
  SEMESTERS,
  SUBJECTS,
  STUDENTS,
  type Semester,
} from "@/data/bca";

export const Route = createFileRoute("/attendance")({
  loader: () => checkUnlocked(),
  head: () => ({
    meta: [
      { title: "BCA Attendance | A S Patil College of Commerce" },
      {
        name: "description",
        content:
          "Mark and track daily BCA attendance by semester and subject at A S Patil College of Commerce.",
      },
      {
        property: "og:title",
        content: "BCA Attendance | A S Patil College of Commerce",
      },
      {
        property: "og:description",
        content:
          "Semester-wise subject attendance register for the BCA department at A S Patil College of Commerce.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AttendancePage,
});

type Status = "present" | "absent";
type Records = Record<string, Status>;

const STORE_KEY = "aspatil-bca-attendance-v1";

function today() {
  return new Date().toISOString().slice(0, 10);
}

function AttendancePage() {
  const [sem, setSem] = useState<Semester>(1);
  const [subject, setSubject] = useState(SUBJECTS[1][0]!.code);
  const [date, setDate] = useState(today);
  const [all, setAll] = useState<Record<string, Records>>({});
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORE_KEY);
      if (raw) setAll(JSON.parse(raw));
    } catch {
      /* ignore */
    }
  }, []);

  const students = STUDENTS[sem];
  const sessionKey = `${sem}|${subject}|${date}`;
  const session = all[sessionKey] ?? {};

  const stats = useMemo(() => {
    const present = students.filter((s) => session[s.roll] === "present").length;
    const absent = students.filter((s) => session[s.roll] === "absent").length;
    return { present, absent, unmarked: students.length - present - absent };
  }, [students, session]);

  const percentFor = (roll: string) => {
    const keys = Object.keys(all).filter((k) => k.startsWith(`${sem}|${subject}|`));
    const marked = keys.filter((k) => all[k]?.[roll]);
    if (marked.length === 0) return null;
    const p = marked.filter((k) => all[k]![roll] === "present").length;
    return Math.round((p / marked.length) * 100);
  };

  const update = (next: Records) => {
    const merged = { ...all, [sessionKey]: next };
    setAll(merged);
    setSaved(false);
    return merged;
  };

  const setOne = (roll: string, status: Status) =>
    update({ ...session, [roll]: session[roll] === status ? undefined : status } as Records);

  const markAll = (status: Status) =>
    update(Object.fromEntries(students.map((s) => [s.roll, status])) as Records);

  const save = () => {
    try {
      localStorage.setItem(STORE_KEY, JSON.stringify(all));
      setSaved(true);
    } catch {
      /* ignore */
    }
  };

  const subjectName =
    SUBJECTS[sem].find((s) => s.code === subject)?.name ?? "";

  return (
    <div className="min-h-screen">
      <header className="border-b border-border bg-primary text-primary-foreground">
        <div className="mx-auto flex max-w-6xl flex-col gap-1 px-5 py-7">
          <p className="text-xs uppercase tracking-[0.25em] text-primary-foreground/70">
            Department of Computer Applications
          </p>
          <h1 className="text-3xl font-semibold sm:text-4xl">
            A S Patil College of Commerce
          </h1>
          <p className="text-sm text-primary-foreground/80">
            BCA Student Attendance Management System
          </p>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-5 py-8">
        <section className="surface p-5">
          <div className="grid gap-4 sm:grid-cols-3">
            <label className="flex flex-col gap-1.5 text-sm font-medium">
              Semester
              <select
                value={sem}
                onChange={(e) => {
                  const next = Number(e.target.value) as Semester;
                  setSem(next);
                  setSubject(SUBJECTS[next][0]!.code);
                }}
                className="rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground outline-none focus:ring-2 focus:ring-ring"
              >
                {SEMESTERS.map((s) => (
                  <option key={s} value={s}>
                    Semester {s}
                  </option>
                ))}
              </select>
            </label>

            <label className="flex flex-col gap-1.5 text-sm font-medium">
              Subject
              <select
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground outline-none focus:ring-2 focus:ring-ring"
              >
                {SUBJECTS[sem].map((s) => (
                  <option key={s.code} value={s.code}>
                    {s.code} — {s.name}
                  </option>
                ))}
              </select>
            </label>

            <label className="flex flex-col gap-1.5 text-sm font-medium">
              Date
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground outline-none focus:ring-2 focus:ring-ring"
              />
            </label>
          </div>

          <div className="mt-5 flex flex-wrap items-center gap-2 border-t border-border pt-4">
            <button
              onClick={() => markAll("present")}
              className="rounded-lg bg-success px-3 py-2 text-sm font-medium text-success-foreground transition-opacity hover:opacity-90"
            >
              Mark all present
            </button>
            <button
              onClick={() => markAll("absent")}
              className="rounded-lg bg-destructive px-3 py-2 text-sm font-medium text-destructive-foreground transition-opacity hover:opacity-90"
            >
              Mark all absent
            </button>
            <button
              onClick={save}
              className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
            >
              {saved ? "Saved ✓" : "Save attendance"}
            </button>
            <span className="ml-auto text-sm text-muted-foreground">
              Present {stats.present} · Absent {stats.absent} · Unmarked{" "}
              {stats.unmarked}
            </span>
          </div>
        </section>

        <section className="surface mt-6 overflow-hidden">
          <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-border px-5 py-4">
            <h2 className="text-lg font-semibold">
              Semester {sem} · {subjectName}
            </h2>
            <p className="text-sm text-muted-foreground">
              {students.length} students enrolled
            </p>
          </div>

          <ul>
            {students.map((s, i) => {
              const status = session[s.roll];
              const pct = percentFor(s.roll);
              return (
                <li
                  key={s.roll}
                  className={`flex flex-wrap items-center gap-3 px-5 py-3 ${
                    i % 2 ? "bg-muted/50" : ""
                  }`}
                >
                  <span className="w-8 text-sm text-muted-foreground">
                    {i + 1}
                  </span>
                  <span className="w-28 font-mono text-xs text-muted-foreground">
                    {s.roll}
                  </span>
                  <span className="min-w-40 flex-1 text-sm font-medium">
                    {s.name}
                  </span>
                  <span className="w-20 text-right text-xs text-muted-foreground">
                    {pct === null ? "—" : `${pct}%`}
                  </span>
                  <span className="flex gap-2">
                    <button
                      onClick={() => setOne(s.roll, "present")}
                      className={`rounded-md border px-3 py-1.5 text-xs font-semibold transition-colors ${
                        status === "present"
                          ? "border-success bg-success text-success-foreground"
                          : "border-border bg-background text-muted-foreground hover:border-success"
                      }`}
                    >
                      Present
                    </button>
                    <button
                      onClick={() => setOne(s.roll, "absent")}
                      className={`rounded-md border px-3 py-1.5 text-xs font-semibold transition-colors ${
                        status === "absent"
                          ? "border-destructive bg-destructive text-destructive-foreground"
                          : "border-border bg-background text-muted-foreground hover:border-destructive"
                      }`}
                    >
                      Absent
                    </button>
                  </span>
                </li>
              );
            })}
          </ul>
        </section>

        <footer className="py-8 text-center text-xs text-muted-foreground">
          A S Patil College of Commerce · BCA Attendance Register
        </footer>
      </main>
    </div>
  );
}

import { LoginForm } from "@/components/auth/login/form";

export default function Page() {
  return (
    <div
      className="flex h-screen w-full items-center justify-center px-4 bg-muted"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='32' height='32' fill='none' stroke='rgb(148 163 184 / 0.05)'%3e%3cpath d='M0 .5H31.5V32'/%3e%3c/svg%3e")`,
      }}
    >
      <LoginForm />
    </div>
  );
}

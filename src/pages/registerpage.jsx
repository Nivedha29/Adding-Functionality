import * as React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
  email: z.string().email("Enter a valid email"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

// Vite envs must be prefixed with VITE_ and read via import.meta.env
const API_BASE =
  import.meta.env.VITE_API_BASE ?? "https://realworld.habsida.net/api";

export default function registerpage() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(schema) });

  const [rootError, setRootError] = React.useState(null);

  const onSubmit = async (values) => {
    setRootError(null);
    try {
      const res = await fetch(`${API_BASE}/users`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user: values }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        if (data && data.errors && typeof data.errors === "object") {
          const knownFields = new Set(["email", "username", "password"]);
          let assigned = false;

          for (const [key, msgs] of Object.entries(data.errors)) {
            const message = Array.isArray(msgs) ? msgs.join(", ") : String(msgs);
            if (knownFields.has(key)) {
              setError(key, { type: "server", message });
              assigned = true;
            }
          }

          if (!assigned) {
            const summary = Object.entries(data.errors)
              .map(([k, v]) => `${k} ${Array.isArray(v) ? v.join(", ") : String(v)}`)
              .join("; ");
            setRootError(summary || "Sign up failed. Please try again.");
          }
        } else {
          setRootError(
            (data && data.message) ||
              `Sign up failed (HTTP ${res.status}). Please try again.`
          );
        }
        return;
      }

      alert("Account created! Please sign in.");
    } catch (e) {
      setRootError("Network error. Check your connection and try again.");
    }
  };

  return (
    <div className="page-center">
      <div className="form-card">
        <h1 style={{ textAlign: "center", margin: "0 0 16px" }}>
          Create Your Account
        </h1>

        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)} noValidate>
          {rootError && (
            <div
              style={{
                border: "1px solid #fecaca",
                background: "#fef2f2",
                padding: "8px 12px",
                borderRadius: 8,
                fontSize: 14,
                marginBottom: 8
              }}
            >
              {rootError}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium">Username</label>
            <input placeholder="yourname" {...register("username")} />
            {errors.username && (
              <p className="error">{errors.username.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium">Email</label>
            <input type="email" placeholder="you@example.com" {...register("email")} />
            {errors.email && <p className="error">{errors.email.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium">Password</label>
            <input type="password" placeholder="••••••••" {...register("password")} />
            {errors.password && <p className="error">{errors.password.message}</p>}
            <p style={{ marginTop: 4, fontSize: 12, color: "#6b7280" }}>
              Minimum 8 characters.
            </p>
          </div>

          <button className="button" type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Signing up..." : "Sign up"}
          </button>
        </form>
      </div>
    </div>
  );
}

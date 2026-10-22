"use client";

import React, { useState, useTransition, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Eye, EyeOff, Lock, Mail, ArrowRight, Sparkles, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { loginUser } from "@/lib/auth";
import { toast } from "sonner";

const loginSchema = z.object({
  email: z.string().email("Please enter a valid work email address"),
  password: z.string().min(4, "Password must be at least 4 characters"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

function LoginFormContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [showPassword, setShowPassword] = useState(false);
  const [isPending, startTransition] = useTransition();

  const from = searchParams.get("from") || "/dashboard";

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "admin@pixel.dev",
      password: "password123",
    },
  });

  const onSubmit = (data: LoginFormValues) => {
    startTransition(() => {
      loginUser(data.email, data.password);
      toast.success("Welcome back, Alex Vance!", {
        description: "Authenticated with Pixel Studio Enterprise Control.",
      });
      router.push(from);
      router.refresh();
    });
  };

  const handleFillDemo = () => {
    setValue("email", "admin@pixel.dev");
    setValue("password", "pixel2026!");
    toast.info("Demo credentials loaded");
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-slate-50/60 p-4 sm:p-6">
      <div className="w-full max-w-md space-y-6">
        {/* Logo and Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-600 text-white shadow-md shadow-indigo-200">
            <div className="grid grid-cols-2 gap-1 p-2">
              <div className="h-2.5 w-2.5 rounded-[2px] bg-white" />
              <div className="h-2.5 w-2.5 rounded-[2px] bg-indigo-200" />
              <div className="h-2.5 w-2.5 rounded-[2px] bg-indigo-300" />
              <div className="h-2.5 w-2.5 rounded-[2px] bg-white" />
            </div>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            Pixel Admin Panel
          </h1>
          <p className="text-sm text-slate-500">
            Sign in to manage projects, clients, blog, and company operations
          </p>
        </div>

        {/* Demo Credentials Alert Card */}
        <div className="flex items-center justify-between rounded-xl border border-indigo-100 bg-indigo-50/60 p-3.5 text-xs text-indigo-900 shadow-2xs">
          <div className="flex items-center gap-2.5">
            <Sparkles className="h-4 w-4 text-indigo-600 shrink-0" />
            <div>
              <span className="font-semibold text-indigo-950">Demo Credentials: </span>
              <span className="text-indigo-800">admin@pixel.dev / any password</span>
            </div>
          </div>
          <button
            type="button"
            onClick={handleFillDemo}
            className="font-semibold text-indigo-600 hover:text-indigo-700 underline underline-offset-2 shrink-0 cursor-pointer"
          >
            Auto-fill
          </button>
        </div>

        {/* Form Card */}
        <div className="rounded-2xl border border-slate-200/90 bg-white p-6 sm:p-8 shadow-sm">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-1.5">
              <label
                htmlFor="email"
                className="text-xs font-semibold text-slate-700 uppercase tracking-wider"
              >
                Work Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input
                  id="email"
                  type="email"
                  placeholder="admin@pixel.dev"
                  className="pl-9"
                  {...register("email")}
                />
              </div>
              {errors.email && (
                <p className="text-xs text-rose-600 font-medium">{errors.email.message}</p>
              )}
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="text-xs font-semibold text-slate-700 uppercase tracking-wider"
                >
                  Password
                </label>
                <span className="text-[11px] text-slate-400">Any credentials work</span>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="pl-9 pr-9"
                  {...register("password")}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {errors.password && (
                <p className="text-xs text-rose-600 font-medium">
                  {errors.password.message}
                </p>
              )}
            </div>

            <div className="flex items-center justify-between text-xs pt-1">
              <label className="flex items-center gap-2 cursor-pointer select-none text-slate-600">
                <input
                  type="checkbox"
                  defaultChecked
                  className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                />
                Remember this device
              </label>
              <span className="text-indigo-600 hover:underline cursor-pointer">
                Forgot password?
              </span>
            </div>

            <Button
              type="submit"
              className="w-full mt-2 h-10 font-semibold"
              disabled={isPending}
            >
              {isPending ? (
                "Signing In..."
              ) : (
                <>
                  Sign In to Pixel
                  <ArrowRight className="h-4 w-4 ml-1" />
                </>
              )}
            </Button>
          </form>
        </div>

        {/* Security Footer Note */}
        <div className="flex items-center justify-center gap-2 text-xs text-slate-400 text-center">
          <ShieldCheck className="h-3.5 w-3.5 text-slate-400" />
          <span>Encrypted Session &bull; Pixel Studio Security v2.4</span>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-slate-50">
          <div className="text-sm text-slate-500">Loading Pixel Login...</div>
        </div>
      }
    >
      <LoginFormContent />
    </Suspense>
  );
}

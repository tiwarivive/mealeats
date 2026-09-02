"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { CircleAlert, Eye, EyeOff } from "lucide-react";

import { loginUser } from "@/app/auth/client";



export default function LoginForm() {
    const router = useRouter();

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const [showPassword, setShowPassword] = useState(false);

    const [loading, setLoading] = useState(false);

    const [error, setError] = useState("");

    const [touched, setTouched] = useState({
        email: false,
        password: false,
    });

    const cleanEmail = formData.email.trim();

    const emailValid =
        cleanEmail.length > 0 &&
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail);

    const passwordValid =
        formData.password.trim().length > 0;

    function handleChange(
        e: React.ChangeEvent<HTMLInputElement>
    ) {
        const { name, value } = e.target;

        setFormData((previous) => ({
            ...previous,
            [name]: value,
        }));

        if (error) {
            setError("");
        }
    }

    async function handleSubmit(
        e: React.FormEvent<HTMLFormElement>
    ) {
        e.preventDefault();

        if (loading) return;

        setTouched({
            email: true,
            password: true,
        });

        if (!emailValid) {
            setError("Please enter a valid email address");
            return;
        }

        if (!passwordValid) {
            setError("Please enter your password");
            return;
        }

        setError("");
        setLoading(true);

        try {
            await loginUser({
                email: cleanEmail,
                password: formData.password,
            });

            /*
             Change "/admin" below if your
             admin dashboard has a different route.
            */

            router.replace("/admin");
            router.refresh();
        } catch (error: unknown) {
            const message =
                error instanceof Error
                    ? error.message
                    : "Login failed. Please try again.";

            setError(message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <section className="relative flex min-h-screen justify-center overflow-hidden bg-[#F7F9FB]">
            {/* LOADING OVERLAY */}

            {loading && (
                <div className="fixed inset-0 z-[999999999] flex items-center justify-center bg-black/40">
                    <span className="loader" />
                </div>
            )}

            {/* TOP DECORATION */}

            <img
                src="/LoginDecordown.png"
                alt=""
                className="pointer-events-none absolute left-0 top-0 z-[1] h-auto w-full"
            />

            {/* LOGIN CONTENT */}

            <div className="relative z-10 w-full max-w-[520px] px-6 pt-[90px]">
                {/* HEADER */}

                <div className="mb-12 text-center">
                    <h1 className="!text-[48px] font-[500] leading-[100%] text-black">
                        Welcome Back!
                    </h1>

                    <p className="mb-[48px] mt-[24px] text-[18px] font-[400] leading-[100%] text-[#5F5F5F]">
                        Please login to access your account
                    </p>
                </div>

                {/* FORM */}

                <form
                    onSubmit={handleSubmit}
                    className="space-y-6"
                    noValidate
                >
                    {/* EMAIL */}

                    <div>
                        <label
                            htmlFor="email"
                            className={`mb-2 block text-[16px] font-[500] ${touched.email && !emailValid
                                    ? "text-red-500"
                                    : "text-[#5F5F5F]"
                                }`}
                        >
                            Email ID
                        </label>

                        <div className="relative max-w-[476px]">
                            <input
                                id="email"
                                type="email"
                                name="email"
                                value={formData.email}
                                placeholder="Enter your email"
                                autoComplete="email"
                                disabled={loading}
                                onChange={handleChange}
                                onBlur={() =>
                                    setTouched((previous) => ({
                                        ...previous,
                                        email: true,
                                    }))
                                }
                                className={`h-[58px] w-full rounded-[12px] border px-4 outline-none transition disabled:cursor-not-allowed disabled:opacity-70 ${touched.email && !emailValid
                                        ? "border-red-500 bg-red-50"
                                        : "border-black bg-white"
                                    }`}
                            />

                            {touched.email && !emailValid && (
                                <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2">
                                    {touched.email && !emailValid && (
                                        <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2">
                                            <CircleAlert
                                                size={20}
                                                strokeWidth={2}
                                                className="text-red-500"
                                            />
                                        </span>
                                    )}
                                </span>
                            )}
                        </div>

                        {touched.email && !emailValid && (
                            <p className="mt-2 text-sm text-red-500">
                                Please enter a valid email address
                            </p>
                        )}
                    </div>

                    {/* PASSWORD */}

                    <div className="max-w-[476px]">
                        <label
                            htmlFor="password"
                            className={`mb-2 block text-[16px] font-[500] ${touched.password && !passwordValid
                                    ? "text-red-500"
                                    : "text-[#5F5F5F]"
                                }`}
                        >
                            Password
                        </label>

                        <div className="relative">
                            <input
                                id="password"
                                type={showPassword ? "text" : "password"}
                                name="password"
                                value={formData.password}
                                placeholder="Enter password"
                                autoComplete="current-password"
                                disabled={loading}
                                onChange={handleChange}
                                onBlur={() =>
                                    setTouched((previous) => ({
                                        ...previous,
                                        password: true,
                                    }))
                                }
                                className={`h-[58px] w-full rounded-[12px] border px-4 pr-[56px] outline-none transition disabled:cursor-not-allowed disabled:opacity-70 ${touched.password && !passwordValid
                                        ? "border-red-500 bg-red-50"
                                        : "border-black bg-white"
                                    }`}
                            />

                            <button
                                type="button"
                                disabled={loading}
                                onClick={() =>
                                    setShowPassword((previous) => !previous)
                                }
                                className="absolute right-4 top-1/2 flex h-5 w-5 -translate-y-1/2 items-center justify-center text-[#5F5F5F] transition hover:text-black disabled:cursor-not-allowed"
                                aria-label={
                                    showPassword
                                        ? "Hide password"
                                        : "Show password"
                                }
                            >
                                {showPassword ? (
                                    <EyeOff
                                        size={18}
                                        strokeWidth={2}
                                    />
                                ) : (
                                    <Eye
                                        size={18}
                                        strokeWidth={2}
                                    />
                                )}
                            </button>
                        </div>

                        {touched.password && !passwordValid && (
                            <p className="mt-2 text-sm text-red-500">
                                Please enter your password
                            </p>
                        )}
                    </div>

                    {/* SERVER ERROR */}

                    {error && (
                        <div
                            role="alert"
                            className="max-w-[476px] rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600"
                        >
                            {error}
                        </div>
                    )}

                    {/* LOGIN BUTTON */}

                    <div
                        className={`h-16 w-full max-w-[476px] rounded-xl shadow-[2px_2px_4px_0px_rgba(0,0,0,0.24)] ${loading
                                ? "bg-[#0D4CBA]/70"
                                : "bg-[#0D4CBA]"
                            }`}
                    >
                        <button
                            type="submit"
                            disabled={loading}
                            className={`h-full w-full rounded-[12px] text-lg font-medium text-white transition ${loading
                                    ? "cursor-not-allowed"
                                    : "cursor-pointer hover:bg-[#0A3F99]"
                                }`}
                        >
                            {loading
                                ? "Logging in..."
                                : "Login"}
                        </button>
                    </div>
                </form>
            </div>

            {/* BOTTOM DECORATION */}

            <img
                src="/LoginDecorUp.png"
                alt=""
                className="pointer-events-none absolute bottom-[-40%] z-[1] h-auto max-w-[1100px] max-[768px]:bottom-[-158px]"
            />
        </section>
    );
}
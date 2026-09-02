"use client";

import {
  AlertCircle,
  CheckCircle2,
  Eye,
  EyeOff,
  KeyRound,
  Loader2,
  LockKeyhole,
} from "lucide-react";
import { useState } from "react";

import { apiClient } from "@/app/api/client";

type PasswordForm = {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
};

const INITIAL_FORM: PasswordForm = {
  currentPassword: "",
  newPassword: "",
  confirmPassword: "",
};

export default function ChangePassword() {
  const [form, setForm] =
    useState<PasswordForm>(INITIAL_FORM);

  const [showCurrent, setShowCurrent] =
    useState(false);

  const [showNew, setShowNew] =
    useState(false);

  const [showConfirm, setShowConfirm] =
    useState(false);

  const [loading, setLoading] =
    useState(false);

  const [success, setSuccess] =
    useState("");

  const [error, setError] =
    useState("");

  function updateField(
    field: keyof PasswordForm,
    value: string
  ) {
    setForm((previous) => ({
      ...previous,
      [field]: value,
    }));

    setError("");
    setSuccess("");
  }

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setError("");
    setSuccess("");

    const currentPassword =
      form.currentPassword;

    const newPassword =
      form.newPassword;

    const confirmPassword =
      form.confirmPassword;

    if (
      !currentPassword ||
      !newPassword ||
      !confirmPassword
    ) {
      setError(
        "Please fill in all password fields."
      );

      return;
    }

    if (newPassword.length < 8) {
      setError(
        "New password must be at least 8 characters long."
      );

      return;
    }

    if (newPassword !== confirmPassword) {
      setError(
        "New password and confirm password do not match."
      );

      return;
    }

    if (currentPassword === newPassword) {
      setError(
        "New password must be different from your current password."
      );

      return;
    }

    try {
      setLoading(true);

      const response =
        await apiClient<{
          success: boolean;
          message?: string;
        }>("/auth/change-password", {
          method: "PATCH",
          requireAuth: true,
          body: JSON.stringify({
            currentPassword,
            newPassword,
            confirmPassword,
          }),
        });

      if (!response.success) {
        throw new Error(
          response.message ||
            "Failed to change password."
        );
      }

      setSuccess(
        response.message ||
          "Password changed successfully."
      );

      setForm(INITIAL_FORM);

      setShowCurrent(false);
      setShowNew(false);
      setShowConfirm(false);
    } catch (err) {
      console.error(
        "Change password error:",
        err
      );

      setError(
        err instanceof Error
          ? err.message
          : "Failed to change password. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <section
      className="
        min-w-0
        overflow-hidden
        rounded-[14px]
        border
        !border-white/80
        !bg-white
        shadow-[0_2px_12px_rgba(15,23,42,0.04)]
      "
    >
      {/* Header */}
      <div
        className="
          flex
          min-w-0
          items-center
          gap-3
          border-b
          !border-[#edf0f4]
          px-4
          py-4
          sm:px-5
        "
      >
        <div
          className="
            flex
            h-10
            w-10
            shrink-0
            items-center
            justify-center
            rounded-[10px]
            !bg-[#edf4ff]
            !text-[#146cff]
          "
        >
          <KeyRound
            size={19}
            strokeWidth={1.8}
          />
        </div>

        <div className="min-w-0">
          <h2
            className="
              !mb-0
              !text-[15px]
              !font-semibold
              !leading-5
              !text-[#26354d]
              sm:!text-[16px]
            "
          >
            Change password
          </h2>

          <p
            className="
              !mb-0
              mt-1
              !text-[11px]
              !leading-4
              !text-[#98A2B3]
              sm:!text-[12px]
            "
          >
            Update your administrator account password.
          </p>
        </div>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="p-4 sm:p-5"
      >
        <div className="space-y-4">
          <PasswordInput
            label="Current password"
            value={form.currentPassword}
            onChange={(value) =>
              updateField(
                "currentPassword",
                value
              )
            }
            showPassword={showCurrent}
            onToggle={() =>
              setShowCurrent(
                (previous) => !previous
              )
            }
            autoComplete="current-password"
          />

          <PasswordInput
            label="New password"
            value={form.newPassword}
            onChange={(value) =>
              updateField(
                "newPassword",
                value
              )
            }
            showPassword={showNew}
            onToggle={() =>
              setShowNew(
                (previous) => !previous
              )
            }
            autoComplete="new-password"
          />

          <PasswordInput
            label="Confirm new password"
            value={form.confirmPassword}
            onChange={(value) =>
              updateField(
                "confirmPassword",
                value
              )
            }
            showPassword={showConfirm}
            onToggle={() =>
              setShowConfirm(
                (previous) => !previous
              )
            }
            autoComplete="new-password"
          />
        </div>

        {/* Password requirements */}
        <div
          className="
            mt-4
            rounded-xl
            !bg-[#f8fafc]
            px-3
            py-3
            sm:px-4
          "
        >
          <div className="flex items-start gap-2">
            <LockKeyhole
              size={14}
              strokeWidth={1.8}
              className="
                mt-0.5
                shrink-0
                text-[#98A2B3]
              "
            />

            <p
              className="
                !mb-0
                !text-[11px]
                !leading-5
                !text-[#718096]
              "
            >
              Use at least 8 characters for your new
              password. Your new password must also be
              different from your current password.
            </p>
          </div>
        </div>

        {/* Error */}
        {error && (
          <div
            role="alert"
            className="
              mt-4
              flex
              items-start
              gap-2
              rounded-xl
              border
              !border-[#fecdca]
              !bg-[#fef3f2]
              px-3
              py-2.5
            "
          >
            <AlertCircle
              size={15}
              strokeWidth={1.8}
              className="
                mt-0.5
                shrink-0
                !text-[#b42318]
              "
            />

            <p
              className="
                !mb-0
                break-words
                !text-[11px]
                !leading-5
                !text-[#b42318]
              "
            >
              {error}
            </p>
          </div>
        )}

        {/* Success */}
        {success && (
          <div
            role="status"
            className="
              mt-4
              flex
              items-start
              gap-2
              rounded-xl
              border
              !border-[#abefc6]
              !bg-[#ecfdf3]
              px-3
              py-2.5
            "
          >
            <CheckCircle2
              size={15}
              strokeWidth={1.8}
              className="
                mt-0.5
                shrink-0
                !text-[#067647]
              "
            />

            <p
              className="
                !mb-0
                break-words
                !text-[11px]
                !leading-5
                !text-[#067647]
              "
            >
              {success}
            </p>
          </div>
        )}

        {/* Submit */}
        <div className="mt-5 flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className="
              inline-flex
              h-[40px]
              w-full
              items-center
              justify-center
              gap-2
              rounded-full
              !bg-[#146cff]
              px-5
              !text-[12px]
              !font-medium
              !text-white
              transition
              duration-200
              hover:!bg-[#0f5ed7]
              disabled:cursor-not-allowed
              disabled:opacity-60
              sm:w-auto
              sm:!text-[13px]
            "
          >
            {loading ? (
              <>
                <Loader2
                  size={15}
                  className="animate-spin"
                />

                Updating...
              </>
            ) : (
              <>
                <KeyRound
                  size={15}
                  strokeWidth={1.8}
                />

                Update password
              </>
            )}
          </button>
        </div>
      </form>
    </section>
  );
}

function PasswordInput({
  label,
  value,
  onChange,
  showPassword,
  onToggle,
  autoComplete,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  showPassword: boolean;
  onToggle: () => void;
  autoComplete: string;
}) {
  return (
    <div className="min-w-0">
      <label
        className="
          mb-1.5
          block
          !text-[11px]
          !font-medium
          !leading-5
          !text-[#475467]
          sm:!text-[12px]
        "
      >
        {label}
      </label>

      <div className="relative">
        <input
          type={showPassword ? "text" : "password"}
          value={value}
          onChange={(event) =>
            onChange(event.target.value)
          }
          autoComplete={autoComplete}
          disabled={false}
          className="
            h-[42px]
            w-full
            min-w-0
            rounded-xl
            border
            !border-[#e2e8f0]
            !bg-white
            px-3
            pr-11
            !text-[12px]
            !text-[#344054]
            outline-none
            transition
            placeholder:!text-[#98A2B3]
            focus:!border-[#146cff]
            focus:ring-2
            focus:!ring-[#146cff]/10
            sm:!text-[13px]
          "
          placeholder={`Enter ${label.toLowerCase()}`}
        />

        <button
          type="button"
          onClick={onToggle}
          aria-label={
            showPassword
              ? `Hide ${label}`
              : `Show ${label}`
          }
          className="
            absolute
            right-0
            top-0
            flex
            h-[42px]
            w-11
            items-center
            justify-center
            !text-[#98A2B3]
            transition
            hover:!text-[#475467]
          "
        >
          {showPassword ? (
            <EyeOff
              size={16}
              strokeWidth={1.8}
            />
          ) : (
            <Eye
              size={16}
              strokeWidth={1.8}
            />
          )}
        </button>
      </div>
    </div>
  );
}
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Label } from "@/components/ui/label";
import { useNotify } from "@/components/ui/Notify";
import { useGetUsersEmail, usePostUsersEmail, usePutUsersEmail } from "@/gen";
import useAuthenticatedClientConfig from "@/hooks/use-authenticated-client-config";
import { ArrowLeftIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
// import your UI components – adjust names as needed

type EmailStatus = "PENDING" | "REJECTED" | "CONFIRMED";

interface VerificationFormData {
  code: string;
}

interface Props {
  onClose: (val: boolean) => void;
}

export const EmailChangeFlow: React.FC<Props> = ({ onClose }) => {
  const [status, setStatus] = useState<EmailStatus | null>(null);
  const [error, setError] = useState<string | null>(null);
  const config = useAuthenticatedClientConfig();
  const { data: emailStatusResponse } = useGetUsersEmail({ ...config });
  const notify = useNotify();
  const {
    control,
    register,
    handleSubmit: handleSubmitVerify,
    formState: { errors: errorsVerify },
  } = useForm<VerificationFormData>();

  const { mutateAsync: putUsersEmail } = usePutUsersEmail({
    ...config,
    mutation: {
      onSuccess: async (response) => {
        await notify({
          title: "Profile Updated 🎉",
          message: "Your profile has been successfully updated.",

          buttonText: "Close",
        });
        setStatus("CONFIRMED");
      },
      onError: async (error) => {
        console.error(" Error:", error);
        await notify({
          title: "Error",
          message: "Failed to update profile. Please try again later.",
          buttonText: "Close",
        });
      },
    },
  });

  console.log(emailStatusResponse?.data);
  useEffect(() => {
    setStatus(emailStatusResponse?.data);
  }, [emailStatusResponse]);

  if (error) {
    return <div className="p-4 text-red-500">{error}</div>;
  }

  if (status === null) {
    return <div className="p-4">Loading…</div>;
  }

  // 1) If pending: show verification form
  if (status === "PENDING") {
    const onSubmitVerify = async (data: VerificationFormData) => {
      await putUsersEmail({ data: { verificationCode: data.code } });
    };

    return (
      <div className="fixed inset-0 z-40 bg-white">
        {/* Top bar */}
        <div className="pt-15" />
        <div className="flex px-4 pt-4">
          <button
            type="button"
            onClick={() => onClose(false)}
            className="cursor-pointer inline-flex items-center"
            aria-label="Go back"
          >
            <ArrowLeftIcon size={28} />
            <span className="ml-2">Back</span>
          </button>
        </div>
        <div className=" w-full h-full flex items-center justify-center mx-auto">
          <div className="h-[75%] ">
            <h1 className="text-xl font-semibold mb-4">
              Enter Verification Code
            </h1>
            <form
              onSubmit={handleSubmitVerify(onSubmitVerify)}
              className="space-y-10"
            >
              <Controller
                control={control}
                name="code"
                rules={{
                  required: "Code is required",
                  pattern: {
                    value: /^[0-9]{6}$/,
                    message: "Please enter a valid 6-digit code",
                  },
                }}
                {...register("code", { required: "code is required" })}
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                }) => (
                  <div className="grid gap-1">
                    <Label htmlFor="code">6-digit Code</Label>
                    <InputOTP value={value} onChange={onChange} maxLength={6}>
                      <InputOTPGroup>
                        {[0, 1, 2, 3, 4, 5].map((i) => (
                          <InputOTPSlot
                            className="h-10 w-10  m-2"
                            key={i}
                            index={i}
                          />
                        ))}
                      </InputOTPGroup>
                    </InputOTP>
                    {error && (
                      <p className="text-sm text-red-500">{error.message}</p>
                    )}
                  </div>
                )}
              />

              <Button type="submit" className="w-full">
                Verify Email
              </Button>
            </form>
            <p className="mt-4 text-sm text-gray-500">
              Didn’t receive a code?{" "}
              <button
                className="underline text-blue-600"
                onClick={() => window.location.reload()}
              >
                Resend Code
              </button>
            </p>
          </div>
        </div>
      </div>
    );
  }

  // 2) If rejected or confirmed or none → show initiate page
  return (
    <Initiate
      Close={(val: boolean) => onClose(val)}
      setStatus={(val) => setStatus(val)}
    />
  );
};

const Initiate = ({
  Close,
  setStatus,
}: {
  Close: (val: boolean) => void;
  setStatus: (val: EmailStatus) => void;
}) => {
  const notify = useNotify();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setFocus,
  } = useForm({
    defaultValues: { newEmail: "" },
    mode: "onSubmit",
  });
  const config = useAuthenticatedClientConfig();
  const { mutateAsync: postUsersEmail } = usePostUsersEmail({
    ...config,
    mutation: {
      onSuccess: async (response) => {
        await notify({
          title: "Verification email has been sent🎉",
          message: "Please check your email for a verfication code!",

          buttonText: "Close",
        });
        setStatus("PENDING");
      },
      onError: async (error) => {
        console.error(" Error:", error);
        await notify({
          title: "Error",
          message: "Failed to initiate  Please try again later.",
          buttonText: "Close",
        });
      },
    },
  });
  React.useEffect(() => {
    setFocus("newEmail");
  }, [setFocus]);

  const onSubmit = handleSubmit(async ({ newEmail }) => {
    console.log();
    postUsersEmail({ data: { email: newEmail } });
  });

  return (
    <div className="fixed inset-0 z-40 bg-white">
      {/* Top bar */}
      <div className="pt-15" />
      <div className="flex px-4 pt-4">
        <button
          type="button"
          onClick={() => Close(false)}
          className="cursor-pointer inline-flex items-center"
          aria-label="Go back"
        >
          <ArrowLeftIcon size={28} />
          <span className="ml-2">Back</span>
        </button>
      </div>
      <div className=" flex-1 flex items-center justify-center  p-10 ">
        <div className="h-[75%] ">
          <h1 className="text-xl font-semibold mb-4">Enter New Email</h1>
          <form onSubmit={onSubmit} className="space-y-4" noValidate>
            <div className="grid gap-1">
              <Label htmlFor="newEmail">New Email</Label>
              <Input
                id="newEmail"
                type="email"
                inputMode="email"
                autoComplete="email"
                aria-invalid={!!errors.newEmail}
                aria-describedby={
                  errors.newEmail ? "newEmail-error" : undefined
                }
                {...register("newEmail", {
                  required: "Email is required",
                  pattern: {
                    // RFC-lite: something@something.tld (no spaces)
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i,
                    message: "Please enter a valid email address",
                  },
                  setValueAs: (v) => (typeof v === "string" ? v.trim() : v),
                })}
              />
              {errors.newEmail && (
                <p id="newEmail-error" className="text-sm text-red-600">
                  {errors.newEmail.message}
                </p>
              )}
            </div>

            <div className="flex gap-2">
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? "Sending..." : "Send Verification Code"}
              </Button>
            </div>

            {/* Small reiteration under the form for clarity */}
            <p className="text-xs text-gray-500 text-center">
              You may only change your email once a month if your having issues
              please contact support@campuscribs.com
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

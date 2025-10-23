import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowLeftIcon } from "lucide-react";

import useAuthenticatedClientConfig from "@/hooks/use-authenticated-client-config";
import { useGetUsersMe, usePutUsersUpdate } from "@/gen";
import { useNotify } from "@/components/ui/Notify";
import { useNavigate } from "react-router";

const accountSettingsSchema = z
  .object({
    // Read-only (shown for clarity)
    email: z.string().email(),
    // Preferences
    username: z.string().min(3, "Username must be at least 3 characters."),
    displayName: z
      .string()
      .min(2, "Display name must be at least 2 characters."),
    bio: z
      .string()
      .max(300, "Bio must be at most 300 characters.")
      .optional()
      .or(z.literal("")),
    marketingEmails: z.boolean().default(false),
    // Security
    currentPassword: z.string().optional(),
    newPassword: z.string().optional(),
    confirmPassword: z.string().optional(),
  })
  .refine(
    (data) => {
      // if any password field is filled, require all & ensure match
      const anyFilled = !!(
        data.currentPassword ||
        data.newPassword ||
        data.confirmPassword
      );
      if (!anyFilled) return true;
      return !!(
        data.currentPassword &&
        data.newPassword &&
        data.confirmPassword &&
        data.newPassword === data.confirmPassword
      );
    },
    {
      message:
        "To change your password, fill all password fields and ensure the new passwords match.",
      path: ["confirmPassword"],
    }
  );

type AccountSettingsSchema = z.infer<typeof accountSettingsSchema>;

const Account = () => {
  const config = useAuthenticatedClientConfig();
  const notify = useNotify();
  const navigate = useNavigate();
  const [confirmText, setConfirmText] = useState("");
  const [ack, setAck] = useState(false);
  const [passwordForDelete, setPasswordForDelete] = useState("");
  const {
    data: userData,
    isLoading,
    isError,
    error,
  } = useGetUsersMe({ ...config });

  const { mutate: updateAccount } = usePutUsersUpdate({
    ...config,
    mutation: {
      onSuccess: async () => {
        await notify({
          title: "Account Updated 🎉",
          message: "Your account settings have been saved.",
          buttonText: "Close",
        });
        navigate("/account");
      },
      onError: async (err) => {
        console.error("Update Error:", err);
        await notify({
          title: "Update Failed",
          message: "We couldn't save your changes. Please try again.",
          buttonText: "Close",
        });
      },
    },
  });

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<AccountSettingsSchema>({
    resolver: zodResolver(accountSettingsSchema),
    defaultValues: {
      email: userData?.data.email ?? "",
      username: userData?.data.username ?? "",
      displayName:
        `${userData?.data.firstName ?? ""} ${userData?.data.lastName ?? ""}`.trim(),
      bio: userData?.data.bio ?? "",
      marketingEmails: false,
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  useEffect(() => {
    if (userData?.data) {
      reset({
        email: userData.data.email ?? "",
        username: userData.data.username ?? "",
        displayName:
          `${userData.data.firstName ?? ""} ${userData.data.lastName ?? ""}`.trim(),
        bio: userData.data.bio ?? "",
        marketingEmails: userData.data.marketingEmails ?? false,
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    }
  }, [userData, reset]);

  const onSubmit = (data: AccountSettingsSchema) => {
    // Map form fields to your API shape as needed
    // If performing password change, include fields; otherwise omit
    const payload: Record<string, unknown> = {
      username: data.username,
      displayName: data.displayName,
      bio: data.bio,

      marketingEmails: data.marketingEmails,
    };
    if (data.currentPassword && data.newPassword) {
      payload.currentPassword = data.currentPassword;
      payload.newPassword = data.newPassword;
    }

    updateAccount({ data: payload });
  };

  // If you have a generated hook, prefer this:
  /// const { mutateAsync: deleteAccount, isPending: isDeleting } = useDeleteUsersMe({ ...config });

  // Fallback: small helper that hits your DELETE endpoint directly.
  // Adjust URL and auth headers to match your backend.
  async function deleteAccountDirect() {
    const base = (config as any)?.baseUrl ?? "";
    const headers = (config as any)?.headers ?? {};
    const res = await fetch(`${base}/users/me`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
      body: JSON.stringify({ password: passwordForDelete || undefined }),
    });
    if (!res.ok) {
      const t = await res.text().catch(() => "");
      throw new Error(t || `Delete failed with status ${res.status}`);
    }
  }

  // Unified handler that tries SDK first, then falls back:
  async function handleDelete() {
    // basic guards
    if (confirmText !== "DELETE" || !ack) return;

    try {
      // Prefer your generated hook:
      // await deleteAccount({});
      await deleteAccountDirect();

      await notify({
        title: "Account Deleted",
        message: "Your account and data have been permanently removed.",
        buttonText: "Close",
      });

      // Local cleanup & redirect (adjust to your auth flow)
      try {
        localStorage.clear();
        sessionStorage.clear();
      } catch {}
      navigate("/goodbye"); // or navigate("/"), or a signed-out landing
    } catch (e: any) {
      console.error(e);
      await notify({
        title: "Delete Failed",
        message:
          e?.message || "We couldn't delete your account. Please try again.",
        buttonText: "Close",
      });
    }
  }
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error?.message}</div>;

  return (
    <div className="w-full">
      <div className="px-3 pt-3">
        <div
          onClick={() => window.history.back()}
          className="cursor-pointer inline-flex items-center"
        >
          <ArrowLeftIcon size={32} />
          <span className="ml-2">Back</span>
        </div>
      </div>

      <div className="flex w-full justify-center text-xl font-semibold">
        Account Settings
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col items-center justify-center w-full h-full gap-y-6 py-6"
      >
        {/* Identity */}
        <div className="grid w-full max-w-md gap-4">
          <div className="grid gap-1.5">
            <Label htmlFor="email">Email (read-only)</Label>
            <Input id="email" disabled {...register("email")} />
            {errors.email && (
              <p className="text-sm text-red-500">{errors.email.message}</p>
            )}
          </div>

          <div className="grid gap-1.5">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              placeholder="your_handle"
              {...register("username")}
            />
            {errors.username && (
              <p className="text-sm text-red-500">{errors.username.message}</p>
            )}
          </div>

          <div className="grid gap-1.5">
            <Label htmlFor="displayName">Display Name</Label>
            <Input
              id="displayName"
              placeholder="How your name appears"
              {...register("displayName")}
            />
            {errors.displayName && (
              <p className="text-sm text-red-500">
                {errors.displayName.message}
              </p>
            )}
          </div>

          <div className="grid gap-1.5">
            <Label htmlFor="bio">Bio</Label>
            <Textarea
              id="bio"
              placeholder="A short description of you"
              {...register("bio")}
              className="h-28"
            />
            {errors.bio && (
              <p className="text-sm text-red-500">{errors.bio.message}</p>
            )}
          </div>
        </div>

        {/* Notifications */}
        <div className="grid w-full max-w-md gap-4">
          <div className="flex items-center justify-between">
            <div>
              <Label className="cursor-pointer">Marketing Emails</Label>
              <p className="text-xs text-muted-foreground">
                Occasional promotions and tips
              </p>
            </div>
            <Switch
              onCheckedChange={(v) =>
                setValue("marketingEmails", v, { shouldValidate: false })
              }
              defaultChecked={false}
            />
          </div>
        </div>

        {/* Security */}
        <div className="grid w-full max-w-md gap-4">
          <div className="border rounded-xl p-4">
            <div className="text-sm font-medium mb-3">Change Password</div>
            <div className="grid gap-1.5">
              <Label htmlFor="currentPassword">Current Password</Label>
              <Input
                id="currentPassword"
                type="password"
                {...register("currentPassword")}
              />
            </div>
            <div className="grid gap-1.5 mt-3">
              <Label htmlFor="newPassword">New Password</Label>
              <Input
                id="newPassword"
                type="password"
                {...register("newPassword")}
              />
            </div>
            <div className="grid gap-1.5 mt-3">
              <Label htmlFor="confirmPassword">Confirm New Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                {...register("confirmPassword")}
              />
              {errors.confirmPassword && (
                <p className="text-sm text-red-500">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>
            <p className="text-xs text-muted-foreground mt-3">
              Leave these fields empty if you don’t want to change your
              password.
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex w-full max-w-md justify-end gap-3">
          <Button type="button" variant="secondary" onClick={() => reset()}>
            Reset
          </Button>
          <Button type="submit">Save Changes</Button>
        </div>
        <div className="mt-8 border rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm font-semibold text-red-600">
                Danger Zone
              </div>
              <p className="text-xs text-muted-foreground p-2">
                Permanently delete your account and all associated data.
              </p>
            </div>

            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive">Delete Account</Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>
                    Delete account permanently?
                  </AlertDialogTitle>
                  <AlertDialogDescription>
                    This action <span className="font-semibold">cannot</span> be
                    undone. It will permanently remove your account, profile,
                    and any associated data.
                  </AlertDialogDescription>
                </AlertDialogHeader>

                {/* Optional password re-auth (recommended) */}
                <div className="grid gap-2 mt-2">
                  <Label htmlFor="delete-password">
                    Confirm with password (required if your backend enforces
                    re-auth)
                  </Label>
                  <Input
                    id="delete-password"
                    type="password"
                    placeholder="Current password"
                    value={passwordForDelete}
                    onChange={(e) => setPasswordForDelete(e.target.value)}
                  />
                </div>

                {/* Type-to-confirm */}
                <div className="grid gap-2 mt-4">
                  <Label htmlFor="confirm-delete">
                    Type <span className="font-mono">DELETE</span> to confirm
                  </Label>
                  <Input
                    id="confirm-delete"
                    placeholder="DELETE"
                    value={confirmText}
                    onChange={(e) => setConfirmText(e.target.value)}
                  />
                </div>

                {/* Acknowledge checkbox */}
                <div className="flex items-center gap-2 mt-3">
                  <Checkbox
                    id="ack"
                    checked={ack}
                    onCheckedChange={(v) => setAck(Boolean(v))}
                  />
                  <Label htmlFor="ack" className="text-sm">
                    I understand this is permanent and cannot be undone.
                  </Label>
                </div>

                <AlertDialogFooter className="mt-4">
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={handleDelete}
                    // disabled={isDeleting || confirmText !== "DELETE" || !ack}
                    disabled={confirmText !== "DELETE" || !ack}
                    className="bg-red-600 hover:bg-red-700"
                  >
                    Permanently Delete
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Account;

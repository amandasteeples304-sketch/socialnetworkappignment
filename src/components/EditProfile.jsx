"use client";
import { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Pencil1Icon, Cross2Icon } from "@radix-ui/react-icons";
import SubmitButton from "@/components/SubmitButton";

export default function EditProfile({ profile, handleUpdateProfile }) {
  const [open, setOpen] = useState(false);
  async function actionHandler(formData) {
    await handleUpdateProfile(formData);
    setOpen(false);
  }

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <button className="p-2 hover:bg-gray-100 rounded-full transition-colors inline-flex items-center justify-center text-gray-600">
          <Pencil1Icon width="18" height="18" />
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40" />
        <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[95vw] max-w-md bg-white p-8 rounded-2xl shadow-2xl z-50 focus:outline-none">
          <div className="flex justify-between items-center mb-6">
            <Dialog.Title className="text-2xl font-bold">
              Edit Profile
            </Dialog.Title>
            <Dialog.Close asChild>
              <button className="p-1 hover:bg-gray-100 rounded-full text-gray-600 transition-colors">
                <Cross2Icon width="20" height="20" />
              </button>
            </Dialog.Close>
          </div>
          <form action={actionHandler} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold mb-1">
                Full Name
              </label>
              <input
                name="full_name"
                defaultValue={profile.full_name}
                className="w-full border p-2.5 rounded-lg focus:ring-2 focus:ring-black outline-none"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1">
                Username
              </label>
              <input
                name="username"
                defaultValue={profile.username}
                className="w-full border p-2.5 rounded-lg focus:ring-2 focus:ring-black outline-none"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1">
                Profile Image
              </label>
              <input
                name="image"
                defaultValue={profile.image}
                className="w-full border p-2.5 rounded-lg focus:ring-2 focus:ring-black outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1">Bio</label>
              <textarea
                name="bio"
                defaultValue={profile.bio}
                className="w-full border p-2.5 rounded-lg h-28 resize-none focus:ring-2 focus:ring-black outline-none"
              />
            </div>
            <div className="flex justify-end gap-3 pt-4">
              <Dialog.Close asChild>
                <button
                  type="button"
                  className="px-5 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 rounded-lg"
                >
                  Cancel
                </button>
              </Dialog.Close>
              <SubmitButton pendingText="Saving">Save Changes</SubmitButton>
            </div>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

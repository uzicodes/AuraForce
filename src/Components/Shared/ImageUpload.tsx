"use client";

import { UploadButton } from "@uploadthing/react";
import { ourFileRouter } from "../../../app/api/uploadthing/core";
import { updateProfileImage } from "@/actions/updateProfile";



import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

interface ImageUploadProps {
  clerkId: string;
}

export default function ImageUpload({ clerkId }: ImageUploadProps) {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center gap-4">
      <UploadButton<typeof ourFileRouter, "imageUploader">
        endpoint="imageUploader"
        appearance={{
          button: "bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm px-4 py-2 rounded-full transition-all",
          allowedContent: "text-zinc-400 text-xs"
        }}
        onClientUploadComplete={async (res) => {
          if (res && res[0]) {
            // 1. Get the new URL
            const imageUrl = res[0].url;
            
            // 2. Save to Database
            await updateProfileImage(clerkId, imageUrl);
            
            // 3. Show success
            toast.success("Profile picture updated!");
            router.refresh();
          }
        }}
        onUploadError={(error: Error) => {
          toast.error(`Error: ${error.message}`);
        }}
      />
      <p className="text-xs text-zinc-500">Max 4MB (JPG, PNG)</p>
    </div>
  );
}
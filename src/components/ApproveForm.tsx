"use client";

import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { LucideLoader } from "lucide-react";

export default function ApproveForm({ id }: { id: string }) {
  const [loading, setLoading] = useState(false);
  const [approved, setApproved] = useState(false);
  const submittedRef = useRef(false);

  const handleSubmit = () => {
    submittedRef.current = true;
    setLoading(true);
  };

  const handleIframeLoad = () => {
    if (!submittedRef.current) return;
    submittedRef.current = false;
    setLoading(false);
    setApproved(true);
    toast.success("Approved!", {
      description: "Volunteer hours have been approved successfully.",
    });
  };

  return (
    <>
      <iframe name="apiRes" className="hidden" onLoad={handleIframeLoad} />
      <form
        action={`/api/approve/${id}`}
        method="POST"
        target="apiRes"
        onSubmit={handleSubmit}
      >
        <Button
          type="submit"
          className="hover:cursor-pointer"
          disabled={loading || approved}
        >
          {loading ? (
            <>
              <LucideLoader className="mr-2 h-4 w-4 animate-spin" />{" "}
              Approving...
            </>
          ) : (
            "Approve volunteer hours"
          )}
        </Button>
      </form>
    </>
  );
}

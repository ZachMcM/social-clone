import { toast } from "@/components/ui/use-toast";
import { Check } from "lucide-react";

export async function sharePage(shareData: { title: string, text: string, url: string }) {
  try {
    await navigator.share(shareData);
  } catch (err) {
    console.log(err)
    navigator.clipboard.writeText(shareData.url);
    toast({
      description: (
        <p className="flex items-center">
          Successfully copied link to clipboard.{" "}
          <Check className="h-4 w-4 ml-2" />
        </p>
      ),
    });
  }
}
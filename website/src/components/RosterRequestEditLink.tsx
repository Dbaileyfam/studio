import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { isRosterApiConfigured, requestRosterEditLink } from "@/lib/rosterApi";
import { Check, Copy, Loader2, Mail } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";

const RosterRequestEditLink = () => {
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<{
    ok: boolean;
    message: string;
    editUrl?: string;
    emailSent?: boolean;
  } | null>(null);
  const [copied, setCopied] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = email.trim();
    if (!trimmed) {
      toast.error("Enter the email you used when you joined the roster.");
      return;
    }
    if (!isRosterApiConfigured()) {
      toast.error("Edit links are not available on this site build yet.");
      return;
    }

    setSubmitting(true);
    setResult(null);
    setCopied(false);
    try {
      const data = await requestRosterEditLink(trimmed);
      setResult(data);
      if (!data.ok) {
        toast.error(data.message);
      }
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not load edit link");
    } finally {
      setSubmitting(false);
    }
  };

  const copyLink = async () => {
    if (!result?.editUrl) return;
    try {
      await navigator.clipboard.writeText(result.editUrl);
      setCopied(true);
      toast.success("Edit link copied");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Could not copy — select the link and copy manually");
    }
  };

  return (
    <div className="rounded-2xl border border-white/15 bg-white/[0.06] p-8 max-w-md mx-auto">
      <div className="flex justify-center mb-4">
        <Mail className="h-10 w-10 text-teal-400" aria-hidden />
      </div>
      <h2 className="text-xl font-display font-bold text-white text-center mb-2">
        Already on the roster?
      </h2>
      <p className="text-sm text-gray-300 text-center mb-6 leading-relaxed">
        Enter the email from your $9/month subscription. We will show your private
        edit link on this page (bookmark it to update your listing anytime).
      </p>

      {result?.ok && result.editUrl ? (
        <div className="space-y-4">
          <p className="text-center text-gray-200 text-sm leading-relaxed">{result.message}</p>
          <div className="rounded-xl border border-teal-500/30 bg-teal-950/30 p-4">
            <p className="text-xs font-medium text-teal-200 mb-2">Your edit link</p>
            <a
              href={result.editUrl}
              className="block text-sm text-teal-100 break-all underline hover:text-white"
            >
              {result.editUrl}
            </a>
          </div>
          <div className="flex flex-col sm:flex-row gap-2">
            <Button
              type="button"
              className="flex-1 bg-gradient-to-r from-teal-600 to-teal-500 hover:from-teal-500 hover:to-teal-400 text-white"
              asChild
            >
              <a href={result.editUrl}>Open edit form</a>
            </Button>
            <Button
              type="button"
              variant="outline"
              className="flex-1 border-white/25 text-white hover:bg-white/10"
              onClick={copyLink}
            >
              {copied ? (
                <>
                  <Check className="mr-2 h-4 w-4" />
                  Copied
                </>
              ) : (
                <>
                  <Copy className="mr-2 h-4 w-4" />
                  Copy link
                </>
              )}
            </Button>
          </div>
          {result.emailSent && (
            <p className="text-xs text-gray-400 text-center">
              A copy was also sent to your email.
            </p>
          )}
          <Button
            type="button"
            variant="ghost"
            className="w-full text-gray-400 hover:text-gray-200"
            onClick={() => {
              setResult(null);
              setEmail("");
            }}
          >
            Use a different email
          </Button>
        </div>
      ) : result && !result.ok ? (
        <div className="space-y-4">
          <p className="text-center text-amber-100/90 text-sm leading-relaxed">{result.message}</p>
          <Button
            type="button"
            variant="outline"
            className="w-full border-white/25 text-white"
            onClick={() => setResult(null)}
          >
            Try again
          </Button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="roster-edit-email" className="text-gray-200">
              Email on your roster account
            </Label>
            <Input
              id="roster-edit-email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="mt-2 bg-black/30 border-white/20 text-white"
              disabled={submitting}
            />
          </div>
          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-teal-600 to-teal-500 hover:from-teal-500 hover:to-teal-400 text-white"
            disabled={submitting}
          >
            {submitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Looking up…
              </>
            ) : (
              "Get my edit link"
            )}
          </Button>
        </form>
      )}

      <p className="mt-6 text-xs text-gray-500 text-center">
        Wrong email or not subscribed?{" "}
        <Link to="/contact" className="text-teal-300 underline hover:text-teal-200">
          Contact 801 Family Studios
        </Link>
      </p>
    </div>
  );
};

export default RosterRequestEditLink;

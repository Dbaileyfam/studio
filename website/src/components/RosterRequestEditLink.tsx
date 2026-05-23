import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { isRosterApiConfigured, requestRosterEditLink } from "@/lib/rosterApi";
import { Loader2, Mail } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";

const RosterRequestEditLink = () => {
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [sentMessage, setSentMessage] = useState<string | null>(null);

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
    setSentMessage(null);
    try {
      const result = await requestRosterEditLink(trimmed);
      setSentMessage(result.message);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not send edit link");
    } finally {
      setSubmitting(false);
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
        Enter the email from your $9/month subscription. We will email you a private
        link to update your public listing anytime.
      </p>

      {sentMessage ? (
        <p className="text-center text-gray-200 text-sm leading-relaxed">{sentMessage}</p>
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
                Sending…
              </>
            ) : (
              "Email me my edit link"
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

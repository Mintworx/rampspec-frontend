"use client";
import { AppShell } from "@/components/app-shell";
import { Button } from "@/components/ui/button";
import { useWizardDraft, WizardProblem } from "@/components/run-wizard-state";
import { validateWizardDraft, wizardHref } from "@/lib/runs/wizard";

export default function RunParametersPage() {
  const { draft, update, error, startNew } = useWizardDraft();
  const errors = draft ? validateWizardDraft(draft, "parameters") : [];
  return <AppShell title="Run parameters" description="Choose deterministic fixtures and bounded execution settings.">
    {!draft ? <WizardProblem error={error} onStartNew={startNew} /> : <section className="max-w-xl rounded-lg border border-line bg-surface p-6 shadow-panel">
      <label className="block text-sm font-semibold">Fixture set<select value={draft.fixture} onChange={event => update({ fixture: event.target.value })} className="mt-2 w-full rounded-md border border-line bg-surface px-3 py-2 font-normal"><option value="sanitized-checkout">Sanitized checkout</option><option value="empty-wallet">Empty wallet</option><option value="recovery-account">Recovery account</option></select></label>
      <label className="mt-5 block text-sm font-semibold">Timeout (seconds)<input type="number" min="30" max="600" step="1" value={draft.timeout} onChange={event => update({ timeout: event.target.value })} className="mt-2 w-full rounded-md border border-line px-3 py-2 font-normal" /></label>
      {errors.length > 0 && <p role="alert" className="mt-4">{errors.join(" ")}</p>}
      <div className="mt-6 flex items-center gap-4"><a href={wizardHref("/runs/new", draft)} className="underline">Back to selection</a><Button disabled={errors.length > 0} onClick={() => { if (!validateWizardDraft(draft, "parameters").length) window.location.assign(wizardHref("/runs/new/safety", draft)); }}>Review safety</Button></div>
    </section>}
  </AppShell>;
}

"use client";

import { useState } from "react";
import { AppShell } from "@/components/app-shell";
import { Button } from "@/components/ui/button";
import { parametersChanged, useUnsavedChanges } from "@/components/unsaved-changes-dialog";

export default function RunParametersPage() {
  const [fixture, setFixture] = useState("sanitized-checkout");
  const [timeout, setTimeoutValue] = useState("120");
  const dirty = parametersChanged({ fixture: "sanitized-checkout", timeout: "120" }, { fixture, timeout });
  const { dialog, allowNavigation } = useUnsavedChanges(dirty);
  return <AppShell title="Run parameters" description="Choose deterministic fixtures and bounded execution settings.">
    <section className="max-w-xl rounded-lg border border-line bg-surface p-6 shadow-panel">
      <form onSubmit={event => { event.preventDefault(); allowNavigation(); window.location.assign(`/runs/new/safety?${new URLSearchParams({ fixture, timeout })}`); }}>
        <label className="block text-sm font-semibold">Fixture set<select value={fixture} onChange={event => setFixture(event.target.value)} className="mt-2 w-full rounded-md border border-line bg-surface px-3 py-2 font-normal"><option value="sanitized-checkout">Sanitized checkout</option><option value="empty-wallet">Empty wallet</option><option value="recovery-account">Recovery account</option></select></label>
        <label className="mt-5 block text-sm font-semibold">Timeout (seconds)<input type="number" min="30" max="600" step="1" required value={timeout} onChange={event => setTimeoutValue(event.target.value)} className="mt-2 w-full rounded-md border border-line px-3 py-2 font-normal" /></label>
        <Button className="mt-6" type="submit">Review safety</Button>
      </form>
    </section>{dialog}
  </AppShell>;
}

'use client';

import { useState } from 'react';
import { MonthlyPlanBuilder } from './MonthlyPlanBuilder';
import { BuildYourOwnCalculator } from './BuildYourOwnCalculator';

/** Accessible two-tab switcher between the Monthly and Build Your Own calculators. */
export function PricingTabs() {
  const [tab, setTab] = useState<'monthly' | 'byo'>('monthly');

  const tabBtn = (active: boolean) =>
    `min-h-12 flex-1 rounded-lg px-5 py-3 font-heading font-bold transition-colors ${
      active ? 'bg-terracotta text-white' : 'bg-soft-white text-slate-deep border border-line hover:border-sage'
    }`;

  return (
    <div>
      <div role="tablist" aria-label="Pricing mode" className="flex gap-3">
        <button
          role="tab"
          id="tab-monthly"
          aria-selected={tab === 'monthly'}
          aria-controls="panel-monthly"
          className={tabBtn(tab === 'monthly')}
          onClick={() => setTab('monthly')}
          data-analytics="pricing_mode_selected"
        >
          Monthly Coaching
        </button>
        <button
          role="tab"
          id="tab-byo"
          aria-selected={tab === 'byo'}
          aria-controls="panel-byo"
          className={tabBtn(tab === 'byo')}
          onClick={() => setTab('byo')}
          data-analytics="pricing_mode_selected"
        >
          Build Your Own
        </button>
      </div>

      <div className="mt-8">
        <div id="panel-monthly" role="tabpanel" aria-labelledby="tab-monthly" hidden={tab !== 'monthly'}>
          <MonthlyPlanBuilder />
        </div>
        <div id="panel-byo" role="tabpanel" aria-labelledby="tab-byo" hidden={tab !== 'byo'}>
          <BuildYourOwnCalculator />
        </div>
      </div>
    </div>
  );
}

import { Camera, CloudSun, Mail, Timer, type LucideIcon } from 'lucide-react';
import { DemoClockPanel } from '@/components/demo/widget-panels/DemoClockPanel';
import { DemoGmailPanel } from '@/components/demo/widget-panels/DemoGmailPanel';
import { DemoInstagramPanel } from '@/components/demo/widget-panels/DemoInstagramPanel';
import { DemoWeatherPanel } from '@/components/demo/widget-panels/DemoWeatherPanel';
import type { ComponentType } from 'react';

export type DemoWidgetId = 'weather' | 'clock' | 'gmail' | 'instagram';

export type DemoMorphPhase = 'closed' | 'opening' | 'floating' | 'docking';

export interface DemoWidgetPanelProps {
  accent: string;
}

export interface DemoWidgetDefinition {
  id: DemoWidgetId;
  label: string;
  icon: LucideIcon;
  accent: string;
  badgeCount?: number;
  Panel: ComponentType<DemoWidgetPanelProps>;
}

export const DEMO_WIDGET_REGISTRY: DemoWidgetDefinition[] = [
  {
    id: 'weather',
    label: 'Weather',
    icon: CloudSun,
    accent: 'var(--cat-amber)',
    Panel: DemoWeatherPanel,
  },
  {
    id: 'clock',
    label: 'Pomodoro',
    icon: Timer,
    accent: 'var(--cat-blue)',
    Panel: DemoClockPanel,
  },
  {
    id: 'gmail',
    label: 'Gmail',
    icon: Mail,
    accent: 'var(--cat-coral)',
    badgeCount: 3,
    Panel: DemoGmailPanel,
  },
  {
    id: 'instagram',
    label: 'Instagram',
    icon: Camera,
    accent: 'var(--cat-violet)',
    badgeCount: 6,
    Panel: DemoInstagramPanel,
  },
];

export const DEMO_WIDGETS = DEMO_WIDGET_REGISTRY;

export function getDemoWidget(id: DemoWidgetId): DemoWidgetDefinition {
  const widget = DEMO_WIDGET_REGISTRY.find((w) => w.id === id);
  if (!widget) throw new Error(`Unknown demo widget: ${id}`);
  return widget;
}

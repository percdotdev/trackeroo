export type PopupTab = 'trackers' | 'manual' | 'info';

export const POPUP_TABS: { id: PopupTab; label: string }[] = [
  { id: 'trackers', label: 'Trackers' },
  { id: 'manual', label: 'Manual' },
  { id: 'info', label: 'Info' },
];

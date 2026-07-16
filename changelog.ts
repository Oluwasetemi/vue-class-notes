export interface ChangelogEntry {
  version: string
  date: string
  changes: string[]
}

export const entries: ChangelogEntry[] = [
  {
    version: 'v1.3',
    date: '2026-05-07',
    changes: [
      'Added data-fetching, rendering, and state-management pages',
      'Added state.md with Vue state patterns',
      'Configured docs/agents/ for engineering skill integration (issue tracker, triage labels, domain docs)',
    ],
  },
  {
    version: 'v1.2',
    date: '2026-05-06',
    changes: [
      'Added reactivity and composables pages',
      'Added /vue-playground custom page',
      'Added reactivity and composable demo components',
    ],
  },
  {
    version: 'v1.1',
    date: '2026-05-04',
    changes: [
      'Added intro and template syntax pages',
      'Added /changelog and /routes custom pages',
      'Improved iframe-lazy layout with Run/Open buttons',
    ],
  },
  {
    version: 'v1.0',
    date: '2024-01-01',
    changes: ['Initial course release'],
  },
]

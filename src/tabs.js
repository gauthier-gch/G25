// `hidden: true` masque l'onglet (barre + route) sans le supprimer
// `short` est le libellé affiché dans la barre d'onglets en bas de l'écran
const ALL_TABS = [
  { path: '/villa', label: 'La villa', short: 'Villa', emoji: '🏡' },
  { path: '/provisions', label: 'Les provisions', short: 'Provisions', emoji: '🍻' },
  { path: '/questionnaire', label: 'Le questionnaire', short: 'Questionnaire', emoji: '📝' },
  { path: '/tombola', label: 'La tombola', short: 'Tombola', emoji: '🎟️', hidden: true },
  { path: '/planning', label: 'Le planning', short: 'Planning', emoji: '🗓️' },
]

export const TABS = ALL_TABS.filter((t) => !t.hidden)

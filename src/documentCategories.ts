export const documentCategories = [
  { id: 'Proposal_Report', label: 'Proposal Reports' },
  { id: 'Presentations', label: 'Presentations' },
  { id: 'Research_paper', label: 'Research Papers' },
  { id: 'Individual_Thesis', label: 'Individual Theses' },
  { id: 'Other', label: 'Other Documents' },
] as const;

export function documentCategory(pathParts: string[]): string {
  return documentCategories.find(category =>
    pathParts.some(part => part.toLowerCase() === category.id.toLowerCase()),
  )?.id ?? 'Other';
}

export function documentCategoryLabel(id: string): string {
  return documentCategories.find(category => category.id === id)?.label ?? 'Other Documents';
}

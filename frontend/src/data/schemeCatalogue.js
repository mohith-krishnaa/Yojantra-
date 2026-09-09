/**
 * Yojantra normalized opportunity catalogue.
 *
 * `sourceType` separates authoritative government schemes from institutional
 * and private/discovery opportunities. `sourceUrl` should point to the
 * authoritative programme page before an opportunity is marked verified.
 * Values here are product metadata for matching/UI, not sanction decisions.
 */

export const SOURCE_TYPES = Object.freeze({
  GOVERNMENT: 'government',
  INSTITUTIONAL: 'institutional',
  PRIVATE: 'private',
});

export const SCHEME_TYPES = Object.freeze({
  MICRO_FINANCE: 'micro_finance',
  TERM_LOAN: 'term_loan',
  EDUCATION: 'education',
  BUSINESS_FINANCE: 'business_finance',
});

export const schemeCatalogue = [
  {
    id: 'nsfdc-micro-finance',
    name: 'NSFDC Micro Finance Scheme',
    sourceType: SOURCE_TYPES.GOVERNMENT,
    schemeType: SCHEME_TYPES.MICRO_FINANCE,
    audience: ['sc'],
    maxProjectCostInr: 140000,
    maxFamilyIncomeInr: 500000,
    indicativeRate: 6.5,
    currency: 'INR',
    tags: ['micro enterprise', 'small business', 'self employment'],
    status: 'catalogue',
    sourceName: 'NSFDC',
    sourceUrl: '',
    verified: false,
  },
  {
    id: 'nsfdc-term-loan',
    name: 'NSFDC Term Loan',
    sourceType: SOURCE_TYPES.GOVERNMENT,
    schemeType: SCHEME_TYPES.TERM_LOAN,
    audience: ['sc'],
    maxProjectCostInr: 5000000,
    maxFamilyIncomeInr: 500000,
    indicativeRate: 8,
    currency: 'INR',
    tags: ['business', 'equipment', 'enterprise'],
    status: 'catalogue',
    sourceName: 'NSFDC',
    sourceUrl: '',
    verified: false,
  },
  {
    id: 'nsfdc-education',
    name: 'NSFDC Educational Loan Scheme',
    sourceType: SOURCE_TYPES.GOVERNMENT,
    schemeType: SCHEME_TYPES.EDUCATION,
    audience: ['sc'],
    maxFamilyIncomeInr: 500000,
    indicativeRate: null,
    currency: 'INR',
    tags: ['education', 'higher education', 'student'],
    status: 'catalogue',
    sourceName: 'NSFDC',
    sourceUrl: '',
    verified: false,
  },
  {
    id: 'private-business-discovery',
    name: 'Private / Institutional Business Finance',
    sourceType: SOURCE_TYPES.PRIVATE,
    schemeType: SCHEME_TYPES.BUSINESS_FINANCE,
    audience: ['general'],
    maxFamilyIncomeInr: null,
    indicativeRate: null,
    currency: 'INR',
    tags: ['startup', 'business finance', 'working capital'],
    status: 'discovery',
    sourceName: 'Partner marketplace',
    sourceUrl: '',
    verified: false,
  },
];

export function getSchemeById(id) {
  return schemeCatalogue.find((scheme) => scheme.id === id) || null;
}

export function filterSchemes({ goal, projectCost, income, scConfirmed } = {}) {
  const cost = Number(projectCost || 0);
  const annualIncome = Number(income || 0);

  return schemeCatalogue.filter((scheme) => {
    if (scheme.audience.includes('sc') && scConfirmed !== true) return false;
    if (annualIncome && scheme.maxFamilyIncomeInr && annualIncome > scheme.maxFamilyIncomeInr) return false;
    if (goal === 'education' && scheme.schemeType !== SCHEME_TYPES.EDUCATION) return false;
    if (goal === 'business' && scheme.schemeType === SCHEME_TYPES.EDUCATION) return false;
    if (cost && scheme.maxProjectCostInr && cost > scheme.maxProjectCostInr) return false;
    return true;
  });
}

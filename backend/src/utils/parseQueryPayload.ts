import { QUERY_SPLIT_IDENTIFIER } from '@/constants';

export const parseQueryPayload = (query: string) => {
  if (!query?.length || !query.includes(QUERY_SPLIT_IDENTIFIER)) return [query];

  const splittedQuery = query
    .split(QUERY_SPLIT_IDENTIFIER)
    .map((v) => v.trim());
  const [firstValue, secondValue] = splittedQuery;

  const possibilities = [
    `title=${firstValue},artist=${secondValue}`,
    `title=${secondValue},artist=${firstValue}`
  ];

  return possibilities;
};

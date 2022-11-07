import { QUERY_SPLIT_IDENTIFIER } from '@/constants';

export function* getQueryPayloadPossibilities(query: string) {
  if (!query?.length || !query.includes(QUERY_SPLIT_IDENTIFIER)) yield query;

  const splittedQuery = query
    .split(QUERY_SPLIT_IDENTIFIER)
    .map((v) => v.trim());
  const [firstValue, secondValue] = splittedQuery;

  yield `title=${firstValue},artist=${secondValue}`;
  yield `title=${secondValue},artist=${firstValue}`;
}

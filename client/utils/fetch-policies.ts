import { intersectionBy, unionBy } from 'lodash';

interface paginatedData {
  result: any[];
  hasMore: boolean;
}

export const pagination = (existing: paginatedData, incoming: paginatedData, { readField }: any) => {
  if (!existing) {
    return incoming;
  } else {
    const diff = intersectionBy(existing.result, incoming.result, (ele: any) => readField("id", ele));
    if (diff.length === 0) {
      const lastOfExisting = readField("createdAt", existing.result[existing.result.length - 1]);
      const firstOfIncoming = readField("createdAt", incoming.result[0]);
      if (firstOfIncoming <= lastOfExisting) {
        // Elements are paginated. Just append at last.
        return {
          result: [...existing.result, ...incoming.result],
          hasMore: incoming.hasMore,
        };
      } else {
        // Refetch with all new entries. (More than POSTS_LIMIT) then, discard cached.
        return {
          result: [...incoming.result],
          hasMore: incoming.hasMore,
        };
      }
    } else {
      // Element get repeated. Shows refetch with few new entries at the top. (Less than POSTS_LIMIT)
      const newResult = unionBy(incoming.result, existing.result, (e: any) => readField("id", e));
      return {
        result: newResult,
        hasMore: incoming.hasMore,
      };
    }
  }
};
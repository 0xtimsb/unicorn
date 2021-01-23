import { useQuery } from '@apollo/client';

// For lazy query.
const useImperativeQuery = (query: any) => {
  const { refetch } = useQuery(query, { skip: true });

  const imperativelyCallQuery = (variables: any) => {
    return refetch(variables);
  };

  return imperativelyCallQuery;
};

export default useImperativeQuery;
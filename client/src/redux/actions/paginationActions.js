export const nextPage = () => ({
  type: 'NEXT_PAGE'
});

export const prevPage = () => ({
  type: 'PREV_PAGE'
});

export const goToFirstPage = () => ({
  type: 'GO_TO_FIRST_PAGE',
}); 

export const goToLastPage = () => ({
  type: 'GO_TO_LAST_PAGE',
});

export const goToPage = (pageNumber) => ({
  type: 'GO_TO_PAGE',
  payload: pageNumber,
});


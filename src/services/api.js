const BASE_URL = 'https://ide.cime.es/ide_tools/search.aspx';

export default {
  expedients: (anymin = '', anymax = '') =>
    `${BASE_URL}?accio=totalsExpedientsAnys&layer=or007exp_expedients&anymin=${anymin}&anymax=${anymax}`,
  vivendes: (bbox) =>
    `${BASE_URL}?accio=totalsVivendesLocalsBBOX&bbox=${bbox}`,
};

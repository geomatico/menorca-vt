const BASE_URL = 'https://ide.cime.es/ide_tools/search.aspx';

const ENDPOINTS = {
  expedients: (anymin , anymax) =>
    `${BASE_URL}?accio=totalsExpedientsAnys&layer=or007exp_expedients&anymin=${anymin}&anymax=${anymax}`,
  vivendes: (bbox) =>
    `${BASE_URL}?accio=totalsVivendesLocalsBBOX&bbox=${bbox}`,
};

const GET = (url) => {
  return fetch(url, {
    method: 'GET'
  }).then(response => {
    if (response.status === 200 && response.ok) {
      return response.json();
    } else {
      return Promise.reject( {
        status: response.status,
        message: response.statusText
      });
    }
  });
};

export const fetchTotalExpedients = (anymin = '', anymax = '') => GET(ENDPOINTS.expedients(anymin, anymax));
export const fetchTotalVivendes = (bbox) => GET(ENDPOINTS.vivendes(bbox));
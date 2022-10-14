import config from '../config.json';

function hexToRgb(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? [
    parseInt(result[1], 16),
    parseInt(result[2], 16),
    parseInt(result[3], 16)
  ] : [0, 0, 0];
}

const colors = Object.entries(config.datasets).reduce((result, [datasetId, dataset]) => {
  result[datasetId] = dataset.categories.reduce((palette, category) => {
    const {color, values} = category;
    values.forEach(value => palette[value] = hexToRgb(color));
    return palette;
  }, {});
  return result;
}, {});

const useColors = () => colors;

export default useColors;

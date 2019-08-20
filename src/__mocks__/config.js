
export const geolocation = {
  get: () => {
    return Promise.resolve({
      data: {
        features: [{
          center: [4, 72],
        }]
      }
    });
  }
};

export const weatherFetcher =  {
  get: () => {
    return Promise.resolve({ data: { currently: { summary: 'Rainy' } } });
  }
}

export default { geolocation, weatherFetcher };
const apiRoads = [
  {
    name: 'dogs',
    url: 'https://api.thedogapi.com/v1/breeds',
  },
  {
    name: 'sports',
    url: 'https://sports.api.decathlon.com/sports?has_icon=true',
  },
];

export function getUrl(category) {
  const object = apiRoads.find((element) => element.name === category);
  return object.url;
}

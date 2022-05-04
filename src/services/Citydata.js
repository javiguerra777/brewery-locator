export function Cities(){
  return [
    {"city": "New York", "state": "NY"},
    {"city": "Buffalo", "state": "NY"},
    {"city": "Los Angeles", "state": "CA"},
    {"city": "Stockton", "state": "CA"},
    {"city": "Turlock", "state": "CA"},
    {"city": "Oakland", "state": "CA"},
    {"city": "New Jersey", "state": "NJ"},
    {"city": "Santa Clara", "state": "CA"},
    {"city": "San Francisco", "state": "CA"},
    {"city": "Las Vegas", "state": "NV"},
    {"city": "San Diego", "state": "CA"},
    {"city": "Dallas", "state": "TX"},
    {"city": "Seattle", "state": "WA"},
    {"city": "Phoenix", "state": "AZ"},
    {"city": "New Orleans", "state": "LA"},
    {"city": "Atlanta", "state": "GA"},
    {"city": "Philadelphia", "state": "PA"},
    {"city": "Boston", "state": "MA"},
    {"city": "Rockford", "state": "IL"},
    {"city": "Chicago", "state": "IL"},
    {"city": "Green Bay", "state": "WI"},
    {"city": "Miami", "state": "FL"},
    {"city": "Orlando", "state": "FL"},
    {"city": "Kansas City", "state": "MO"},
    {"city": "Austin", "state": "TX"},
    {"city": "Fresno", "state": "CA"},
    {"city": "Hershey", "state": "PA"},

  ]
};

export function renderCities(state, val) {
  return state.city.toLowerCase().indexOf(val.toLowerCase()) !== -1;
}
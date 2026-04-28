const map = L.map("map").setView([38.9072, -77.0369], 12);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution: "&copy; OpenStreetMap contributors"
}).addTo(map);

const hotelLocations = {
  national_mall: { name: "National Mall", lat: 38.8895, lng: -77.0353 },
  dupont_circle: { name: "Dupont Circle", lat: 38.9097, lng: -77.0434 },
  georgetown: { name: "Georgetown", lat: 38.9097, lng: -77.0654 },
  capitol_hill: { name: "Capitol Hill", lat: 38.8899, lng: -77.0091 }
};

let attractions = [];
let parks = [];
let food = [];
let resultLayer = L.layerGroup().addTo(map);

const genericValues = new Set([
  "attraction", "historic", "museum", "garden", "artwork", "zoo",
  "park", "food", "restaurant", "fast_food", "fast food", "cafe", "bar", "pub",
  "yes", "place", "unknown", "null", ""
]);

function getCoords(feature) {
  if (!feature.geometry || feature.geometry.type !== "Point") return null;
  return feature.geometry.coordinates;
}

function isInDC(feature) {
  const coords = getCoords(feature);
  if (!coords) return false;

  const [lng, lat] = coords;
  return lng > -78 && lng < -76 && lat > 38 && lat < 40;
}

function normalizeText(value) {
  return String(value || "")
    .trim()
    .toLowerCase()
    .replaceAll("_", " ");
}

function titleCase(value) {
  return normalizeText(value).replace(/\b\w/g, c => c.toUpperCase());
}

function isGeneric(value) {
  return genericValues.has(normalizeText(value));
}

/*
  Important:
  For attractions, your QGIS fields are switched:
  - type = place name
  - name_clean = attraction category/type

  For food and parks:
  - name_clean is usually place name
  - type is usually category/type
*/
function getPlaceName(feature, layerType) {
  const p = feature.properties || {};

  if (layerType === "attraction") {
    if (p.type && !isGeneric(p.type)) return p.type;
    if (p.name && !isGeneric(p.name)) return p.name;
    if (p.name_clean && !isGeneric(p.name_clean)) return p.name_clean;
    return titleCase(p.name_clean || "Attraction");
  }

  if (layerType === "food") {
    if (p.name_clean && !isGeneric(p.name_clean)) return p.name_clean;
    if (p.name && !isGeneric(p.name)) return p.name;
    if (p.type && !isGeneric(p.type)) return p.type;
    return "Food Location";
  }

  if (layerType === "park") {
    if (p.name_clean && !isGeneric(p.name_clean)) return p.name_clean;
    if (p.name && !isGeneric(p.name)) return p.name;
    if (p.type && !isGeneric(p.type)) return p.type;
    return "Park";
  }

  return "Place";
}

function getCategory(feature, layerType) {
  const p = feature.properties || {};

  if (layerType === "attraction") {
    return normalizeText(p.name_clean || p.tourism || p.historic || p.leisure || "attraction");
  }

  if (layerType === "food") {
    return normalizeText(p.type || p.amenity || "food");
  }

  if (layerType === "park") {
    return normalizeText(p.type || p.leisure || "park");
  }

  return normalizeText(layerType);
}

function styleForType(type) {
  if (type === "attraction") {
    return { radius: 5, color: "#8c510a", fillColor: "#f6a623" };
  }

  if (type === "park") {
    return { radius: 4, color: "#2f6b3f", fillColor: "#7fbf7b" };
  }

  return { radius: 4, color: "#8b1e3f", fillColor: "#e85d75" };
}

function addFeatureToMap(feature, layerType) {
  const coords = getCoords(feature);
  if (!coords) return;

  const [lng, lat] = coords;
  const style = styleForType(layerType);

  L.circleMarker([lat, lng], {
    radius: style.radius,
    color: style.color,
    fillColor: style.fillColor,
    fillOpacity: 0.85,
    weight: 1
  })
    .bindPopup(`
      <strong>${getPlaceName(feature, layerType)}</strong><br>
      Category: ${titleCase(getCategory(feature, layerType))}<br>
      Layer: ${titleCase(layerType)}
    `)
    .addTo(resultLayer);
}

function distanceKm(lat1, lng1, lat2, lng2) {
  const R = 6371;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLng = (lng2 - lng1) * Math.PI / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1 * Math.PI / 180) *
    Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLng / 2) ** 2;

  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

function buildFilters(features, containerId, layerType) {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.innerHTML = "";

  const categories = [...new Set(
    features
      .map(f => getCategory(f, layerType))
      .filter(c => c && c !== "yes" && c !== "unknown" && c !== "place")
  )].sort();

  categories.forEach(category => {
    const label = document.createElement("label");
    label.innerHTML = `
      <input type="checkbox" value="${category}" checked>
      ${titleCase(category)}
    `;
    container.appendChild(label);
  });
}

function getSelectedCategories(containerId) {
  return Array.from(
    document.querySelectorAll(`#${containerId} input[type="checkbox"]:checked`)
  ).map(input => normalizeText(input.value));
}

function filterByCategory(features, selectedCategories, layerType) {
  if (!selectedCategories.length) return [];

  return features.filter(feature => {
    const category = getCategory(feature, layerType);
    return selectedCategories.includes(category);
  });
}

async function loadData() {
  const [attractionData, parkData, foodData] = await Promise.all([
    fetch("data/final/dc_top_attractions.geojson?v=" + Date.now()).then(r => r.json()),
    fetch("data/final/dc_parks_final.geojson?v=" + Date.now()).then(r => r.json()),
    fetch("data/final/dc_food_final.geojson?v=" + Date.now()).then(r => r.json())
  ]);

  attractions = attractionData.features.filter(isInDC);
  parks = parkData.features.filter(isInDC);
  food = foodData.features.filter(isInDC);

  buildFilters(attractions, "attractionFilters", "attraction");
  buildFilters(food, "foodFilters", "food");

  console.log("Attractions:", attractions.length);
  console.log("Parks:", parks.length);
  console.log("Food:", food.length);

  generatePlan();
}

function rankByDistance(features, layerType, hotel) {
  return features
    .filter(f => getCoords(f))
    .map(f => {
      const [lng, lat] = getCoords(f);
      const distance = distanceKm(hotel.lat, hotel.lng, lat, lng);
      const score = Number(f.properties.score || 5);

      return {
        feature: f,
        type: layerType,
        distance,
        finalScore: score - distance
      };
    })
    .sort((a, b) => b.finalScore - a.finalScore);
}

function generatePlan() {
  resultLayer.clearLayers();

  const duration = Number(document.getElementById("duration").value);
  const hotelKey = document.getElementById("hotel").value;
  const hotel = hotelLocations[hotelKey];

  const includeAttractions = document.getElementById("includeAttractions").checked;
  const includeParks = document.getElementById("includeParks").checked;
  const includeFood = document.getElementById("includeFood").checked;

  const selectedAttractionCategories = getSelectedCategories("attractionFilters");
  const selectedFoodCategories = getSelectedCategories("foodFilters");

  const filteredAttractions = includeAttractions
    ? filterByCategory(attractions, selectedAttractionCategories, "attraction")
    : [];

  const filteredParks = includeParks ? parks : [];

  const filteredFood = includeFood
    ? filterByCategory(food, selectedFoodCategories, "food")
    : [];

  const rankedAttractions = rankByDistance(filteredAttractions, "attraction", hotel);
  const rankedParks = rankByDistance(filteredParks, "park", hotel);
  const rankedFood = rankByDistance(filteredFood, "food", hotel);

  let selected = [];

  for (let day = 0; day < duration; day++) {
    selected.push(...rankedAttractions.splice(0, 4));
    selected.push(...rankedParks.splice(0, 1));
    selected.push(...rankedFood.splice(0, 2));
  }

  selected = selected.filter(Boolean);

  selected.forEach(item => addFeatureToMap(item.feature, item.type));

  L.marker([hotel.lat, hotel.lng])
    .bindPopup(`<strong>Start:</strong> ${hotel.name}`)
    .addTo(resultLayer);

  const layers = resultLayer.getLayers();
  if (layers.length > 1) {
    const group = L.featureGroup(layers);
    map.fitBounds(group.getBounds(), { padding: [30, 30] });
  } else {
    map.setView([hotel.lat, hotel.lng], 14);
  }

  renderPlan(selected, duration);
}

function renderPlan(selected, duration) {
  const plan = document.getElementById("plan");
  plan.innerHTML = "";

  const placesPerDay = 7;

  for (let day = 1; day <= duration; day++) {
    const dayPlaces = selected.slice((day - 1) * placesPerDay, day * placesPerDay);

    const card = document.createElement("div");
    card.className = "day-card";

    const list = dayPlaces
      .map(item => {
        return `<li>${getPlaceName(item.feature, item.type)} <em>(${titleCase(getCategory(item.feature, item.type))})</em></li>`;
      })
      .join("");

    card.innerHTML = `
      <h3>Day ${day}</h3>
      <ol>${list || "<li>No places found. Try selecting more categories.</li>"}</ol>
    `;

    plan.appendChild(card);
  }
}

document.getElementById("generatePlan").addEventListener("click", generatePlan);

loadData();
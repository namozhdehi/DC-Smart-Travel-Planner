<h1>DC Smart Travel Planner (GIS Project)</h1>

<h2>Introduction</h2>

<p>
  I built a DC Smart Travel Planner that combines <strong>QGIS</strong>, <strong>Python</strong>,
  <strong>GeoPandas</strong>, and a <strong>Leaflet web application</strong>.
</p>

<p>
  The project starts with collecting OpenStreetMap data using Overpass Turbo, followed by cleaning
  and standardizing the data in QGIS. I created final layers for attractions, parks, and food,
  and also designed a professional print-friendly map layout.
</p>

<p>
  One of the main challenges I solved was handling Coordinate Reference Systems (CRS).
  Some datasets appeared correct in QGIS but did not display properly in the web app.
  I fixed this by converting all datasets to <strong>EPSG:4326</strong> using GeoPandas
  and validating coordinate ranges to ensure compatibility with Leaflet.
</p>

<p>
  I then built an interactive web app where users can choose trip duration, start location,
  attraction types, food types, parks, and interests. The app generates a simple daily travel plan
  and displays the selected locations on a map.
</p>

<p>
  This project demonstrates my ability to connect desktop GIS workflows, Python automation,
  and web-based geospatial visualization into a complete, user-friendly solution.
</p>

<hr>

<p>
  This project demonstrates how <strong>geospatial analysis</strong>, <strong>QGIS</strong>,
  <strong>Python/GeoPandas</strong>, and a <strong>Leaflet web app</strong> can be used to
  organize and simplify travel planning in <strong>Washington, DC</strong>.
</p>

<p>
  Instead of showing all locations equally, the project cleans OpenStreetMap data,
  groups and scores locations, and provides both a <strong>print-friendly QGIS map</strong>
  and an <strong>interactive travel planner</strong>.
</p>

<hr>

<h2>Live Web App</h2>

<p>
  <a href="https://namozhdehi.github.io/DC-Smart-Travel-Planner/" target="_blank">
    <strong>Launch DC Smart Travel Planner Web App</strong>
  </a>
</p>

<ul>
  <li>Trip duration (1–3 days)</li>
  <li>Start location selection</li>
  <li>Attractions, parks, and food filters</li>
  <li>Attraction type filtering (museum, historic, artwork, garden, etc.)</li>
  <li>Food type filtering (cafe, restaurant, fast food, bar, pub, etc.)</li>
</ul>

<hr>

<h2>Final QGIS Print-Friendly Map</h2>

<a href="outputs/dc_top_attractions_map.png" target="_blank">
  <img src="outputs/dc_top_attractions_map.png" width="900">
</a>

<p>
  <a href="outputs/dc_travel_planner_map.pdf" target="_blank">
    View PDF Map
  </a>
</p>

<hr>

<h2>Project Structure</h2>

<pre>
DC-Smart-Travel-Planner/
│
├── index.html
├── style.css
├── app.js
├── README.md
│
├── data/
│   ├── raw/
│   ├── processed/
│   └── final/
│
├── scripts/
│   └── export_gpkg_to_geojson.py
│
├── qgis/
│   └── dc_travel_planner.qgz
│
└── outputs/
    ├── dc_top_attractions_map.png
    └── dc_travel_planner_map.pdf
</pre>

<hr>

<h2>Workflow</h2>

<ul>
  <li>Collected data from OpenStreetMap (Overpass Turbo)</li>
  <li>Cleaned and structured data in QGIS</li>
  <li>Created standardized fields like <strong>type</strong> and <strong>name_clean</strong></li>
  <li>Handled CRS transformation issues</li>
  <li>Exported final datasets to GeoJSON (EPSG:4326)</li>
  <li>Designed a QGIS print layout</li>
  <li>Built a Leaflet web app with filters and trip logic</li>
</ul>

<hr>

<h2>Python Automation</h2>

<p>
  Script:
</p>

<pre>scripts/export_gpkg_to_geojson.py</pre>

<p>
  Converts GeoPackage files to web-ready GeoJSON:
</p>

<pre>
data/final/dc_top_attractions.geojson
data/final/dc_food_final.geojson
data/final/dc_parks_final.geojson
</pre>

<hr>

<h2>Run Locally</h2>

<pre>
cd "/Users/nahid/Desktop/QGIS Portfolio/DC_Travel_Planner"
python3 -m http.server 8000
</pre>

<p>
  Open:
</p>

<pre>http://localhost:8000/index.html</pre>

<hr>

<h2>Key Challenges Solved</h2>

<ul>
  <li>CRS mismatch between QGIS and Leaflet</li>
  <li>UTM to WGS84 conversion</li>
  <li>Cleaning inconsistent OpenStreetMap attributes</li>
  <li>Handling mixed <strong>type</strong> and <strong>name_clean</strong> fields</li>
  <li>Dynamic filtering for food and attraction types</li>
</ul>

<hr>

<h2>Tech Stack</h2>

<ul>
  <li>QGIS</li>
  <li>GeoPandas (Python)</li>
  <li>Leaflet</li>
  <li>HTML / CSS / JavaScript</li>
  <li>OpenStreetMap / Overpass Turbo</li>
  <li>GitHub Pages</li>
</ul>

<hr>

<h2>Author</h2>

<p>
  <strong>Nahid Mozhdehi</strong><br>
  GIS Analyst / GIS Developer focused on geospatial data processing, automation, and web mapping.
</p>

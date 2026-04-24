<h1>DC Smart Travel Planner (GIS Project)</h1>

<p>
  This project uses <strong>geospatial analysis</strong> to identify and visualize the most important attractions in <strong>Washington, DC</strong>.
</p>

<p>
  Instead of simply mapping all locations, the goal was to organize them in a more meaningful way. Attractions are grouped based on proximity, ranked based on importance, and reduced to one key location per area. This creates a clearer and more practical view for travel planning.
</p>

<h2>Project Overview</h2>

<p>
  The workflow starts with collecting open geospatial data from <strong>OpenStreetMap</strong>. The data is cleaned and filtered in <strong>QGIS</strong> to remove unnecessary fields and incomplete records.
</p>

<p>
  After preparation, <strong>DBSCAN clustering</strong> is applied to group nearby attractions. A scoring system is used to rank locations, and the top attraction from each cluster is selected. This reduces redundancy and highlights the most relevant places across the city.
</p>

<p>
  The final result is presented as a clean, well-designed map suitable for both digital viewing and print.
</p>

<h2>Final Map</h2>

<img src="DC_Travel_Planner_Map.png" alt="DC Smart Travel Planner Map" width="900">

<h2>Key Steps</h2>

<ul>
  <li>Collected attraction, food, and park data using <strong>OpenStreetMap</strong></li>
  <li>Cleaned and standardized the data in <strong>QGIS</strong></li>
  <li>Reprojected data to <strong>EPSG:26918</strong> for accurate spatial analysis</li>
  <li>Applied <strong>DBSCAN clustering</strong> to identify high-density areas</li>
  <li>Created a <strong>scoring system</strong> to rank attractions</li>
  <li>Performed a <strong>spatial join</strong> to combine clustering results with attributes</li>
  <li>Extracted the <strong>top attraction from each cluster</strong> using QGIS expressions</li>
  <li>Designed a final map layout with title, legend, scale bar, and north arrow</li>
</ul>

<h2>Output</h2>

<p>
  The project produces a final map that highlights <strong>one key attraction per cluster</strong>. This makes it easier to understand spatial patterns and supports more efficient travel planning.
</p>

<h2>Files</h2>

<ul>
  <li><strong>dc_travel_planner_map.pdf</strong> — final printable map</li>
  <li><strong>DC_Travel_Planner_Map.png</strong> — preview image</li>
  <li><strong>dc_top_attractions.gpkg</strong> — processed geospatial dataset</li>
</ul>

<h2>Tools Used</h2>

<ul>
  <li><strong>QGIS</strong></li>
  <li><strong>OpenStreetMap</strong></li>
  <li><strong>Overpass Turbo</strong></li>
</ul>

<h2>Author</h2>

<p>
  <strong>Nahid Mozhdehi</strong>
</p>

<h1>DC Smart Travel Planner (GIS Project)</h1>

<p>
  This project demonstrates how <strong>geospatial analysis</strong> can be used to organize and simplify travel decision-making in <strong>Washington, DC</strong>.
</p>

<p>
  Instead of displaying all locations equally, the analysis groups nearby attractions into meaningful clusters, ranks them based on importance, and selects one representative location per area. This reduces visual clutter and highlights the most valuable places for visitors.
</p>

<h2>Project Overview</h2>

<p>
  The workflow begins with collecting open geospatial data from <strong>OpenStreetMap</strong>. The data is then cleaned and prepared in <strong>QGIS</strong>, including removing incomplete records, standardizing attributes, and ensuring spatial consistency.
</p>

<p>
  To identify meaningful travel zones, <strong>DBSCAN clustering</strong> is applied to group nearby points of interest. A scoring approach is used to evaluate each location, and the top-ranked attraction from each cluster is selected. This process reduces redundancy while preserving spatial coverage across the city.
</p>

<p>
  The final output is a clean and well-structured map designed for both digital use and print, supporting a more efficient and practical travel planning experience.
</p>

<h2>Final Map</h2>

<a href="DC_Travel_Planner_Map.png" target="_blank">
  <img src="DC_Travel_Planner_Map.png" alt="DC Smart Travel Planner Map" width="900">
</a>

<h2>Methodology</h2>

<ul>
  <li>Collected attraction, food, and park data from <strong>OpenStreetMap</strong></li>
  <li>Cleaned and standardized datasets in <strong>QGIS</strong></li>
  <li>Reprojected data to <strong>EPSG:26918 (UTM Zone 18N)</strong> for accurate distance-based analysis</li>
  <li>Applied <strong>DBSCAN clustering</strong> to identify dense spatial patterns</li>
  <li>Developed a <strong>scoring system</strong> to rank points of interest</li>
  <li>Performed <strong>spatial joins</strong> to combine clustering and attribute data</li>
  <li>Extracted the <strong>top-ranked attraction per cluster</strong> using QGIS expressions</li>
  <li>Designed a professional map layout including title, legend, scale bar, and north arrow</li>
</ul>

<h2>Key Insight</h2>

<p>
  By applying clustering techniques, hundreds of individual locations are reduced into clear, meaningful zones. This approach improves readability and helps users quickly identify high-value areas instead of analyzing scattered points.
</p>

<h2>Output</h2>

<p>
  The final map highlights <strong>one key attraction per cluster</strong>, providing a simplified and structured view of the city. This supports better spatial understanding and more efficient trip planning.
</p>

<h2>Project Files</h2>

<ul>
  <li>
    <a href="dc_travel_planner_map.pdf" target="_blank">
      <strong>dc_travel_planner_map.pdf</strong>
    </a>
    — final printable map
  </li>

  <li>
    <a href="DC_Travel_Planner_Map.png" target="_blank">
      <strong>DC_Travel_Planner_Map.png</strong>
    </a>
    — visual preview
  </li>

  <li>
    <a href="dc_top_attractions.gpkg" target="_blank">
      <strong>dc_top_attractions.gpkg</strong>
    </a>
    — processed geospatial dataset
  </li>
</ul>

<h2>Tools and Technologies</h2>

<ul>
  <li><strong>QGIS</strong> (data processing, spatial analysis, cartography)</li>
  <li><strong>OpenStreetMap (OSM)</strong> (data source)</li>
  <li><strong>Overpass Turbo</strong> (data extraction)</li>
  <li><strong>DBSCAN Clustering</strong> (spatial grouping technique)</li>
</ul>

<h2>Author</h2>

<p>
  <strong>Nahid Mozhdehi</strong><br>
  GIS Analyst specializing in geospatial data processing, spatial analysis, and workflow automation
</p>

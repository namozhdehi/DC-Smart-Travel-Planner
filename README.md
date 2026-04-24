DC Smart Travel Planner (GIS Project)

This project focuses on using geospatial analysis to identify and visualize the most important attractions in Washington, DC.

Instead of simply mapping all locations, the goal was to organize them in a more meaningful way. Attractions are grouped based on proximity, ranked based on their importance, and reduced to one key location per area. This helps create a clearer and more practical view for travel planning.

Project Overview

The workflow starts with collecting open geospatial data from OpenStreetMap. The data is then cleaned and filtered in QGIS to remove unnecessary fields and incomplete records.

After preparation, spatial clustering is applied to group nearby attractions. A scoring system is used to rank locations, and the top attraction from each cluster is selected. This reduces redundancy and highlights the most relevant places across the city.

The final result is presented as a clean, well-designed map that is suitable for both digital viewing and print.

Key Steps
Collected attraction, food, and park data using OpenStreetMap
Cleaned and standardized the data in QGIS
Reprojected data to a local coordinate system for accurate spatial analysis
Applied DBSCAN clustering to identify high-density areas
Created a scoring system to rank attractions
Performed a spatial join to combine clustering results with attributes
Extracted the top attraction from each cluster using QGIS expressions
Designed a final map layout with proper cartographic elements
Output

The project produces a final map that highlights one key attraction per cluster. This makes it easier to understand spatial patterns and supports more efficient travel planning.

Files
dc_travel_planner_map.pdf — final printable map
DC_Travel_Planner_Map.png — preview image
dc_top_attractions.gpkg — processed geospatial dataset
Tools Used
QGIS
OpenStreetMap
Author

Nahid Mozhdehi

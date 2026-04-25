import geopandas as gpd
from pathlib import Path

# Get project root folder
BASE_DIR = Path(__file__).resolve().parents[1]

# Input and output paths
input_file = BASE_DIR / "dc_top_attractions.gpkg"
output_file = BASE_DIR / "data" / "dc_top_attractions.geojson"

# Read GeoPackage
gdf = gpd.read_file(input_file)

# Convert CRS for web maps
gdf = gdf.to_crs(epsg=4326)

# Create output folder if needed
output_file.parent.mkdir(exist_ok=True)

# Export to GeoJSON
gdf.to_file(output_file, driver="GeoJSON")

print(f"Exported {len(gdf)} features to {output_file}")
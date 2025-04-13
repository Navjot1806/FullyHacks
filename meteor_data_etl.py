import json
from geopy.geocoders import Nominatim
from time import sleep

# Load meteorite JSON
with open("meteorites.json", "r") as f:
    data = json.load(f)

# Initialize geolocator
geolocator = Nominatim(user_agent="meteor-city-mapper")

# Add city to each entry using reverse geocoding
for meteor in data:
    lat = meteor.get("lat")
    lng = meteor.get("lng")

    if lat is not None and lng is not None:
        try:
            location = geolocator.reverse((lat, lng), language='en', timeout=10)
            if location and "address" in location.raw:
                address = location.raw["address"]
                meteor["city"] = address.get("city") or address.get("town") or address.get("village") or address.get("state") or "Unknown"
            else:
                meteor["city"] = "Unknown"
        except Exception:
            meteor["city"] = "Unknown"
        print(f"{meteor['name']} → {meteor['city']}")
        sleep(1)  # Nominatim rate limit

# Save updated data
with open("meteorites_with_cities.json", "w") as f:
    json.dump(data, f, indent=2)

print("✅ Saved meteorites_with_cities.json with city names!")

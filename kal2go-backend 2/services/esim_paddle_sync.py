import requests
import json
import time
from dotenv import load_dotenv
import os

# Load environment variables
load_dotenv()

# API Configuration
ESIM_ACCESS_URL = "https://api.esimaccess.com/api/v1/open/package/list"
ESIM_ACCESS_CODE = os.getenv("ESIM_ACCESS_CODE")
PADDLE_API_URL = "https://sandbox-api.paddle.com/products"
PADDLE_API_KEY = os.getenv("PADDLE_API_KEY")
OUTPUT_FILE = "esim_packages_debug.json"

# API Headers
HEADERS_ESIM = {
    "RT-AccessCode": ESIM_ACCESS_CODE,
    "Content-Type": "application/json"
}

HEADERS_PADDLE = {
    "Authorization": f"Bearer {PADDLE_API_KEY}",
    "Content-Type": "application/json",
    "Accept": "application/json"
}

def fetch_esim_packages():
    """
    Fetch packages from eSIM Access API.
    """
    payload = {
        "locationCode": "",
        "type": "",
        "slug": "",
        "packageCode": "",
        "iccid": ""
    }

    try:
        print("Sending POST request to eSIM Access...")
        response = requests.post(ESIM_ACCESS_URL, headers=HEADERS_ESIM, json=payload)
        response.raise_for_status()

        data = response.json()
        print("Response received successfully!")

        # Save response to JSON file
        with open(OUTPUT_FILE, "w") as outfile:
            json.dump(data, outfile, indent=4)
        print(f"Response saved to {OUTPUT_FILE}.")

        packages = data.get("obj", {}).get("packageList", [])
        if not packages:
            print("No packages found in the response.")
            return []
        print(f"Found {len(packages)} packages.")
        return packages

    except requests.exceptions.HTTPError as http_err:
        print(f"HTTP error occurred: {http_err}")
    except requests.exceptions.RequestException as req_err:
        print(f"Request error occurred: {req_err}")
    except json.JSONDecodeError:
        print("Error decoding JSON response.")
    except Exception as e:
        print(f"An error occurred: {e}")

    return []

def create_paddle_product(package):
    """
    Create a product in Paddle API.
    """
    name = package.get("name", "").strip()
    if not name or len(name) < 2:
        print(f"Invalid product name: {name}")
        return None

    payload = {
        "name": name,
        "description": package.get("description", "No description available"),
        "tax_category": "standard",
        "type": "standard",
        "image_url": "https://example.com/image.png",
        "custom_data": {
            "packageCode": package.get("packageCode", "default_code")
        }
    }

    try:
        print(f"Creating product: {payload['name']}...")
        response = requests.post(PADDLE_API_URL, headers=HEADERS_PADDLE, json=payload)
        response.raise_for_status()

        data = response.json()
        if "data" in data and "id" in data["data"]:
            print(f"Product created successfully: {data['data']['id']}")
            return data['data']['id']
        else:
            print(f"Error creating product: {data}")
            return None

    except requests.exceptions.HTTPError as http_err:
        print(f"HTTP error occurred: {http_err}")
    except requests.exceptions.RequestException as req_err:
        print(f"Request error occurred: {req_err}")
    except Exception as e:
        print(f"An error occurred: {e}")
    return None

def sync_packages_with_paddle():
    """
    Sync eSIM packages with Paddle.
    """
    packages = fetch_esim_packages()
    if not packages:
        print("No packages to sync.")
        return

    for package in packages:
        product_id = create_paddle_product(package)

        if product_id:
            print("Waiting before the next request...")
            time.sleep(2)

if __name__ == "__main__":
    print("Starting sync process...")
    sync_packages_with_paddle()
    print("Sync process completed.")
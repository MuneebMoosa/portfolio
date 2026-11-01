
import httpx

BACKEND_URL = "http://backend:8000"


def fetch_portfolio_data(endpoint: str):
    url = f"{BACKEND_URL}/api/{endpoint}"

    try:
        response = httpx.get(url, timeout=10.0)
        response.raise_for_status()

        result = response.json()

        return result.get("data", [])

    except httpx.HTTPError as error:
        print(f"Portfolio API error: {error}")
        raise


def get_all_portfolio_data():
    return {
        "projects": fetch_portfolio_data("projects"),
        "skills": fetch_portfolio_data("skills"),
        "journey": fetch_portfolio_data("journey"),
    }

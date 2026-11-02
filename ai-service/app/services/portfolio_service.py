
import httpx

from app.core.config import BACKEND_URL, PUBLIC_BACKEND_URL


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


def get_cv_data():
    try:
        cv = fetch_portfolio_data("cv")
    except Exception as error:
        print(f"CV API error: {error}")
        return None

    if not cv:
        return None

    return {
        "fileName": cv.get("fileName"),
        "updatedAt": cv.get("updatedAt"),
        "downloadUrl": (
            f"{PUBLIC_BACKEND_URL}/api/cv/download"
            if cv.get("fileUrl")
            else None
        ),
    }


def get_all_portfolio_data():
    return {
        "projects": fetch_portfolio_data("projects"),
        "skills": fetch_portfolio_data("skills"),
        "journey": fetch_portfolio_data("journey"),
        "cv": get_cv_data(),
    }

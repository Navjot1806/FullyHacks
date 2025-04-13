from fastapi import FastAPI, Request, Header

from fastapi.middleware.cors import CORSMiddleware
import http.client
import json

app = FastAPI()

# CORS setup to allow React frontend (adjust origins as needed)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # or ["*"] for testing
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Your actual AstronomyAPI key
AUTH_HEADER = {
    "Authorization": "Basic Basic NGYwMTAxNjktNjI2Yi00MDk1LTg1N2EtMTk3MzM1YmNlNDkwOjM5NWJlODY4NmU1NmRjMTlmN2QyZWE5ZmFlNGU3YTU2ZDE2NDNmY2FjZTRjOTRhNDAzYWRjMjA1MmE4MGE0ZTdlOGRjN2E3YmYyYzVhZWVjZjViYTZiNjhlMzc4ZDBkMGI0ODFiNjFjY2YzMDBiYmFmZGZmMzY4ZWRjZDIyZmYzNTUyNzlkMjZhMmQ5ZDJjODg5NWRhNDk2YjNjYWRkZWE2OWFmMTMwMDUzZmI4YWRhODAwMWEzNmVlNzM2Y2Y0MzhlY2U1Yzc4YzMxYjE1YzY2NDAyNWE3ZDYxZmFmNmEy"
}

@app.post("/api/star-chart")
async def proxy_star_chart(request: Request, authorization: str = Header(...)):
    body = await request.json()
    payload = json.dumps(body)

    conn = http.client.HTTPSConnection("api.astronomyapi.com")
    conn.request("POST", "/api/v2/studio/star-chart", payload, {
        "Authorization": authorization,
        "Content-Type": "application/json"
    })
    res = conn.getresponse()
    data = res.read()

    return json.loads(data.decode("utf-8"))

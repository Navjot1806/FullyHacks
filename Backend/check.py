import http.client

conn = http.client.HTTPSConnection("api.astronomyapi.com")

payload = "{\"style\":\"inverted\",\"observer\":{\"latitude\":33.775867,\"longitude\":-84.39733,\"date\":\"2025-04-13\"},\"view\":{\"type\":\"constellation\",\"parameters\":{\"constellation\":\"sct\"}}}"

headers = { 'Authorization': "Basic NGYwMTAxNjktNjI2Yi00MDk1LTg1N2EtMTk3MzM1YmNlNDkwOjM5NWJlODY4NmU1NmRjMTlmN2QyZWE5ZmFlNGU3YTU2ZDE2NDNmY2FjZTRjOTRhNDAzYWRjMjA1MmE4MGE0ZTdlOGRjN2E3YmYyYzVhZWVjZjViYTZiNjhlMzc4ZDBkMGI0ODFiNjFjY2YzMDBiYmFmZGZmMzY4ZWRjZDIyZmYzNTUyNzlkMjZhMmQ5ZDJjODg5NWRhNDk2YjNjYWRkZWE2OWFmMTMwMDUzZmI4YWRhODAwMWEzNmVlNzM2Y2Y0MzhlY2U1Yzc4YzMxYjE1YzY2NDAyNWE3ZDYxZmFmNmEy" }

conn.request("POST", "/api/v2/studio/star-chart", payload, headers)

res = conn.getresponse()
data = res.read()

print(data.decode("utf-8"))
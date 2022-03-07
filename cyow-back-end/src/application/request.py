from typing import Dict
from dataclasses import dataclass
import typing


@dataclass
class Request:
    path: str
    query: Dict[str, str]
    body: bytes
    headers: Dict[str, str]
    path_params: Dict[str, typing.Any]
    song: typing.Any

    @classmethod
    def from_environ(cls, environ: Dict, song):
        path_params = {}
        if environ["PATH_INFO"].find("/api/track/") == 0:
            path_parts = environ["PATH_INFO"].split("/")
            path_params["track_index"] = path_parts[3]

            if "launch" in environ["PATH_INFO"]:
                path_params["clip_index"] = path_parts[4]
                path = "/api/track/launch"
            else:
                path = "/api/track"
        else:
            path = environ["PATH_INFO"]

        query = {}
        if environ["QUERY_STRING"]:
            qs = environ["QUERY_STRING"]
            query = dict(entry.split("=") for entry in qs.split("&"))
        body = environ["wsgi.input"].read()
        headers = {
            key.replace("HTTP_", ""): value
            for key, value in environ.items()
            if key.startswith("HTTP_")
        }
        return cls(path, query, body, headers, path_params, song)

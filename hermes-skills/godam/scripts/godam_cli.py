#!/usr/bin/env python3
"""CLI client for the GoDam warehouse API — used by the Hermes godam skill."""

from __future__ import annotations

import argparse
import json
import os
import sys
import urllib.error
import urllib.parse
import urllib.request

DEFAULT_BASE = "http://127.0.0.1:4000"
DEFAULT_KEY = "godam-dev-key"


def base_url() -> str:
    return os.environ.get("GODAM_API_BASE", DEFAULT_BASE).rstrip("/")


def api_key() -> str:
    return os.environ.get("GODAM_API_KEY", DEFAULT_KEY)


def request(method: str, path: str, body: dict | None = None, stream: bool = False):
    url = f"{base_url()}{path}"
    data = None
    headers = {
        "Accept": "text/event-stream" if stream else "application/json",
        "X-API-Key": api_key(),
        "Authorization": f"Bearer {api_key()}",
    }
    if body is not None:
        data = json.dumps(body).encode("utf-8")
        headers["Content-Type"] = "application/json"
    req = urllib.request.Request(url, data=data, headers=headers, method=method)
    try:
        return urllib.request.urlopen(req, timeout=60)
    except urllib.error.HTTPError as exc:
        detail = exc.read().decode("utf-8", errors="replace")
        raise SystemExit(f"HTTP {exc.code}: {detail}") from exc
    except urllib.error.URLError as exc:
        raise SystemExit(
            f"Could not reach GoDam API at {base_url()}: {exc.reason}\n"
            "Start it with: npm run godam-api"
        ) from exc


def print_json(payload) -> None:
    print(json.dumps(payload, indent=2, sort_keys=False))


def cmd_health(_: argparse.Namespace) -> None:
    with request("GET", "/health") as resp:
        print_json(json.load(resp))


def cmd_dashboard(_: argparse.Namespace) -> None:
    with request("GET", "/api/dashboard") as resp:
        print_json(json.load(resp))


def cmd_orders(args: argparse.Namespace) -> None:
    qs = ""
    if args.status:
        qs = "?" + urllib.parse.urlencode({"status": args.status})
    with request("GET", f"/api/orders{qs}") as resp:
        print_json(json.load(resp))


def cmd_order(args: argparse.Namespace) -> None:
    with request("GET", f"/api/orders/{urllib.parse.quote(args.id)}") as resp:
        print_json(json.load(resp))


def cmd_shipments(args: argparse.Namespace) -> None:
    qs = ""
    if args.status:
        qs = "?" + urllib.parse.urlencode({"status": args.status})
    with request("GET", f"/api/shipments{qs}") as resp:
        print_json(json.load(resp))


def cmd_stock(args: argparse.Namespace) -> None:
    qs = ""
    if args.part:
        qs = "?" + urllib.parse.urlencode({"partNumber": args.part})
    with request("GET", f"/api/stock{qs}") as resp:
        print_json(json.load(resp))


def cmd_approvals(args: argparse.Namespace) -> None:
    qs = "?" + urllib.parse.urlencode({"status": args.status})
    with request("GET", f"/api/approvals{qs}") as resp:
        print_json(json.load(resp))


def cmd_events(args: argparse.Namespace) -> None:
    qs = "?" + urllib.parse.urlencode({"limit": str(args.limit)})
    with request("GET", f"/api/events{qs}") as resp:
        print_json(json.load(resp))


def cmd_approve(args: argparse.Namespace) -> None:
    body = {"decision": args.decision.upper(), "note": args.note or ""}
    with request("POST", f"/api/approvals/{args.id}/decide", body=body) as resp:
        print_json(json.load(resp))


def cmd_watch(args: argparse.Namespace) -> None:
    import time

    started = time.time()
    with request("GET", "/api/realtime", stream=True) as resp:
        while True:
            if args.seconds and time.time() - started >= args.seconds:
                break
            line = resp.readline()
            if not line:
                break
            text = line.decode("utf-8", errors="replace").rstrip("\n")
            if text:
                print(text, flush=True)


def build_parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(description="GoDam API CLI for Hermes")
    sub = parser.add_subparsers(dest="command", required=True)

    sub.add_parser("health", help="API health check").set_defaults(func=cmd_health)
    sub.add_parser("dashboard", help="Live dashboard").set_defaults(func=cmd_dashboard)

    p_orders = sub.add_parser("orders", help="List orders")
    p_orders.add_argument("--status")
    p_orders.set_defaults(func=cmd_orders)

    p_order = sub.add_parser("order", help="Get one order")
    p_order.add_argument("id")
    p_order.set_defaults(func=cmd_order)

    p_ship = sub.add_parser("shipments", help="List shipments")
    p_ship.add_argument("--status")
    p_ship.set_defaults(func=cmd_shipments)

    p_stock = sub.add_parser("stock", help="List stock")
    p_stock.add_argument("--part")
    p_stock.set_defaults(func=cmd_stock)

    p_appr = sub.add_parser("approvals", help="List approvals")
    p_appr.add_argument("--status", default="PENDING")
    p_appr.set_defaults(func=cmd_approvals)

    p_events = sub.add_parser("events", help="Recent events")
    p_events.add_argument("--limit", type=int, default=10)
    p_events.set_defaults(func=cmd_events)

    p_approve = sub.add_parser("approve", help="Decide an approval")
    p_approve.add_argument("id")
    p_approve.add_argument("--decision", required=True, choices=["APPROVED", "REJECTED", "approved", "rejected"])
    p_approve.add_argument("--note", default="")
    p_approve.set_defaults(func=cmd_approve)

    p_watch = sub.add_parser("watch", help="Stream SSE realtime events")
    p_watch.add_argument("--seconds", type=int, default=15)
    p_watch.set_defaults(func=cmd_watch)

    return parser


def main(argv: list[str] | None = None) -> int:
    parser = build_parser()
    args = parser.parse_args(argv)
    args.func(args)
    return 0


if __name__ == "__main__":
    sys.exit(main())

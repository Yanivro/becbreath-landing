#!/usr/bin/env bash
# Thin wrapper around Bec's Cal.com API v2.
#   scripts/cal.sh <METHOD> <path> [json-body | @file.json]
# Examples:
#   scripts/cal.sh GET /event-types
#   scripts/cal.sh GET "/slots?eventTypeId=7829731&start=2026-11-10&end=2026-11-20&timeZone=Asia/Bangkok"
#   scripts/cal.sh PATCH /event-types/7829729 '{"lengthInMinutes":120}'
#   scripts/cal.sh GET "/bookings?status=upcoming"
#
# The key lives in ~/.calcom-bec.env (CAL_API_KEY) and never goes in this repo.
# Use curl, not Python urllib: Cloudflare blocks urllib's client signature (error 1010).
set -euo pipefail
[ $# -ge 2 ] || { sed -n '2,10p' "$0"; exit 1; }
source ~/.calcom-bec.env
METHOD=$1; P=$2; BODY=${3:-}

# Each endpoint group wants its own cal-api-version header.
case "$P" in
  /bookings*)                 VER=2024-08-13 ;;
  /event-types*)              VER=2024-06-14 ;;
  /slots*)                    VER=2024-09-04 ;;
  /schedules*)                VER=2024-06-11 ;;
  /workflows*)                VER=2026-09-22 ;;
  *)                          VER=2024-08-13 ;;
esac

ARGS=(-s -X "$METHOD" "https://api.cal.com/v2$P"
      -H "Authorization: Bearer $CAL_API_KEY"
      -H "cal-api-version: $VER"
      -H "Content-Type: application/json")
[ -n "$BODY" ] && ARGS+=(-d "$BODY")
curl "${ARGS[@]}" | python3 -m json.tool

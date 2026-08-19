#!/usr/bin/env bash
# Posts build status to the #ci-cd-alerts Slack channel via incoming webhook.
# Usage: ./notify-slack.sh success|failure
set -euo pipefail

status="$1"

if [ -z "${SLACK_WEBHOOK_URL:-}" ]; then
  echo "SLACK_WEBHOOK_URL not set — skipping ChatOps notification"
  exit 0
fi

if [ "$status" = "success" ]; then
  icon=":white_check_mark:"
else
  icon=":x:"
fi

run_url="${GITHUB_SERVER_URL}/${GITHUB_REPOSITORY}/actions/runs/${GITHUB_RUN_ID}"

text="${icon} *Build ${status}* — \`${GITHUB_REPOSITORY}\`
• Branch: \`${GITHUB_REF_NAME}\`
• Commit: \`${GITHUB_SHA:0:7}\` by ${GITHUB_ACTOR}
• <${run_url}|View run logs>"

curl -sS --fail-with-body -X POST "$SLACK_WEBHOOK_URL" \
  -H 'Content-Type: application/json' \
  --data "$(TEXT="$text" node -e 'process.stdout.write(JSON.stringify({text: process.env.TEXT}))')"

echo
echo "Slack notified: $status"

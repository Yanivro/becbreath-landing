# Reminder email drafts (for when Bec upgrades Cal.com)

Bec's current Cal.com plan only sends the standard reminder text. These are the warmer versions,
written in the site's voice. To use them after an upgrade, PATCH each workflow step with
`template: "custom"` and this subject/html (see `scripts/cal.sh`). Workflow ids: 513551 (client 24 h),
513552 (client 1 h), 513553 (Bec 24 h). The 24 h client reminder splits into a sessions version and a
discovery-call version, which needs one extra workflow.

## Client reminder 24h: sessions
- Trigger: 24 hour before
- To: email_attendee
- Subject: `Tomorrow: your {EVENT_NAME} with Bec`

```html
<p>Hi {ATTENDEE_FIRST_NAME},</p>
<p>A gentle reminder that your {EVENT_NAME} is tomorrow, {EVENT_DATE_dddd, D MMMM} at {START_TIME_h:mma} ({TIMEZONE}).</p>
<p>A few things that help:</p>
<ul><li>Find a quiet, private space where you can lie down comfortably and won't be disturbed.</li>
<li>Have a blanket, a pillow and some water nearby.</li>
<li>Try not to eat a heavy meal in the couple of hours before.</li>
<li>Test your Zoom connection and headphones beforehand if you can.</li>
</ul><p>Your Zoom link: <a href="{MEETING_URL}">{MEETING_URL}</a></p>
<p>If you need to change the time, you can <a href="{RESCHEDULE_URL}">reschedule here</a> or <a href="{CANCEL_URL}">cancel here</a>. Please give me as much notice as you can.</p>
<p>I'm looking forward to breathing with you.</p>
<p>With love,<br>Bec x</p>

```

## Client reminder 24h: discovery call
- Trigger: 24 hour before
- To: email_attendee
- Subject: `Tomorrow: your discovery call with Bec`

```html
<p>Hi {ATTENDEE_FIRST_NAME},</p>
<p>Just a reminder that our discovery call is tomorrow, {EVENT_DATE_dddd, D MMMM} at {START_TIME_h:mma} ({TIMEZONE}).</p>
<p>It's a relaxed 30-minute conversation, so there's nothing to prepare. Bring any questions you have, and we'll talk about what you're hoping for and whether this work feels right for you.</p>
<p>Your Zoom link: <a href="{MEETING_URL}">{MEETING_URL}</a></p>
<p>If you need to change the time, you can <a href="{RESCHEDULE_URL}">reschedule here</a> or <a href="{CANCEL_URL}">cancel here</a>. Please give me as much notice as you can.</p>
<p>Looking forward to meeting you.</p>
<p>With love,<br>Bec x</p>

```

## Client reminder 1h: all
- Trigger: 1 hour before
- To: email_attendee
- Subject: `In one hour: your {EVENT_NAME} with Bec`

```html
<p>Hi {ATTENDEE_FIRST_NAME},</p>
<p>We meet in about an hour, at {START_TIME_h:mma} ({TIMEZONE}).</p>
<p>Join here: <a href="{MEETING_URL}">{MEETING_URL}</a></p>
<p>See you soon.</p>
<p>With love,<br>Bec x</p>

```

## Bec heads-up 24h: all
- Trigger: 24 hour before
- To: email_host
- Subject: `Tomorrow: {EVENT_NAME} with {ATTENDEE_NAME}`

```html
<p>Hi Bec,</p>
<p>You have a {EVENT_NAME} with <strong>{ATTENDEE_NAME}</strong> ({ATTENDEE_EMAIL}) tomorrow, {EVENT_DATE_dddd, D MMMM} at {START_TIME_h:mma} ({TIMEZONE}).</p>
<p>Their notes: {ADDITIONAL_NOTES}</p>
<p>Zoom: <a href="{MEETING_URL}">{MEETING_URL}</a></p>
<p>Their phone number, preferred contact method and how they heard about you are in the booking in Cal.com.</p>

```

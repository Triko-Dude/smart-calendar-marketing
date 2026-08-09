# Privacy Policy

**Last updated:** August 9, 2026

Chronocal (“we”, “us”) respects your privacy. This policy describes what data we collect, how we use it—including Google user data—and how you can retain or delete it.

Chronocal is a local-first weekly planner. By default, your planner data stays on your device. Optional sign-in, cloud sync, Google Calendar, and the Gmail widget are features you choose to enable.

## Data we store (non-Google)

- **Local data:** Tasks, calendar blocks, focus zones, themes, and preferences are stored on your device by default.
- **Cloud data:** If you enable cloud sync, your planner data is stored in our Convex backend, associated with your account.

## Google user data we access

When you sign in with Google and/or connect Google services, Chronocal may access the following Google user data, limited to what you authorize:

### Google Sign-in (openid, email, profile)

- Your Google account name
- Email address
- Profile photo (if available)

### Google Calendar (when you connect Google Calendar)

We request `https://www.googleapis.com/auth/calendar` and `https://www.googleapis.com/auth/calendar.events`. Through those APIs we may access:

- Your calendar list (calendar IDs, names, colors, primary flag)
- Event data returned by Google Calendar (titles, descriptions, locations, start/end times, attendees, recurrence, and related metadata)

### Gmail widget (optional, separate connect)

If you separately connect the Gmail widget, we request `https://www.googleapis.com/auth/gmail.readonly` and may access unread message metadata such as sender, subject, and snippet for display in the widget. This is not required for Calendar sync and is authorized only when you connect that widget.

## How we use Google user data

We use Google user data **only to provide and improve Chronocal’s user-facing features**:

- **Sign-in:** Authenticate your Chronocal account and associate optional cloud sync with you.
- **Calendar read:** Show your existing Google Calendar events as overlays on the weekly planner and use busy times so scheduling respects real meetings.
- **Calendar write:** Create, update, and delete events on a dedicated Chronocal-managed Google calendar when you schedule (or change) task blocks in Chronocal, keeping Google Calendar in sync with the planner.
- **Gmail widget (if connected):** Show unread message counts and a short unread list / badge. We do not send mail, mark messages read, or modify your mailbox.

We do **not** use Google user data for advertising, selling, credit decisions, or building unrelated databases.

## Storage of Google user data

- OAuth tokens and synced Google Calendar event copies used for overlays are stored in our Convex backend when you connect Calendar.
- Planner content may also remain on your device (local-first).
- Data is encrypted in transit (TLS) and at rest on our servers (Convex).

## Sharing, transfer, and disclosure of Google user data

- We do **not** sell Google user data.
- We do **not** share Google user data with third parties for advertising or data brokerage.
- We share Google user data only as needed to operate the service: with **Google** (via the APIs you authorize) and with our infrastructure provider **Convex** as a data processor hosting the backend.
- We do not transfer Google user data to third parties for purposes other than providing or improving Chronocal’s features described above.

## Data retention and deletion of Google user data

- We retain Google-derived data (tokens and synced calendar/event copies) for as long as needed to provide the connected features while your account remains connected and active, unless a longer retention period is required or permitted by law.
- When you **Disconnect Google Calendar** in Chronocal (Settings → Integrations), we remove the Calendar OAuth connection and delete synced Google Calendar overlay data from our backend for that connection.
- When you disconnect the Gmail widget, we remove that widget’s OAuth tokens and cached unread data from our backend.
- You may also revoke Chronocal’s access at any time in [Google Account → Third-party access / permissions](https://myaccount.google.com/permissions). After revocation, Chronocal can no longer call Google APIs until you reconnect.
- You may request deletion of Google user data we hold by emailing **hello@chronocal.tech**. We will delete or destroy eligible data within a reasonable period after verifying the request.
- Local planner data on your device is under your control; use Settings → Data backup/export or clear local storage / uninstall as needed.

## Limited use and AI / machine learning

Our use of Google user data complies with the [Google API Services User Data Policy](https://developers.google.com/terms/api-services-user-data-policy), including the Limited Use requirements.

We do **not** use Google user data (including data obtained through Google Workspace APIs) to develop, improve, or train generalized or non-personalized artificial intelligence and/or machine learning models. We do not use Google user data for personalized or interest-based advertising.

## In-product privacy notice

Inside Chronocal, Settings includes a link to this Privacy Policy. Google Calendar connect and disconnect controls are in Settings → Integrations. Disconnecting stops sync and removes connected Google Calendar data from our backend as described above.

## What we do not do

- We do not sell your data.
- We do not use your calendar or Gmail data for advertising.
- We do not share your events with third parties except Google (as the API provider you connect) and infrastructure processors needed to run Chronocal (Convex).

## Contact

Questions or deletion requests: **hello@chronocal.tech**

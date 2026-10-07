# Kinetic Axis deployment

## Normal deployment from the Mac

Run from the project root on your Mac:

```bash
chmod +x deploy.sh
./deploy.sh
```

The local `deploy.sh` uses the SSH alias `pace` from `~/.ssh/config`. The alias is expected to contain the server hostname/IP, root user, SSH key and port. The deployment scripts deliberately do **not** hard-code the VPS IP or port.

The local script packages the project, uploads it to `pace`, extracts it into a timestamped release beneath `/opt/kineticaxis-build/releases`, then runs `deploy/server-deploy.sh` on the VPS.

After a successful deploy, `/opt/kineticaxis-build/current` points at the source release that produced the live site.

## Production destinations

- Static site: `/var/www/kineticaxisdigital`
- Contact API: `/opt/kineticaxis-contact`
- Contact environment: `/etc/kineticaxis/contact.env` (preserved, never uploaded)
- systemd unit: `/etc/systemd/system/kineticaxis-contact.service`
- source releases: `/opt/kineticaxis-build/releases/<timestamp>`
- current source: `/opt/kineticaxis-build/current`
- production backups: `/var/backups/kineticaxisdigital/<timestamp>`

## What is intentionally untouched

The deployment does not rewrite the live Nginx server blocks, TLS certificates, SSH/firewall configuration, Postfix/Dovecot configuration, monitoring hosts, databases, Docker services or any Pace Venues services.

## Advanced

To use a different SSH config alias for one deployment:

```bash
REMOTE_HOST=my-other-alias ./deploy.sh
```

Normally leave this alone and use `pace`.


## SEO content releases

The deployment pipeline treats all App Router routes, metadata, route CSS and sitemap entries as one release. Phase 2 SEO routes are validated by `npm run test:content` and `npm run test:routes` before the live static directory is replaced.

## Production email configuration

The contact API uses the server-side environment file `/etc/kineticaxis/contact.env`. It is deliberately preserved during deployments and must contain:

```text
CONTACT_PORT=4319
PUBLIC_SITE_URL=https://kineticaxisdigital.com
SMTP_FROM=Kinetic Axis <carl@kineticaxisdigital.co.uk>
CONTACT_TO=carl@kineticaxisdigital.co.uk
```

The contact API sets `Reply-To` to the address entered by the customer, so replying to an enquiry addresses the customer even though the message is sent from the Kinetic Axis mailbox.

The live Postfix virtual aliases are intentionally managed outside this project deployment:

```text
@kineticaxisdigital.co.uk  -> kinetic-carl@localhost
@pacevenues.com            -> carl@localhost
```

This keeps the two public domains separate while providing a catch-all for each. After editing `/etc/postfix/virtual` manually, rebuild and reload with:

```bash
sudo postmap /etc/postfix/virtual
sudo systemctl reload postfix
```

The site deployment must not overwrite Postfix, Dovecot, mailbox credentials or the live contact environment file.

## Launch measurement

The production build records a small first-party conversion event stream through the dedicated same-origin `/api/events` proxy. It does not set analytics cookies, create a persistent visitor ID, or write names, email addresses or free-text form values to the analytics log.

The VPS stores events at `/var/lib/kineticaxis/analytics/events.ndjson`. Logrotate keeps the event log bounded. From the project root, use:

```bash
./analytics.sh 30
```

The optional number is the reporting window in days. The report includes Project Planner starts/completions, planner-to-contact clicks, contact-form starts/submissions/successes, project-category interest, enquiry origin pages, phone/WhatsApp/email clicks and top viewed routes.

## Search ownership verification

If Google Search Console or Bing Webmaster Tools provides an HTML verification token, create `/etc/kineticaxis/site.env` on the VPS from `deploy/site.env.example`. The production build reads those values and renders the verification meta tags. The deploy also submits the generated sitemap URLs to IndexNow after a successful publish; IndexNow failure is non-fatal and can be retried with `npm run seo:indexnow`.

## Growth dashboard authentication

`/admin/growth` and `/api/growth-summary` are protected by Nginx Basic Auth. Credentials are not stored in the project or frontend bundle. On the first deploy, `./deploy.sh` prompts for a username (defaults to `admin`) and a hidden password, then stores only an APR1 password hash in `/etc/kineticaxis/growth.htpasswd` on the VPS.

To change the dashboard credentials later, run `./growth-auth.sh` locally.

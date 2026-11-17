import { greet, toUrl } from "./util";

const $ = <T extends HTMLElement>(id: string) => document.getElementById(id) as T;

const input = $<HTMLInputElement>("q");
const form = $<HTMLFormElement>("search");
const sites = $<HTMLElement>("sites");
const clock = $<HTMLElement>("clock");
const greeting = $<HTMLElement>("greeting");

const MAX_SITES = 8;

function tick() {
  const now = new Date();
  clock.textContent = now.toLocaleString(undefined, {
    weekday: "long",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
  greeting.textContent = greet(now.getHours());
}

function go(raw: string) {
  const url = toUrl(raw);
  if (url) {
    location.href = url;
  } else if (raw.trim()) {
    browser.search.query({ text: raw.trim(), disposition: "CURRENT_TAB" });
  }
}

function tile(site: browser.topSites.MostVisitedURL, index: number): HTMLAnchorElement {
  const host = new URL(site.url).hostname.replace(/^www\./, "");
  const a = document.createElement("a");
  a.className = "site";
  a.href = site.url;
  a.title = site.title || host;

  const icon = document.createElement("span");
  icon.className = "tile";
  if (site.favicon) {
    const img = document.createElement("img");
    img.src = site.favicon;
    img.alt = "";
    img.onerror = () => img.replaceWith(host[0]?.toUpperCase() ?? "•");
    icon.append(img);
  } else {
    icon.textContent = host[0]?.toUpperCase() ?? "•";
  }

  const label = document.createElement("span");
  label.className = "label";
  label.textContent = host;

  const key = document.createElement("span");
  key.className = "key";
  key.textContent = String(index + 1);

  a.append(icon, label, key);
  return a;
}

async function loadSites() {
  const top = await browser.topSites.get({ includeFavicon: true, onePerDomain: true, limit: MAX_SITES });
  sites.replaceChildren(...top.filter((s) => /^https?:/.test(s.url)).slice(0, MAX_SITES).map(tile));
}

function syncKeys() {
  document.body.classList.toggle("keys", document.hasFocus() && document.activeElement !== input);
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  go(input.value);
});

input.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    input.value = "";
    input.blur();
  }
});

document.addEventListener("keydown", (e) => {
  if (document.activeElement === input || e.metaKey || e.ctrlKey || e.altKey) return;
  if (e.key === "/") {
    e.preventDefault();
    input.focus();
    return;
  }
  const n = Number(e.key);
  if (n >= 1 && n <= MAX_SITES) {
    const link = sites.children[n - 1] as HTMLAnchorElement | undefined;
    if (link) location.href = link.href;
  }
});

for (const ev of ["focusin", "focusout"] as const) document.addEventListener(ev, () => queueMicrotask(syncKeys));
window.addEventListener("focus", syncKeys);
window.addEventListener("blur", syncKeys);

tick();
setInterval(tick, 15_000);
loadSites().catch(() => sites.replaceChildren());
syncKeys();

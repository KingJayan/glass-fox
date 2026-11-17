import { theme } from "./theme";

const apply = () => browser.theme.update(theme);

browser.runtime.onStartup.addListener(apply);
browser.runtime.onInstalled.addListener(apply);
apply();

import { test } from "node:test";
import assert from "node:assert/strict";
import { greet, toUrl } from "../src/util.ts";

test("greet by hour", () => {
  assert.equal(greet(3), "Good night.");
  assert.equal(greet(9), "Good morning.");
  assert.equal(greet(14), "Good afternoon.");
  assert.equal(greet(20), "Good evening.");
});

test("url detection", () => {
  assert.equal(toUrl("github.com"), "https://github.com");
  assert.equal(toUrl("docs.pedropathing.com/path?x=1"), "https://docs.pedropathing.com/path?x=1");
  assert.equal(toUrl("localhost:5173"), "http://localhost:5173");
  assert.equal(toUrl("192.168.43.1:8080/dash"), "http://192.168.43.1:8080/dash");
  assert.equal(toUrl("https://example.com"), "https://example.com");
  assert.equal(toUrl("about:config"), "about:config");
  assert.equal(toUrl("firefox userchrome"), null);
  assert.equal(toUrl("hello"), null);
  assert.equal(toUrl("  "), null);
});

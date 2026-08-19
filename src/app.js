// __BUILD_ID__ is replaced at build time by build.mjs
const BUILD_ID = "__BUILD_ID__";

document.getElementById("build").textContent = BUILD_ID;
document.getElementById("ping").addEventListener("click", () => {
  document.getElementById("out").textContent = `pong @ ${new Date().toISOString()}`;
});

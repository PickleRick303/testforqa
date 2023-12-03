const JavaScriptObfuscator = require("javascript-obfuscator");
const fs = require("fs");
const path = require("path");

// Функція для обфускації файлу
function obfuscateFile(filePath) {
  const fileContent = fs.readFileSync(filePath, "utf-8");

  const obfuscated = JavaScriptObfuscator.obfuscate(fileContent, {
    // Опції обфускації
    compact: true,
    controlFlowFlattening: true,
    controlFlowFlatteningThreshold: 0.75,
    deadCodeInjection: true,
    deadCodeInjectionThreshold: 0.4,
    debugProtection: true,
    debugProtectionInterval: 1,
    disableConsoleOutput: true,

    // Інші опції можна додати за потреби
  });

  fs.writeFileSync(filePath, obfuscated.getObfuscatedCode());
}

// Шлях до папки з вихідними файлами
const buildDir = "build";

// Обфускація всіх JS файлів у папці
fs.readdirSync(buildDir).forEach((file) => {
  if (path.extname(file) === ".js") {
    obfuscateFile(path.join(buildDir, file));
  }
});

console.log("Обфускація завершена.");

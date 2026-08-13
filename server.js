const { spawn } = require("child_process");

const port = process.env.PORT || "3000";

console.log("=================================");
console.log("AMPT SYSTEMS - STARTING SERVER");
console.log("Node:", process.version);
console.log("NODE_ENV:", process.env.NODE_ENV || "undefined");
console.log("PORT:", port);
console.log("SUPABASE URL:", process.env.NEXT_PUBLIC_SUPABASE_URL ? "CONFIGURADA" : "AUSENTE");
console.log("SUPABASE ANON:", process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? "CONFIGURADA" : "AUSENTE");
console.log("SERVICE ROLE:", process.env.SUPABASE_SERVICE_ROLE_KEY ? "CONFIGURADA" : "AUSENTE");
console.log("ENCRYPTION KEY:", process.env.ENCRYPTION_KEY ? "CONFIGURADA" : "AUSENTE");
console.log("=================================");

const child = spawn(
  process.platform === "win32" ? "npx.cmd" : "npx",
  ["next", "start", "-p", port],
  {
    stdio: "inherit",
    env: {
      ...process.env,
      NODE_ENV: "production",
    },
  }
);

child.on("error", (error) => {
  console.error("=================================");
  console.error("ERRO AO INICIAR O NEXT.JS");
  console.error(error);
  console.error("=================================");
});

child.on("exit", (code, signal) => {
  console.error("=================================");
  console.error("NEXT.JS FOI ENCERRADO");
  console.error("EXIT CODE:", code);
  console.error("SIGNAL:", signal);
  console.error("=================================");

  process.exit(code ?? 1);
});

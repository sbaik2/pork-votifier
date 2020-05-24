module.exports = {
  apps : [
      {
        name: "votifier",
        script: "./votifier.js",
        env: {
          "NODE_ENV": "production",
        },
        output: "~/log/votifier.log",
        error: "~/log/votifier.err"
      }
  ]
}
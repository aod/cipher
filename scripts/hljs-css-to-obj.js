const fs = require("fs")

const args = process.argv
if (args.length <= 2) {
  console.log("Missing hljs CSS filepath")
  process.exit(1)
}

const cssFilepath = args[2]
const file = fs.readFileSync(cssFilepath, { encoding: "utf-8" }).toString()
const chunks = file.split("\n\n")

const obj = {}

for (const chunk of chunks) {
  let [selector, body] = chunk.split("{")

  const clazzes = [];
  for (const clazz of selector.split(/[, \r?\n]/)) {
    if (!clazz.startsWith(".hljs-")) continue
    clazzes.push(clazz.slice(1))
  }

  if (!clazzes.length) continue

  if (!body) continue;
  body = body.trim()
  const rules = body.split(/\r?\n/)
  rules.pop()

  for (const _rule of rules) {
    const rule = _rule.slice(0, -1)
    const [key, value] = rule.trim().split(": ")

    if (value === "inherit") continue

    for (const clazz of clazzes) {
      if (!obj[clazz]) obj[clazz] = {}
      obj[clazz] ??= {}
      obj[clazz][cssNameToJsx(key)] = value
    }
  }
}

function titleCase(string) {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}

function cssNameToJsx(name) {
  const split = name.split("-")
  return split[0] + split.slice(1).map(titleCase)
}

console.log("const styles =", JSON.stringify(obj, null, 2))
export function parseSysLog(message: string) {
  const fields: Record<string, string> = {};

  const keyValuePattern = /(\w+)=("[^"]*"|\S+)/g;

  let match;
  while ((match = keyValuePattern.exec(message)) !== null) {
    const key = match[1];
    const value = match[2].replace(/^"|"$/g, "");

    fields[key] = value;
  }
  return fields;
}

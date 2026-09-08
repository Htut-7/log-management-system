export function parseSysLog(message: string) {
  const fields: Record<string, unknown> = {};

  const keyValuePattern = /(\w+)=([^=]+?)(?=\s+\w+=|$)/g;

  let match;
  while ((match = keyValuePattern.exec(message)) !== null) {
    const key = match[1];
    let value: string | number = match[2].trim();

    if (key === "spt" || key === "dpt") {
      value = Number(value);
    }
    fields[key] = value;
  }
  return fields;
}

export function toTitleCase(str: string): string {
  return str.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
}

export function isEmpty(obj: any): boolean {
  return obj == null || (typeof obj === 'object' && Object.keys(obj).length === 0);
}

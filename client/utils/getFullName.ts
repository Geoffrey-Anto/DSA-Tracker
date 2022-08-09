export function getFullName(fistName: string, lastName: string): string {
  return fistName + " " + lastName;
}

export function splitName(name: string): string[] {
  return name.split(" ");
}

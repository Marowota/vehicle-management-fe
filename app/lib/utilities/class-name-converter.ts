function classNamesConverter(...classes: (string | undefined)[]): string {
  return classes.filter(Boolean).join(" ");
}

export default classNamesConverter;

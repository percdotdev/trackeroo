export type RawMessages = Record<
  string,
  {
    message: string;
    placeholders?: Record<string, { content: string }>;
  }
>;

const SUBSTITUTION_RE = /\$(\d+)/g;

export function applySubstitutions(
  template: string,
  substitutions?: string | string[]
): string {
  if (!substitutions) {
    return template;
  }

  const values = Array.isArray(substitutions) ? substitutions : [substitutions];
  return template.replace(SUBSTITUTION_RE, (_, token: string) => {
    const index = Number(token) - 1;
    return values[index] ?? `$${token}`;
  });
}

export function flattenMessages(raw: RawMessages): Record<string, string> {
  return Object.fromEntries(
    Object.entries(raw).map(([key, entry]) => [key, entry.message])
  );
}

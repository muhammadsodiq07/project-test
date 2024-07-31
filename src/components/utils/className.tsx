import { twMerge } from "tailwind-merge";

export function className(
  classMap: Record<string, boolean | undefined | null | string | number>
): string {
  return twMerge(
    Object.keys(classMap)
      .filter((key) => !!classMap[key])
      .join(" ")
  );
}

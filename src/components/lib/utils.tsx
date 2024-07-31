import * as React from "react";
import { className } from "../utils/className";

export function cn(...inputs: Array<string | undefined | false>) {
  const classNames = inputs.reduce<Record<string, boolean>>((acc, item) => {
    if (item) acc[item] = !!item;
    return acc;
  }, {});
  return className(classNames);
}

export function useMediaQuery(query: string) {
  const [value, setValue] = React.useState(false);

  React.useEffect(() => {
    function onChange(event: MediaQueryListEvent) {
      setValue(event.matches);
    }

    const result = matchMedia(query);
    result.addEventListener("change", onChange);
    setValue(result.matches);

    return () => result.removeEventListener("change", onChange);
  }, [query]);

  return value;
}

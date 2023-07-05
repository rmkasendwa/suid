import StyledEngineContext, {
  StyledEngineContextValue,
  defaultStyledEngineContextValue,
} from "./StyledEngineContext";
import { JSXElement } from "solid-js";

export default function StyledEngineProvider(
  inProps: {
    children: JSXElement;
    value?: StyledEngineContextValue;
  } & StyledEngineContextValue
) {
  const value = {
    get cache() {
      return inProps.value?.cache ?? inProps.cache;
    },
    get injectFirst() {
      return inProps.value?.injectFirst ?? inProps.injectFirst;
    },
    get cleanupStyles() {
      return (
        inProps.value?.cleanupStyles ??
        inProps.cleanupStyles ??
        defaultStyledEngineContextValue.cleanupStyles
      );
    },
  };
  return (
    <StyledEngineContext.Provider value={value}>
      {inProps.children}
    </StyledEngineContext.Provider>
  );
}

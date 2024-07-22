// React
import { useMemo } from "react";

// Types
import {ILoadingContext} from "@/types/common/index"


/**
 * Custom hook to determine if any provided context values have a loading state set to true.
 *
 * This hook accepts an array of context values, each of which must include a boolean `loading` property.
 * It checks all provided context values to ensure none are undefined and that each has a `loading` property.
 * The hook returns true if any of the context values has its `loading` property set to true, otherwise false.
 *
 * @template T - The type of the context value, which must extend ILoadingContext with a boolean `loading` property.
 * @param {T[]} contextValues - An array of context values to check for loading states.
 * @returns {boolean} - Returns true if any of the provided context values have their `loading` property set to true, otherwise false.
 *
 * @throws Will throw an error if any context value is undefined or does not include a valid `loading` property.
 *
 * @example
 * // Example usage in a component, assuming ContextA and ContextB are React contexts with loading states.
 * const ContextA = createContext({ loading: false, otherProp: 'value' });
 * const ContextB = createContext({ loading: true, otherProp: 'value' });
 *
 * const MyComponent = () => {
 *   const isLoading = useLoading([
 *     useContext(ContextA),
 *     useContext(ContextB)
 *   ]);
 *   
 *   return (
 *     <div>
 *       {isLoading ? "Loading..." : "Content"}
 *     </div>
 *   );
 * };
 */
const useLoading = <T extends ILoadingContext>(contextValues: T[]): boolean => {
    // Throw an error if any context is undefined right upfront
    if (contextValues.some(context => context === undefined)) {
      throw new Error('All contexts must be defined');
    }
  
    // Collect loading states from each context
    const loadingStates = contextValues.map(context => {

      if (typeof context?.loading !== 'boolean') {
        throw new Error('Context must have a loading boolean property');
      }
      return context.loading;
    });
  
    // Determine if any context is currently loading
    return useMemo(() => loadingStates.some(Boolean), [...loadingStates]);
  };
  
  export default useLoading;
  

import React, { FC, ReactNode, createContext, useReducer } from "react";

// Define the shape of the data structure for glucose data
export interface GlucoseData {
  entry_id: number;
  glucoseData: {
    timestamp: string;
    bg_value: number;
  };
}

// Define the shape of the context value
interface DataContextValue {
  data: GlucoseData[];
  dispatch: React.Dispatch<Action>;
}

// Define the shape of the action
type Action = { type: "ADD_DATA"; payload: GlucoseData[] };

// Define the shape of the props for DataContextProvider
interface DataContextProviderProps {
  children: ReactNode;
}

// Create the context
export const DataContext = createContext<DataContextValue>({
  data: [],
  dispatch: () => {} // Placeholder dispatch function
});

// Create the DataContextProvider component
export const DataContextProvider: FC<DataContextProviderProps> = ({
  children
}) => {
  // Define the initial state
  const INITIAL_STATE: GlucoseData[] = [];

  // Define the reducer function
  const dataReducer = (state: GlucoseData[], action: Action): GlucoseData[] => {
    switch (action.type) {
      case "ADD_DATA":
        const newData = action.payload.filter(
          (item) =>
            !state.some((existing) => existing.entry_id === item.entry_id)
        );
        return [...state, ...newData];
      default:
        return state;
    }
  };

  // Initialize the reducer with the initial state
  const [data, dispatch] = useReducer(dataReducer, INITIAL_STATE);

  // Return the context provider with the value
  return (
    <DataContext.Provider value={{ data, dispatch }}>
      {children}
    </DataContext.Provider>
  );
};

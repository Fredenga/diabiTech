import { FC, ReactNode, createContext, useReducer } from "react";

export let s = 9;
export interface PredData {
  ID: number;
  bg_value: number;
}
type Action = { type: "ADD_DATA"; payload: PredData[] };

interface predContextValue {
  predicted: {
    ID: number;
    bg_value: number;
  }[];
  dispatch: React.Dispatch<Action>;
}
export const PredContext = createContext<predContextValue>({
  predicted: [],
  dispatch: () => {}
});
interface PredContextProviderProps {
  children: ReactNode;
}

export const PredContextProvider: FC<PredContextProviderProps> = ({
  children
}) => {
  const INITIAL_STATE: PredData[] = [];

  // Define the reducer function
  const predReducer = (state: PredData[], action: Action): PredData[] => {
    switch (action.type) {
      case "ADD_DATA":
        const newData = action.payload.filter(
          (item) => !state.some((existing) => existing.ID === item.ID)
        );
        return [...state, ...newData];
      default:
        return state;
    }
  };
  const [predicted, dispatch] = useReducer(predReducer, INITIAL_STATE);

  return (
    <PredContext.Provider value={{ dispatch, predicted }}>
      {children}
    </PredContext.Provider>
  );
};

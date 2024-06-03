import { AppConfig } from "@interfaces/app-config.interface";
import { createContext } from "react";

export const defaultConfig: AppConfig = {
  showAddTodo: true,
  maxDescriptionLength: 20,
  onAdded: () => {},
  onStatusUpdated: () => {},
  onError: (err: Error, info?: string) => {
    if (info) {
      console.log('Error: ', info)
    }
    console.error(err)
  },
}

export const ConfigContext = createContext(defaultConfig);

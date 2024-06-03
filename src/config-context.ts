import { AppConfig } from "@interfaces/app-config.interface";
import { createContext } from "react";

export const defaultConfig: AppConfig = {
  showAddTodo: true,
  maxDescriptionLength: 20,
  onAdded: () => {},
  onStatusUpdated: () => {},
  onError: console.error,
}

export const ConfigContext = createContext(defaultConfig);

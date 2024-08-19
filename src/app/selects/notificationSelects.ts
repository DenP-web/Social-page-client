import { RootState } from "../store";

export const selectNotificationIsOpen = (state: RootState) => state.notification.isOpen
export const selectNotificationMessage = (state: RootState) => state.notification.message
export const selectNotificationType = (state: RootState) => state.notification.type
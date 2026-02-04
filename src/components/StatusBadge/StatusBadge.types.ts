export type StatusType = "pending" | "complete" | "error";
export interface StatusBadgeProps {
    status: StatusType,
    label?: string
}
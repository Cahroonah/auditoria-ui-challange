import React from "react"
import "./StatusBadge.css"
import { StatusBadgeProps, StatusType } from "./StatusBadge.types"

const STATUS_LABELS: Record<StatusType, string> = {
    pending: "PENDING",
    complete: "COMPLETE",
    error: "ERROR"
}
export const StatusBadge = ({ status, label }: StatusBadgeProps) => {
    const text = label ?? STATUS_LABELS[status];
    return (
        <span
            className={`status-badge status-${status}`}
            role="status"
            aria-label={`Status: ${text}`}>
            {text}
        </span>

    )
}

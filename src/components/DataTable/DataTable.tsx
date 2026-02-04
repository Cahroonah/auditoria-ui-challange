import  { useMemo, useState } from "react";
import "./DataTable.css";
import { DataTableProps, Column } from "./DataTable.types";
import { ReactComponent as ArrowUp } from "../../assets/icons/arrow-up.svg";
import { ReactComponent as ArrowDown } from "../../assets/icons/arrow-down.svg";
import { ReactComponent as ArrowUnsorted } from "../../assets/icons/arrow-unsorted.svg";

// Custom sort order for status column
const STATUS_ORDER = { pending: 0, complete: 1, error: 2 };

export const DataTable = <T extends Record<string, any>>({
    columns,
    rows,
    loading,
    onRowClick,
}: DataTableProps<T>) => {
    const [sortConfig, setSortConfig] = useState<{
        key: keyof T;
        ascending: boolean;
    } | null>(null);

    // Computing sorted rows
    const sortedRows = useMemo(() => {
        if (!sortConfig) return rows;

        const { key, ascending } = sortConfig;

        return [...rows].sort((a, b) => {
            // Separating comparison values
            let aComp: any = a[key];
            let bComp: any = b[key];

            // Applying custom status order if key is 'status'
            if (key === "status") {
                aComp = STATUS_ORDER[a[key] as keyof typeof STATUS_ORDER];
                bComp = STATUS_ORDER[b[key] as keyof typeof STATUS_ORDER];
            }

            if (aComp < bComp) return ascending ? -1 : 1;
            if (aComp > bComp) return ascending ? 1 : -1;
            return 0;
        });
    }, [rows, sortConfig]);

    // Handling column header click
    const handleSort = (key: keyof T, sortable?: boolean) => {
        if (!sortable) return;

        setSortConfig((prev) => {
            if (prev?.key === key) {
                return { key, ascending: !prev.ascending };
            }
            return { key, ascending: true };
        });
    };

    return (
        <table className="datatable">
            <thead>
                <tr>
                    {columns.map((col) => (
                        <th
                            key={String(col.key)}
                            className={col.sortable ? "sortable" : ""}
                            onClick={() => handleSort(col.key, col.sortable)}
                        >
                            {col.label}
                            {col.sortable && (
                                <span className="sort-icon">
                                    {sortConfig?.key === col.key ? (
                                        sortConfig.ascending ? (
                                            <ArrowUp className="arrow-icon" />
                                        ) : (
                                            <ArrowDown className="arrow-icon" />
                                        )
                                    ) : (
                                        <ArrowUnsorted className="arrow-icon" />
                                    )}
                                </span>
                            )}
                        </th>
                    ))}
                </tr>
            </thead>

            <tbody>
                {/* Loading state */}
                {loading && (
                    <tr>
                        <td colSpan={columns.length} className="datatable-loading">
                            Loading...
                        </td>
                    </tr>
                )}

                {/* Empty state */}
                {!loading && rows.length === 0 && (
                    <tr>
                        <td colSpan={columns.length} className="datatable-empty">
                            No data available
                        </td>
                    </tr>
                )}

                {/* Data rows */}
                {!loading &&
                    sortedRows.map((row, rowIndex) => (
                        <tr
                            key={rowIndex}
                            onClick={() => onRowClick?.(row)}
                            className={onRowClick ? "clickable" : ""}
                        >
                            {columns.map((col) => (
                                <td key={String(col.key)}>
                                    {col.render ? col.render(row) : String(row[col.key])}
                                </td>
                            ))}
                        </tr>
                    ))}
            </tbody>
        </table>
    );
};
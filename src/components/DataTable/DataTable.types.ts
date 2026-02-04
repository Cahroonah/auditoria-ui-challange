export interface Column<T> {
    key: keyof T;
    label: string;
    sortable?: boolean;
    render?: (row: T) => React.ReactNode;
    sortValue?: (row: T) => any;
}

export interface DataTableProps<T> {
    columns: Column<T>[];
    rows: T[];
    loading?: boolean;
    onRowClick?: (row: T) => void;
}
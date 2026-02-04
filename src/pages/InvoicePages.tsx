import React, { useEffect, useState } from "react";
import { StatusBadge } from "../components/StatusBadge/StatusBadge";
import { SearchInput } from "../components/SearchInput/SearchInput";
import { DataTable } from "../components/DataTable/DataTable";
import { Column } from "../components/DataTable/DataTable.types";

interface Invoice {
    id: number,
    vendor: string,
    amount: number,
    status: "pending" | "complete" | "error"
}

const mockData: Invoice[] = [
    { id: 1, vendor: "Tesla", amount: 1200, status: "pending" },
    { id: 2, vendor: "Auditoria", amount: 500, status: "complete" },
    { id: 3, vendor: "Google", amount: 800, status: "error" },
    { id: 4, vendor: "Apple", amount: 1500, status: "pending" },
    { id: 5, vendor: "Meta", amount: 2500, status: "complete" },
    { id: 6, vendor: "NVDIA", amount: 1800, status: "error" },
];
export const InvoicesPage: React.FC = () => {
    const [query, setQuery] = useState("");
    const [loading, setLoading] = useState(true);
    const filteredData = mockData.filter((inv) =>
        inv.vendor.toLowerCase().includes(query.toLowerCase()) ||
        inv.amount.toString().includes(query) ||
        inv.status.includes(query.toLowerCase())
    )

    const columns: Column<Invoice>[] = [
        { key: "vendor", label: "Vendor", sortable: true },
        { key: "amount", label: "Amount", sortable: true },
        {
            key: "status", label: "Status", sortable: true,
            render: (inv: Invoice) => <StatusBadge status={inv.status} />,
            sortValue: (inv: Invoice) => inv.status
        },
    ];
    
    //Simulating async data fetching to demonstrate loading state behavior
    useEffect(() => {
        setLoading(true);

        const timer = setTimeout(() => {
            setLoading(false);
        }, 800);

        return () => clearTimeout(timer);
    }, [query]);
    return (
        <div style={{ padding: 20 }}>
            <h1>Invoices</h1>
            <SearchInput value={query} onChange={setQuery} ></SearchInput>
            <DataTable columns={columns}
                rows={filteredData}
                loading={loading}
                onRowClick={(row) => {
                    console.log("Clicked row:", row);
                }}
            ></DataTable>
        </div>


    )
}   
export function sortArray<T>(arr: T[], key: keyof T, ascending: boolean = true): T[] {
    return [...arr].sort((a, b) => {
        if (a[key] > b[key]) return ascending ? 1 : -1;
        if (a[key] < b[key]) return ascending ? -1 : 1;
        return 0;
    });
}
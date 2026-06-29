import { useMemo, useState } from "react";

function SearchBar({ nodes, onSelect }) {
    const [query, setQuery] = useState("");
    const [isOpen, setIsOpen] = useState(false);

    const results = useMemo(() => {
        const searchText = query.trim().toLowerCase();

        if (!searchText) return [];

        return nodes
            .filter((node) => {
                const label = node.data?.label?.toLowerCase() || "";
                const path = node.data?.path?.toLowerCase() || "";

                return label.includes(searchText) || path.includes(searchText);
            })
            .slice(0, 8);
    }, [nodes, query]);

    const handleSelect = (node) => {
        setQuery(node.data?.label || "");
        setIsOpen(false);
        onSelect(node);
    };

    return (
        <div className="relative w-full max-w-md">
            <input
                type="search"
                value={query}
                onChange={(event) => {
                    setQuery(event.target.value);
                    setIsOpen(true);
                }}
                placeholder="Search files..."
                className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-2 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-500"
            />

            {isOpen && query.trim() && (
                <div className="absolute left-0 right-0 top-12 z-20 overflow-hidden rounded-lg border border-slate-800 bg-slate-900 shadow-xl">
                    {results.length ? (
                        results.map((node) => (
                            <button
                                key={node.id}
                                type="button"
                                onClick={() => handleSelect(node)}
                                className="block w-full border-b border-slate-800 px-4 py-3 text-left text-sm transition last:border-b-0 hover:bg-slate-800"
                            >
                                <div className="font-medium text-white">
                                    {node.data?.label}
                                </div>

                                <div className="mt-1 truncate text-xs text-slate-400">
                                    {node.data?.path}
                                </div>
                            </button>
                        ))
                    ) : (
                        <div className="px-4 py-3 text-sm text-slate-400">
                            No matching files
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export default SearchBar;

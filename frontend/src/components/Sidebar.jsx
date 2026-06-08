function Sidebar({ file, summary, onClose, onGenerateSummary }) {
    if (!file) return null;

    const getComplexityColor = (complexity) => {
        if (complexity > 25) return "text-red-400";

        if (complexity > 10) return "text-yellow-400";

        return "text-green-400";
    };

    return (
        <div className="h-full w-105 overflow-y-auto border-l border-slate-800 bg-slate-900 text-white">
            {/* Header */}
            <div className="sticky top-0 z-10 border-b border-slate-800 bg-slate-900 p-5">
                <div className="flex items-start justify-between">
                    <div>
                        <h2 className="text-xl font-bold break-all">{file.label}</h2>

                        <p className="mt-1 text-xs text-slate-400">File Details</p>
                    </div>

                    <button
                        onClick={onClose}
                        className="rounded-lg border border-slate-700 px-3 py-1 text-sm transition hover:bg-slate-800"
                    >
                        Close
                    </button>
                </div>
            </div>

            <div className="space-y-6 p-5">
                {/* Path */}
                <div>
                    <h3 className="mb-2 text-sm font-semibold uppercase tracking-wide text-cyan-400">
                        Path
                    </h3>

                    <div className="rounded-lg bg-slate-950 p-3 text-xs break-all text-slate-300">
                        {file.path}
                    </div>
                </div>

                {/* Metrics */}
                <div>
                    <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-cyan-400">
                        Metrics
                    </h3>

                    <div className="grid grid-cols-2 gap-3">
                        <div className="rounded-lg bg-slate-950 p-3">
                            <div className="text-xs text-slate-400">LOC</div>

                            <div className="mt-1 text-xl font-bold">{file.loc}</div>
                        </div>

                        <div className="rounded-lg bg-slate-950 p-3">
                            <div className="text-xs text-slate-400">Functions</div>

                            <div className="mt-1 text-xl font-bold">{file.functions}</div>
                        </div>

                        <div className="rounded-lg bg-slate-950 p-3">
                            <div className="text-xs text-slate-400">Imports</div>

                            <div className="mt-1 text-xl font-bold">{file.imports}</div>
                        </div>

                        <div className="rounded-lg bg-slate-950 p-3">
                            <div className="text-xs text-slate-400">Size</div>

                            <div className="mt-1 text-xl font-bold">
                                {(file.size / 1024).toFixed(1)}
                                KB
                            </div>
                        </div>
                    </div>
                </div>

                {/* Complexity */}
                <div>
                    <h3 className="mb-2 text-sm font-semibold uppercase tracking-wide text-cyan-400">
                        Complexity
                    </h3>

                    <div className="rounded-lg bg-slate-950 p-4">
                        <div
                            className={`text-3xl font-bold ${getComplexityColor(
                                file.complexity,
                            )}`}
                        >
                            {file.complexity}
                        </div>

                        <p className="mt-2 text-sm text-slate-400">
                            {file.complexity > 25
                                ? "High complexity. Consider refactoring."
                                : file.complexity > 10
                                    ? "Moderate complexity."
                                    : "Low complexity."}
                        </p>
                    </div>
                </div>

                {/* AI Summary */}
                <div>
                    <div className="mb-3 flex items-center justify-between">
                        <h3 className="text-sm font-semibold uppercase tracking-wide text-cyan-400">
                            AI Summary
                        </h3>

                        <button
                            onClick={onGenerateSummary}
                            className="
                rounded-lg
                bg-cyan-500
                px-3
                py-1.5
                text-xs
                font-medium
                text-black
                transition
                hover:bg-cyan-400
            "
                        >
                            Generate
                        </button>
                    </div>

                    <div className="rounded-lg bg-slate-950 p-4">
                        {summary ? (
                            <p className="text-sm leading-7 text-slate-300">
                                {summary}
                            </p>
                        ) : (
                            <p className="text-sm text-slate-500">
                                Click Generate to create an AI explanation for this file.
                            </p>
                        )}
                    </div>
                </div>

                {/* Code Preview */}
                {file.preview && (
                    <div>
                        <h3 className="mb-2 text-sm font-semibold uppercase tracking-wide text-cyan-400">
                            Source Preview
                        </h3>

                        <div className="overflow-auto rounded-lg border border-slate-800 bg-black p-4">
                            <pre className="text-xs leading-6 text-slate-300">
                                {file.preview}
                            </pre>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Sidebar;

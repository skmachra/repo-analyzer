import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
    const [repoPath, setRepoPath] = useState("");
    const navigate = useNavigate();

    const handleAnalyze = () => {
        if (!repoPath.trim()) {
            alert("Please enter a repository path");
            return;
        }

        navigate(`/graph?path=${encodeURIComponent(repoPath)}`);
    };
    const handlePathChange = (e) => {
        const cleanedPath = e.target.value.replaceAll('"', "");

        setRepoPath(cleanedPath);
    };

    return (
        <div className="min-h-screen bg-slate-950 text-white">
            <div className="mx-auto max-w-7xl px-6 py-12">
                {/* Hero */}
                <div className="text-center">
                    <h1 className="text-5xl font-bold">
                        Repository Structure
                        <span className="text-cyan-400"> Analyzer</span>
                    </h1>

                    <p className="mx-auto mt-4 max-w-3xl text-lg text-slate-400">
                        Visualize repository architecture, dependency relationships, code
                        metrics, and AI-powered file explanations.
                    </p>
                </div>

                {/* Analyze Card */}
                <div className="mx-auto mt-12 max-w-4xl rounded-2xl border border-slate-800 bg-slate-900 p-8 shadow-xl">
                    <h2 className="mb-6 text-2xl font-semibold">Analyze Repository</h2>

                    <div className="flex flex-col gap-4 md:flex-row">
                        <input
                            type="text"
                            value={repoPath}
                            onChange={handlePathChange}
                            placeholder="C:/Projects/MyRepository"
                            className="flex-1 rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 outline-none transition focus:border-cyan-500"
                        />

                        <button
                            onClick={handleAnalyze}
                            className="
                                rounded-lg
                                bg-cyan-500
                                px-8
                                py-3
                                font-medium
                                text-black
                                transition
                                hover:bg-cyan-400
                            "
                        >
                            Analyze
                        </button>
                    </div>

                    <p className="mt-3 text-sm text-slate-500">
                        Enter the full path of a local repository to generate dependency
                        graphs, metrics, and AI summaries.
                    </p>
                </div>

                {/* Features */}
                <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                    <div className="rounded-xl border border-slate-800 bg-slate-900 p-6">
                        <h3 className="text-lg font-semibold text-cyan-400">
                            Dependency Graph
                        </h3>

                        <p className="mt-2 text-sm text-slate-400">
                            Visualize relationships between files and modules using React
                            Flow.
                        </p>
                    </div>

                    <div className="rounded-xl border border-slate-800 bg-slate-900 p-6">
                        <h3 className="text-lg font-semibold text-cyan-400">
                            AI Summaries
                        </h3>

                        <p className="mt-2 text-sm text-slate-400">
                            Generate plain-English explanations for unfamiliar files using
                            Gemini AI.
                        </p>
                    </div>

                    <div className="rounded-xl border border-slate-800 bg-slate-900 p-6">
                        <h3 className="text-lg font-semibold text-cyan-400">
                            Code Metrics
                        </h3>

                        <p className="mt-2 text-sm text-slate-400">
                            Track LOC, imports, functions, complexity and file size.
                        </p>
                    </div>

                    <div className="rounded-xl border border-slate-800 bg-slate-900 p-6">
                        <h3 className="text-lg font-semibold text-cyan-400">
                            Smart Caching
                        </h3>

                        <p className="mt-2 text-sm text-slate-400">
                            Avoid repeated AI requests using content-based hashing.
                        </p>
                    </div>
                </div>

                {/* Workflow */}
                <div className="mt-16 rounded-2xl border border-slate-800 bg-slate-900 p-8">
                    <h2 className="text-2xl font-semibold">How It Works</h2>

                    <div className="mt-8 grid gap-8 md:grid-cols-4">
                        <div>
                            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-cyan-500 font-bold text-black">
                                1
                            </div>

                            <h3 className="font-medium">Select Repository</h3>

                            <p className="mt-2 text-sm text-slate-400">
                                Enter the path of the repository you want to analyze.
                            </p>
                        </div>

                        <div>
                            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-cyan-500 font-bold text-black">
                                2
                            </div>

                            <h3 className="font-medium">Build Graph</h3>

                            <p className="mt-2 text-sm text-slate-400">
                                Parse imports and construct a dependency graph.
                            </p>
                        </div>

                        <div>
                            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-cyan-500 font-bold text-black">
                                3
                            </div>

                            <h3 className="font-medium">Analyze Metrics</h3>

                            <p className="mt-2 text-sm text-slate-400">
                                Calculate LOC, complexity, imports and file size.
                            </p>
                        </div>

                        <div>
                            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-cyan-500 font-bold text-black">
                                4
                            </div>

                            <h3 className="font-medium">Explore</h3>

                            <p className="mt-2 text-sm text-slate-400">
                                Click nodes to view file details and AI-generated explanations.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

import { useEffect, useState, useCallback } from "react";
import { useSearchParams, Link } from "react-router-dom";

import ReactFlow, {
    Background,
    Controls,
    MiniMap,
    useNodesState,
    useEdgesState,
    useReactFlow,
} from "reactflow";

import "reactflow/dist/style.css";

import Sidebar from "./Sidebar";
import api from "../services/api";
import { getLayoutedElements } from "../utils/layoutGraph";

function GraphView() {
    const [searchParams] = useSearchParams();

    const repoPath = searchParams.get("path");

    const repoName = repoPath?.split(/[\\/]/).pop() || "Repository";

    const [nodes, setNodes, onNodesChange] = useNodesState([]);

    const [edges, setEdges, onEdgesChange] = useEdgesState([]);

    const [selectedFile, setSelectedFile] = useState(null);

    const [summary, setSummary] = useState("");

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");

    const fetchGraph = useCallback(async () => {
        if (!repoPath) return;

        try {
            setLoading(true);
            setError("");

            const res = await api.post("/graph", {
                repo_path: repoPath,
            });

            const graphNodes = res.data.nodes.map((node) => {
                let bg = "#1e293b";

                if (node.data.complexity > 25) {
                    bg = "#7f1d1d";
                } else if (node.data.complexity > 10) {
                    bg = "#78350f";
                }

                return {
                    id: node.id,

                    data: {
                        ...node.data,
                        label: node.data.label,
                    },

                    style: {
                        background: bg,
                        color: "#fff",
                        border: "1px solid #475569",
                        borderRadius: "10px",
                        padding: "10px",
                        width: 200,
                        fontSize: 12,
                    },

                    position: {
                        x: 0,
                        y: 0,
                    },
                };
            });

            const graphEdges = res.data.edges.map((edge, index) => ({
                id: `${edge.source}-${edge.target}-${index}`,
                source: edge.source,
                target: edge.target,
            }));

            const layouted = getLayoutedElements(graphNodes, graphEdges);

            setNodes(layouted.nodes);
            setEdges(layouted.edges);
        } catch (err) {
            console.error(err);
            setError("Failed to analyze repository.");
        } finally {
            setLoading(false);
        }
    }, [repoPath, setNodes, setEdges]);

    useEffect(() => {
        fetchGraph();
    }, [fetchGraph]);

    const handleNodeClick = async (event, node) => {
        try {
            const fileRes = await api.post("/file", {
                repo_path: repoPath,
                file_path: node.data.path,
            });

            setSelectedFile({
                ...node.data,
                preview: fileRes.data.preview,
            });
        } catch (err) {
            console.error(err);
        }
    };
    const handleGenerateSummary = async () => {
        if (!selectedFile) return;

        try {
            setSummary("Generating summary...");

            const summaryRes = await api.post("/summarize", {
                repo_path: repoPath,
                file_path: selectedFile.path,
            });

            setSummary(summaryRes.data.summary);
        } catch (err) {
            console.error(err);

            setSummary("Failed to generate summary.");
        }
    };
    const closeSidebar = () => {
        setSelectedFile(null);
        setSummary("");
    };

    return (
        <div className="h-screen bg-slate-950 text-white">
            {/* Top Bar */}
            <div className="flex h-16 items-center justify-between border-b border-slate-800 bg-slate-900 px-6">
                <div>
                    <h1 className="text-xl font-bold">{repoName}</h1>

                    <p className="text-sm text-slate-400">Repository Analysis</p>
                </div>

                <div className="flex gap-3">
                    <button
                        onClick={fetchGraph}
                        className="rounded-lg bg-cyan-500 px-4 py-2 font-medium text-black transition hover:bg-cyan-400"
                    >
                        Refresh
                    </button>

                    <Link
                        to="/"
                        className="rounded-lg border border-slate-700 px-4 py-2 text-sm hover:bg-slate-800"
                    >
                        Change Repo
                    </Link>
                </div>
            </div>

            {/* Content */}
            <div className="flex h-[calc(100vh-64px)]">
                {/* Graph */}
                <div className="flex-1">
                    {loading ? (
                        <div className="flex h-full items-center justify-center">
                            <div className="text-lg text-slate-400">
                                Analyzing Repository...
                            </div>
                        </div>
                    ) : error ? (
                        <div className="flex h-full items-center justify-center">
                            <div className="text-red-400">{error}</div>
                        </div>
                    ) : (
                        <ReactFlow
                            nodes={nodes}
                            edges={edges}
                            onNodesChange={onNodesChange}
                            onEdgesChange={onEdgesChange}
                            onNodeClick={handleNodeClick}
                            fitView
                            minZoom={0.5}
                        >
                            <MiniMap
                                pannable
                                zoomable
                                nodeColor={(node) => {
                                    if (node.data?.complexity > 25) return "#dc2626";

                                    if (node.data?.complexity > 10) return "#eab308";

                                    return "#22c55e";
                                }}
                                maskColor="rgba(2,6,23,0.8)"
                                style={{
                                    background: "#e6e6ff",
                                    border: "2px solid #475569",
                                    borderRadius: "10px",
                                }}
                            />

                            <Controls />

                            <Background />
                        </ReactFlow>
                    )}
                </div>

                {/* Sidebar */}
                <Sidebar
                    file={selectedFile}
                    summary={summary}
                    onClose={closeSidebar}
                    onGenerateSummary={handleGenerateSummary}
                />
            </div>
        </div>
    );
}

export default GraphView;

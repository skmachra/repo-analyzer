import { useEffect, useState } from "react";
import ReactFlow, {
    Background,
    Controls,
    MiniMap,
    useNodesState,
    useEdgesState,
} from "reactflow";
import { getLayoutedElements } from "../utils/layoutGraph";
import "reactflow/dist/style.css";

import Sidebar from "./Sidebar";
import api from "../services/api";

function GraphView() {
    const [nodes, setNodes, onNodesChange] = useNodesState([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);

    const [selectedFile, setSelectedFile] = useState(null);
    const [summary, setSummary] = useState("");

    useEffect(() => {
        fetchGraph();
    }, []);

    const fetchGraph = async () => {
        try {
            const res = await api.post("/graph", {
                repo_path: "C:/Users/admin/Desktop/repo-analyzer/backend",
            });

            const graphNodes = res.data.nodes.map((node) => ({
                id: node.id,
                data: node.data,
                position: {
                    x: 0,
                    y: 0,
                },
            }));

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
        }
    };

    const handleNodeClick = async (event, node) => {
        try {
            const res = await api.post("/file", {
                repo_path: "C:/Users/admin/Desktop/repo-analyzer/backend",
                file_path: node.data.path,
            });

            setSelectedFile({
                ...node.data,
                preview: res.data.preview,
            });

            setSummary("Loading...");

            // const summaryRes = await api.post("/summarize", {
            //     repo_path: "C:/Users/admin/Desktop/repo-analyzer/backend",
            //     file_path: node.data.path,
            // });

            // setSummary(summaryRes.data.summary);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div
            style={{
                display: "flex",
                width: "100%",
                height: "100vh",
            }}
        >
            <div
                style={{
                    flex: 1,
                }}
            >
                <ReactFlow
                    nodes={nodes}
                    edges={edges}
                    onNodesChange={onNodesChange}
                    onEdgesChange={onEdgesChange}
                    onNodeClick={handleNodeClick}
                    fitView
                >
                    <MiniMap />
                    <Controls />
                    <Background />
                </ReactFlow>
            </div>

            <Sidebar
                file={selectedFile}
                summary={summary}
                onClose={() => setSelectedFile(null)}
            />
        </div>
    );
}

export default GraphView;

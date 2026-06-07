import { useEffect, useState } from "react";
import ReactFlow, { Background, Controls, MiniMap } from "reactflow";

import "reactflow/dist/style.css";
import Sidebar from "./Sidebar";
import api from "../services/api";

function GraphView() {
    const [nodes, setNodes] = useState([]);
    const [edges, setEdges] = useState([]);
    const [selectedFile, setSelectedFile] = useState(null);
    useEffect(() => {
        fetchGraph();
    }, []);

    const fetchGraph = async () => {
        try {
            const res = await api.post("/graph", {
                repo_path: "C:\\Users\\admin\\Desktop\\P2P Web Share",
            });

            const graphNodes = res.data.nodes.map((node, index) => ({
                id: node.id,
                data: node.data,
                position: {
                    x: (index % 5) * 250,
                    y: Math.floor(index / 5) * 150,
                },
            }));

            const graphEdges = res.data.edges.map((edge, index) => ({
                id: `${edge.source}-${edge.target}-${index}`,
                source: edge.source,
                target: edge.target,
            }));

            setNodes(graphNodes);
            setEdges(graphEdges);
        } catch (err) {
            console.log(err);
        }
    };
    const handleNodeClick = async (event, node) => {
        try {
            const res = await api.post("/file", {
                repo_path: "C:\\Users\\admin\\Desktop\\P2P Web Share",
                file_path: node.data.path,
            });

            setSelectedFile({
                ...node.data,
                preview: res.data.preview,
            });
        } catch (err) {
            console.log(err);
        }
    };
    return (
        <div
            style={{
                display: "flex",
                width: "100%",
                height: "100vh"
            }}
        >
            <div
                style={{
                    flex: 1
                }}
            >
                <ReactFlow
                    nodes={nodes}
                    edges={edges}
                    fitView
                    onNodeClick={
                        handleNodeClick
                    }
                >
                    <MiniMap />
                    <Controls />
                    <Background />
                </ReactFlow>
            </div>

            <Sidebar
                file={selectedFile}
                onClose={() =>
                    setSelectedFile(null)
                }
            />
        </div>
    );
}

export default GraphView;

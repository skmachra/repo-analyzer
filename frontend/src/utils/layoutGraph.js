import dagre from "dagre";

const nodeWidth = 180;
const nodeHeight = 60;

export function getLayoutedElements(nodes, edges) {
    const connectedIds = new Set();

    edges.forEach((edge) => {
        connectedIds.add(edge.source);
        connectedIds.add(edge.target);
    });

    const connectedNodes = nodes.filter((node) =>
        connectedIds.has(node.id)
    );

    const isolatedNodes = nodes.filter(
        (node) => !connectedIds.has(node.id)
    );

    const dagreGraph = new dagre.graphlib.Graph();

    dagreGraph.setDefaultEdgeLabel(() => ({}));

    dagreGraph.setGraph({
        rankdir: "TB",
        ranksep: 80,
        nodesep: 80,
    });

    connectedNodes.forEach((node) => {
        dagreGraph.setNode(node.id, {
            width: nodeWidth,
            height: nodeHeight,
        });
    });

    edges.forEach((edge) => {
        if (
            connectedIds.has(edge.source) &&
            connectedIds.has(edge.target)
        ) {
            dagreGraph.setEdge(
                edge.source,
                edge.target
            );
        }
    });

    dagre.layout(dagreGraph);

    const layoutedNodes = [];

    let maxY = 0;

    connectedNodes.forEach((node) => {
        const pos = dagreGraph.node(node.id);

        if (pos) {
            maxY = Math.max(maxY, pos.y);

            layoutedNodes.push({
                ...node,
                position: {
                    x:
                        pos.x -
                        nodeWidth / 2,
                    y:
                        pos.y -
                        nodeHeight / 2,
                },
            });
        }
    });

    const startY = maxY + 250;

    isolatedNodes.forEach(
        (node, index) => {
            layoutedNodes.push({
                ...node,
                position: {
                    x:
                        (index % 8) *
                        220,
                    y:
                        startY +
                        Math.floor(
                            index / 8
                        ) *
                            120,
                },
            });
        }
    );

    return {
        nodes: layoutedNodes,
        edges,
    };
}
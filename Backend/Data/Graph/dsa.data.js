

const dsaData = {
    Section: "Graph",
    content: [
        {
            Subsection: "Basic",
            content: [
                {
                    Topic: "Lec1",
                    content: [
                        {
                            heading: "Introduction to Graphs",
                            content: [
                                {
                                    subheading: "What is a Graph?",
                                    para: "A graph is a non-linear data structure consisting of nodes that have data and are connected to other nodes through edges."
                                },
                                {
                                    subheading: "What are Graph data Structures?",
                                    para: "There are two types of data structures:\n1) Linear\n2) Non-linear\n\nWe are aware of linear data structures such as arrays, stacks, queues, and linked lists. They are called linear because data elements are arranged in a linear or sequential manner.\n\nThe only non-linear data structure that we’ve seen so far is Tree. In fact, a tree is a special type of graph with some restrictions. Graphs are data structures that have a wide-ranging application in real life. These include analysis of electrical circuits, finding the shortest routes between two places, building navigation systems like Google Maps, even social media using graphs to store data about each user, etc. To understand and use the graph data structure, let’s get familiar with the definitions and terms associated with graphs."
                                },
                                {
                                    subheading: "Definitions and Terminology",
                                    para: "A graph is a non-linear data structure consisting of nodes that have data and are connected to other nodes through edges.",
                                    image: "/static/Graph1.png"
                                },
                                {
                                    subheading: "Node",
                                    para: "Nodes are circles represented by numbers. Nodes are also referred to as vertices. They store the data. The numbering of the nodes can be done in any order, no specific order needs to be followed.\n\nIn the following example, the number of nodes or vertices = 5",
                                    image: "/static/Graph2.png"
                                },
                                {
                                    subheading: "Edge",
                                    para: "Two nodes are connected by a horizontal line called Edge. Edge can be directed or undirected. Basically, pairs of vertices are called edges.\n\nIn the above example, the edge can go from 1 to 4 or from 4 to 1, i.e. a bidirectional edge can be in both directions, hence called an undirected edge. Thus, the pairs (1,4) and (4,1) represent the same edge.",
                                    image: "/static/Graph2.png"
                                },
                                {
                                    subheading: "Types of Graphs",
                                    image: "/static/Graph3.png"
                                },
                                {
                                    subheading: "Undirected Graph",
                                    para: "An undirected graph is a graph where edges are bidirectional, with no direction associated with them, i.e, there will be an undirected edge. In an undirected graph, the pair of vertices representing any edge is unordered. Thus, the pairs (u, v) and (v, u) represent the same edge."
                                },
                                {
                                    subheading: "Directed Graph",
                                    para: "A directed graph is a graph where all the edges are directed from one vertex to another, i.e, there will be a directed edge. It contains an ordered pair of vertices. It implies each edge is represented by a directed pair <u, v>. Therefore, <u, v> and <v, u> represent two different edges."
                                },
                                {
                                    para: "There can be multi-directed edges, hence bidirectional edges, as shown in the example below.",
                                    image: "/static/Graph4.png"
                                }
                            ]
                        },
                        {
                            heading: "Structure of a Graph",
                            content: [
                                {
                                    para: "Does every graph have a cycle?\n\nThe answer is No! Let us consider the following examples to understand this.",
                                    image: "/static/Graph5.png"
                                },
                                {
                                    para: "Fig.1 does not form a cycle but still, it is a graph."
                                },
                                {
                                    para: "Fig.2 is an example of a binary tree. It can also be called a graph because it follows all the rules. We’ve nodes and edges, and this is the minimal condition to be called a graph."
                                },
                                {
                                    para: "So a graph does not necessarily mean to be an enclosed structure, it can be an open structure as well. A graph is said to have a cycle if it starts from a node and ends at the same node. There can be multiple cycles in a graph.",
                                    image: "/static/Graph6.png"
                                },
                                {
                                    para: "If there is at least one cycle present in the graph then it is called an Undirected Cyclic Graph.\n\nIn the following examples of directed graphs, the first directed graph is not cyclic as we can’t start from a node and end at the same node. Hence it is called Directed Acyclic Graph, commonly called DAG.",
                                    image: "/static/Graph7.png"
                                },
                                {
                                    para: "If we just add an edge to the directed graph, then at least one cycle is present in the graph, hence it becomes Directed Cyclic Graph."
                                },
                                {
                                    subheading: "Path in a Graph",
                                    image: "/static/Graph8.png"
                                },
                                {
                                    para: "The path contains a lot of nodes and each of them is reachable.\n\nConsider the given graph,",
                                    image: "/static/Graph9.png"
                                },
                                {
                                    para: "1 2 3 5 is a path.\n\n1 2 3 2 1 is not a path, because a node can’t appear twice in a path.\n\n1 3 5 is not a path, as adjacent nodes must have an edge and there is no edge between 1 and 3."
                                }
                            ]
                        },
                        {
                            heading: "Types of Graphs based on Degree",
                            content: [
                                {
                                    subheading: "Degree of Graph",
                                    para: "It is the number of edges that go inside or outside that node.\n\nFor undirected graphs, the degree is the number of edges attached to a node.\n\nExample,\nD(3) = 3\nD(4) = 2",
                                    image: "/static/Graph10.png"
                                },
                                {
                                    para: "It states that the total degree of a graph is equal to twice the number of edges. This is because every edge is associated/ connected to two nodes.",
                                    image: "/static/Graph11.png"
                                },
                                {
                                    para: "Total Degree of a graph = 2 x E\n\nExample, (2+2+3+2+3) = 2 x 6 => 12 = 12",
                                    image: "/static/Graph12.png"
                                },
                                {
                                    para: "For directed graphs, we’ve Indegree and Outdegree. The indegree of a node is the number of incoming edges. The outdegree of a node is the number of outgoing edges."
                                },
                                {
                                    subheading: "Edge Weight",
                                    para: "A graph may have weights assigned on its edges. It is often referred to as the cost of the edge.",
                                    image: "/static/Graph13.png"
                                },
                                {
                                    para: "If weights are not assigned then we assume the unit weight, i.e, 1. In applications, weight may be a measure of the cost of a route. For example, if vertices A and B represent towns in a road network, then weight on edge AB may represent the cost of moving from A to B, or vice versa."
                                }
                            ]
                        }
                    ],
                    video: "https://youtu.be/M3_pLsDdeuU?list=PLgUwDviBIf0oE3gA41TKO2H5bHpPd7fzn",
                    code: `import java.util.*;

class Graph {
    private int vertices;
    private LinkedList<Integer>[] adjacencyList;

    public Graph(int vertices) {
        this.vertices = vertices;
        adjacencyList = new LinkedList[vertices];
        for (int i = 0; i < vertices; i++) {
            adjacencyList[i] = new LinkedList<>();
        }
    }

    public void addEdge(int source, int destination) {
        adjacencyList[source].add(destination);
        adjacencyList[destination].add(source); // For undirected graph
    }

    public void printGraph() {
        for (int i = 0; i < vertices; i++) {
            System.out.print("Vertex " + i + ":");
            for (Integer neighbor : adjacencyList[i]) {
                System.out.print(" -> " + neighbor);
            }
            System.out.println();
        }
    }

    public static void main(String[] args) {
        Graph graph = new Graph(5);

        graph.addEdge(0, 1);
        graph.addEdge(0, 4);
        graph.addEdge(1, 2);
        graph.addEdge(1, 3);
        graph.addEdge(1, 4);
        graph.addEdge(2, 3);
        graph.addEdge(3, 4);

        graph.printGraph();
    }
}`,
                    AdditionalResources: [
                        {
                            leetcode: "https://leetcode.com/explore/learn/card/graph/",
                            gfg: "https://www.geeksforgeeks.org/graph-data-structure-and-algorithms/",
                            VisuAlgo: "https://visualgo.net/en/graphds",
                            youtubePlaylist: "https://www.youtube.com/playlist?list=PLgUwDviBIf0oE3gA41TKO2H5bHpPd7fzn",
                        },
                    ]
                },
                {
                    Topic: "Graph Representation in Java",
                    content: [
                        {
                            heading: "Graph Representation in Java",
                            content: [
                                {
                                    subheading: "Representations of Graph",
                                    para: "Here are the two most common ways to represent a graph : For simplicity, we are going to consider only unweighted graphs in this post. \n\n Adjacency Matrix \n Adjacency List"
                                },
                                {
                                    subheading: "Adjacency Matrix Representation",
                                    para: "An adjacency matrix is a way of representing a graph as a matrix of boolean (0's and 1's) \n\n Let's assume there are n vertices in the graph So, create a 2D matrix adjMat[n][n] having dimension n x n. \n\n If there is an edge from vertex i to j, mark adjMat[i][j] as 1.  \n If there is no edge from vertex i to j, mark adjMat[i][j] as 0."
                                },
                                {
                                    subheading: "Representation of Undirected Graph as Adjacency Matrix:",
                                    para: "The below figure shows an undirected graph. Initially, the entire Matrix is ​initialized to 0. If there is an edge from source to destination, we insert 1 to both cases (adjMat[source][destination] and adjMat[destination][source]) because we can go either way.",
                                    image: "/static/Graph14.png"
                                },
                                {
                                    subheading: "Representation of Directed Graph as Adjacency Matrix:",
                                    para: "The below figure shows a directed graph. Initially, the entire Matrix is ​​initialized to 0. If there is an edge from source to destination, we insert 1 for that particular adjMat[source][destination].",
                                    image: "/static/Graph15.png"
                                },
                            ]
                        },
                        {
                            heading: "Adjacency List Representation",
                            content: [
                                {
                                    para: "An array of Lists is used to store edges between two vertices. The size of array is equal to the number of vertices (i.e, n). Each index in this array represents a specific vertex in the graph. The entry at the index i of the array contains a linked list containing the vertices that are adjacent to vertex i. Let's assume there are n vertices in the graph So, create an array of list of size n as adjList[n]. \n\n adjList[0] will have all the nodes which are connected (neighbour) to vertex 0.\n adjList[1] will have all the nodes which are connected (neighbour) to vertex 1 and so on.",
                                },
                                {
                                    subheading: "Representation of Undirected Graph as Adjacency List:",
                                    para: "The below undirected graph has 3 vertices. So, an array of list will be created of size 3, where each indices represent the vertices. Now, vertex 0 has two neighbours (i.e, 1 and 2). So, insert vertex 1 and 2 at indices 0 of array. Similarly, For vertex 1, it has two neighbour (i.e, 2 and 0) So, insert vertices 2 and 0 at indices 1 of array. Similarly, for vertex 2, insert its neighbours in array of list.",
                                    image: "/static/Graph16.png"
                                },
                                {
                                    subheading: "Representation of Directed Graph as Adjacency List:",
                                    para: "The below directed graph has 3 vertices. So, an array of list will be created of size 3, where each indices represent the vertices. Now, vertex 0 has no neighbours. For vertex 1, it has two neighbour (i.e, 0 and 2) So, insert vertices 0 and 2 at indices 1 of array. Similarly, for vertex 2, insert its neighbours in array of list.",
                                    image: "/static/Graph17.png"
                                },
                            ]
                        },
                    ],
                    video: "https://youtu.be/OsNklbh9gYI?list=PLgUwDviBIf0oE3gA41TKO2H5bHpPd7fzn",
                    code: `#Adjacency Matrix Representation
    
                    
import java.util.Arrays;
public class GfG {

    public static void addEdge(int[][] mat, int i, int j) {
        mat[i][j] = 1;
        mat[j][i] = 1; // Since the graph is undirected
    }

    public static void displayMatrix(int[][] mat) {
        for (int[] row : mat) {
            for (int val : row) {
                System.out.print(val + " ");
            }
            System.out.println();
        }
    }

    public static void main(String[] args) {

        // Create a graph with 4 vertices and no edges
        // Note that all values are initialized as 0
        int V = 4;
        int[][] mat = new int[V][V];

        // Now add edges one by one
        addEdge(mat, 0, 1);
        addEdge(mat, 0, 2);
        addEdge(mat, 1, 2);
        addEdge(mat, 2, 3);

        /* Alternatively we can also create using below
           code if we know all edges in advance

         int[][] mat = {{ 0, 1, 0, 0 },
                        { 1, 0, 1, 0 },
                        { 0, 1, 0, 1 },
                        { 0, 0, 1, 0 } }; */

        System.out.println("Adjacency Matrix Representation");
        displayMatrix(mat);
    }
}

Output
    Adjacency Matrix Representation
    0 1 1 0 
    1 0 1 0 
    1 1 0 1 
    0 0 1 0 



#Adjacency List Representation


import java.util.ArrayList;
import java.util.List;

public class GfG {
    
    // Method to add an edge between two vertices
    public static void addEdge(List<List<Integer>> adj, int i, int j) {
        adj.get(i).add(j);
        adj.get(j).add(i); // Undirected
    }

    // Method to display the adjacency list
    public static void displayAdjList(List<List<Integer>> adj) {
        for (int i = 0; i < adj.size(); i++) {
            System.out.print(i + ": "); // Print the vertex
            for (int j : adj.get(i)) {
                System.out.print(j + " "); // Print its adjacent 
            }
            System.out.println(); 
        }
    }

    // Main method
    public static void main(String[] args) {
      
        // Create a graph with 4 vertices and no edges
        int V = 4;
        List<List<Integer>> adj = new ArrayList<>(V); 
        for (int i = 0; i < V; i++) {
            adj.add(new ArrayList<>());
        }

        // Now add edges one by one
        addEdge(adj, 0, 1);
        addEdge(adj, 0, 2);
        addEdge(adj, 1, 2);
        addEdge(adj, 2, 3);

        System.out.println("Adjacency List Representation:");
        displayAdjList(adj);
    }
}



Output
    Adjacency List Representation:
    0: 1 2 
    1: 0 2 
    2: 0 1 3 
    3: 2 
`,
                    AdditionalResources: [
                        {
                            leetcode: "https://leetcode.com/explore/learn/card/graph/",
                            gfg: "https://www.geeksforgeeks.org/dsa/graph-and-its-representations/",
                            VisuAlgo: "https://visualgo.net/en/graphds",
                            youtubePlaylist: "https://www.youtube.com/playlist?list=PLgUwDviBIf0oE3gA41TKO2H5bHpPd7fzn",
                        },
                    ]
                },
                {
                    Topic: "Connected Components | Logic Explanation",
                    content: [
                        {
                            heading: "Connected Components in Graphs",
                            content: [
                                {
                                    para: "So far we've seen different types of graphs. Graphs can be connected or can be like a binary tree (as we know all trees are graphs with some restrictions) as shown in the following figure.",
                                    image: "/static/Graph18.png"
                                },
                                {
                                    para: "But what would you call the following figure?",
                                    image: "/static/Graph19.png"
                                },
                                {
                                    para: "The most common answer would be these are 4 different graphs as they are not connected. \n\n But is it possible to call them a single graph? To answer this, let us consider the question given: \n\n Given an undirected graph with 10 nodes and 8 edges. The edges are (1,2), (1,3), (2,4), (4,3), (5,6), (5,7), (6,7), (8,9) .The graph that can be formed with the given information is as follows:",
                                    image: "/static/Graph20.png"
                                },
                                {
                                    para: "Apparently, it's a graph, which is in 4 pieces, the last one being a single node. In this case, we can say, the graph has been broken down into 4 different connected components. So next time if you see two different parts of a graph and they are not connected, then do not say that it cannot be a single graph. In the above example, they can be 4 different graphs but according to the given question and the input, we can call them parts of a single graph.",
                                },
                            ]
                        },
                        {
                            heading: "Graph Traversal",
                            content: [
                                {
                                    para: "In the upcoming topics, we’ll be learning about a lot of algorithms. Now, assume a traversal algorithm. Any traversal algorithm will always use a visited array.",
                                    image: "/static/Graph21.png"
                                },
                                {
                                    para: "For the same example, we will create an array of size 11 (n+1) starting with the zeroth index. Initialize this visited array to zero, indicating that all the nodes are unvisited. Then follow the following algorithm. If a node is not visited, then call the traversal algorithm.",
                                    image: "/static/Graph22.png"
                                },
                                {
                                    subheading: "Why can’t we just call traversal(1)?",
                                    para: "We cannot just call traversal(node) because a graph can have multiple components and traversal algorithms are designed in such a way that they will traverse the entire connected portion of the graph. For example, traversal(1) will traverse only the connected nodes, i.e., nodes 2, 3, and 4, but not the connected components. \n\n Consider the following illustration to understand how a traversal algorithm will traverse the connected components.",
                                    image: "/static/Graph23.gif"
                                },
                            ]
                        },
                    ],
                    video: "https://youtu.be/lea-Wl_uWXY?list=PLgUwDviBIf0oE3gA41TKO2H5bHpPd7fzn",
                    code: `
import java.util.*;

class Graph {
    private int vertices;
    private LinkedList<Integer>[] adjacencyList;

    // Constructor
    public Graph(int vertices) {
        this.vertices = vertices;
        adjacencyList = new LinkedList[vertices];
        for (int i = 0; i < vertices; i++) {
            adjacencyList[i] = new LinkedList<>();
        }
    }

    // Add edge between source and destination
    public void addEdge(int source, int destination) {
        adjacencyList[source].add(destination);
        adjacencyList[destination].add(source); // because it's undirected
    }

    // DFS to explore connected components
    private void DFS(int vertex, boolean[] visited) {
        visited[vertex] = true;
        for (int neighbor : adjacencyList[vertex]) {
            if (!visited[neighbor]) {
                DFS(neighbor, visited);
            }
        }
    }

    // Count connected components
    public int countConnectedComponents() {
        boolean[] visited = new boolean[vertices];
        int count = 0;

        for (int i = 0; i < vertices; i++) {
            if (!visited[i]) {
                DFS(i, visited);
                count++;
            }
        }
        return count;
    }

    public static void main(String[] args) {
        Graph graph = new Graph(10); // graph with 10 nodes (0 to 9)

        // Adding edges as given in the example
        graph.addEdge(1, 2);
        graph.addEdge(1, 3);
        graph.addEdge(2, 4);
        graph.addEdge(4, 3);
        graph.addEdge(5, 6);
        graph.addEdge(5, 7);
        graph.addEdge(6, 7);
        graph.addEdge(8, 9);

        int connectedComponents = graph.countConnectedComponents();
        System.out.println("Number of connected components: " + connectedComponents);
    }
}

`,
                    AdditionalResources: [
                        {
                            leetcode: "https://leetcode.com/explore/learn/card/graph/",
                            gfg: "https://www.geeksforgeeks.org/dsa/graph-and-its-representations/",
                            VisuAlgo: "https://visualgo.net/en/graphds",
                            youtubePlaylist: "https://www.youtube.com/playlist?list=PLgUwDviBIf0oE3gA41TKO2H5bHpPd7fzn",
                        },
                    ]
                },
                {
                    Topic: "BFS",
                    content: [
                        {
                            heading: "Breadth First Search (BFS): Level Order Traversal",
                            content: [
                                {
                                    subheading: "Problem Statement",
                                    para: "Given an undirected graph, return a vector of all nodes by traversing the graph using breadth-first search (BFS)."
                                },
                                {
                                    image: "/static/Graph24.png"
                                },
                                {
                                    image: "/static/Graph25.png"
                                },
                                {
                                    image: "/static/Graph26.png"
                                },
                                {
                                    image: "/static/Graph27.gif"
                                },
                            ]
                        },

                    ],
                    video: "https://youtu.be/-tgVpUgsQ5k?list=PLgUwDviBIf0oE3gA41TKO2H5bHpPd7fzn",
                    code: `
import java.util.*;
class Solution {
    // Function to return Breadth First Traversal of given graph.
    public ArrayList<Integer> bfsOfGraph(int V, 
    ArrayList<ArrayList<Integer>> adj) {
        
        ArrayList < Integer > bfs = new ArrayList < > ();
        boolean vis[] = new boolean[V];
        Queue < Integer > q = new LinkedList < > ();

        q.add(0);
        vis[0] = true;

        while (!q.isEmpty()) {
            Integer node = q.poll();
            bfs.add(node);

            // Get all adjacent vertices of the dequeued vertex s
            // If a adjacent has not been visited, then mark it
            // visited and enqueue it
            for (Integer it: adj.get(node)) {
                if (vis[it] == false) {
                    vis[it] = true;
                    q.add(it);
                }
            }
        }

        return bfs;
    }
    
    public static void main(String args[]) {

        ArrayList < ArrayList < Integer >> adj = new ArrayList < > ();
        for (int i = 0; i < 5; i++) {
            adj.add(new ArrayList < > ());
        }
        adj.get(0).add(1);
        adj.get(1).add(0);
        adj.get(0).add(4);
        adj.get(4).add(0);
        adj.get(1).add(2);
        adj.get(2).add(1);
        adj.get(1).add(3);
        adj.get(3).add(1);
        
        Solution sl = new Solution(); 
        ArrayList < Integer > ans = sl.bfsOfGraph(5, adj);
        int n = ans.size(); 
        for(int i = 0;i<n;i++) {
            System.out.print(ans.get(i)+" "); 
        }
    }
}


Output: 0 1 4 2 3

Time Complexity: O(N) + O(2E), Where N = Nodes, 2E is for total degrees as we traverse all adjacent nodes.

Space Complexity: O(3N) ~ O(N), Space for queue data structure visited array and an adjacency list
`,
                    AdditionalResources: [
                        {
                            leetcode: "https://leetcode.com/explore/learn/card/graph/",
                            gfg: "https://www.geeksforgeeks.org/dsa/graph-and-its-representations/",
                            VisuAlgo: "https://visualgo.net/en/graphds",
                            youtubePlaylist: "https://www.youtube.com/playlist?list=PLgUwDviBIf0oE3gA41TKO2H5bHpPd7fzn",
                        },
                    ]
                },
                {
                    Topic: "DFS",
                    content: [
                        {
                            heading: "Graph Representation in Java",
                            content: [
                                {
                                    subheading: "Representations of Graph",
                                    para: "Here are the two most common ways to represent a graph : For simplicity, we are going to consider only unweighted graphs in this post. \n\n Adjacency Matrix \n Adjacency List"
                                },
                                {
                                    subheading: "Adjacency Matrix Representation",
                                    para: "An adjacency matrix is a way of representing a graph as a matrix of boolean (0's and 1's) \n\n Let's assume there are n vertices in the graph So, create a 2D matrix adjMat[n][n] having dimension n x n. \n\n If there is an edge from vertex i to j, mark adjMat[i][j] as 1.  \n If there is no edge from vertex i to j, mark adjMat[i][j] as 0."
                                },
                                {
                                    subheading: "Representation of Undirected Graph as Adjacency Matrix:",
                                    para: "The below figure shows an undirected graph. Initially, the entire Matrix is ​initialized to 0. If there is an edge from source to destination, we insert 1 to both cases (adjMat[source][destination] and adjMat[destination][source]) because we can go either way.",
                                    image: "/static/Graph14.png"
                                },
                                {
                                    subheading: "Representation of Directed Graph as Adjacency Matrix:",
                                    para: "The below figure shows a directed graph. Initially, the entire Matrix is ​​initialized to 0. If there is an edge from source to destination, we insert 1 for that particular adjMat[source][destination].",
                                    image: "/static/Graph15.png"
                                },
                            ]
                        },
                        {
                            heading: "Adjacency List Representation",
                            content: [
                                {
                                    para: "An array of Lists is used to store edges between two vertices. The size of array is equal to the number of vertices (i.e, n). Each index in this array represents a specific vertex in the graph. The entry at the index i of the array contains a linked list containing the vertices that are adjacent to vertex i. Let's assume there are n vertices in the graph So, create an array of list of size n as adjList[n]. \n\n adjList[0] will have all the nodes which are connected (neighbour) to vertex 0.\n adjList[1] will have all the nodes which are connected (neighbour) to vertex 1 and so on.",
                                },
                                {
                                    subheading: "Representation of Undirected Graph as Adjacency List:",
                                    para: "The below undirected graph has 3 vertices. So, an array of list will be created of size 3, where each indices represent the vertices. Now, vertex 0 has two neighbours (i.e, 1 and 2). So, insert vertex 1 and 2 at indices 0 of array. Similarly, For vertex 1, it has two neighbour (i.e, 2 and 0) So, insert vertices 2 and 0 at indices 1 of array. Similarly, for vertex 2, insert its neighbours in array of list.",
                                    image: "/static/Graph16.png"
                                },
                                {
                                    subheading: "Representation of Directed Graph as Adjacency List:",
                                    para: "The below directed graph has 3 vertices. So, an array of list will be created of size 3, where each indices represent the vertices. Now, vertex 0 has no neighbours. For vertex 1, it has two neighbour (i.e, 0 and 2) So, insert vertices 0 and 2 at indices 1 of array. Similarly, for vertex 2, insert its neighbours in array of list.",
                                    image: "/static/Graph17.png"
                                },
                            ]
                        },
                    ],
                    video: "https://youtu.be/OsNklbh9gYI?list=PLgUwDviBIf0oE3gA41TKO2H5bHpPd7fzn",
                    code: `
import java.util.*;
`,
                    AdditionalResources: [
                        {
                            leetcode: "https://leetcode.com/explore/learn/card/graph/",
                            gfg: "https://www.geeksforgeeks.org/dsa/graph-and-its-representations/",
                            VisuAlgo: "https://visualgo.net/en/graphds",
                            youtubePlaylist: "https://www.youtube.com/playlist?list=PLgUwDviBIf0oE3gA41TKO2H5bHpPd7fzn",
                        },
                    ]
                },
            ]
        },
        {
            Subsection: "Advanced",
            content: [
            ]
        }
    ],
};

export default dsaData;

import React, { useState } from 'react';
import { Code, Files, ArrowLeft, ArrowRight, Youtube, BookOpen, ExternalLink, Layers } from 'lucide-react';
import Graph1 from '../Media/graph1.png';
import Graph2 from '../Media/graph2.png';
import Graph3 from '../Media/graph3.png';
import Graph4 from '../Media/graph4.png';
import Graph5 from '../Media/graph5.png';
import Graph6 from '../Media/graph6.png';
import Graph7 from '../Media/graph7.png';
import Graph8 from '../Media/graph8.png';
import Graph9 from '../Media/graph9.png';
import Graph10 from '../Media/graph10.png';
import Graph11 from '../Media/graph11.png';
import Graph12 from '../Media/graph12.png';
import Graph13 from '../Media/graph13.png';


const Intro = () => {
  // Sample JSON data for content
  const contentData = {
    sections: [
      {
        heading: "Introduction to Graphs",
        content: [
          {
            subheading: "What is a Graph?",
            para: "A graph is a non-linear data structure consisting of nodes that have data and are connected to other nodes through edges."
          },
          {
            subheading: "What are Graph data Structures ?",
            para: "There are two types of data structures \n 1) Linear \n 2) Non - linear \n\n We are aware of linear data structures such as arrays, stacks, queues, and linked lists. They are called linear because data elements are arranged in a linear or sequential manner. \n\n The only non-linear data structure that we’ve seen so far is Tree. In fact, a tree is a special type of graph with some restrictions. Graphs are data structures that have a wide-ranging application in real life. These include analysis of electrical circuits, finding the shortest routes between two places, building navigation systems like Google Maps, even social media using graphs to store data about each user, etc. To understand and use the graph data structure, let’s get familiar with the definitions and terms associated with graphs. ",
          },
          {
            subheading: "Definations and Terminology",
            para: "A graph is a non-linear data structure consisting of nodes that have data and are connected to other nodes through edges.",
            image: Graph1
          },
          {
            subheading: "Node ",
            para: "Nodes are circles represented by numbers. Nodes are also referred to as vertices. They store the data. The numbering of the nodes can be done in any order, no specific order needs to be followed. \n\n In the following example, the number of nodes or vertices = 5",
            image: Graph2
          }, 
          {
            subheading: "Edge",
            para: "Two nodes are connected by a horizontal line called Edge. Edge can be directed or undirected. Basically, pairs of vertices are called edges. \n\n In the above example, the edge can go from 1 to 4 or from 4 to 1, i.e. a bidirectional edge can be in both directions, hence called an undirected edge. Thus, the pairs (1,4) and (4,1) represent the same edge.",
            image: Graph2
          },
          {
            subheading: "Types of Graphs",
            image: Graph3
          },
          {
            subheading: "Undirected Graph",
            para: "An undirected graph is a graph where edges are bidirectional, with no direction associated with them, i.e, there will be an undirected edge. In an undirected graph, the pair of vertices representing any edge is unordered. Thus, the pairs (u, v) and (v, u) represent the same edge.",
          },  
          {
            subheading: "Directed Graph",
            para: "A directed graph is a graph where all the edges are directed from one vertex to another, i.e, there will be a directed edge. It contains an ordered pair of vertices. It implies each edge is represented by a directed pair <u, v>. Therefore, <u, v> and <v, u> represent two different edges.",
          },
          {
            para: "There can be multi-directed edges, hence bidirectional edges, as shown in the example below.",
            image: Graph4
          },

        ]
      },
      {
        heading: "Structure of a Graph",
        content: [
          {
            para: "Does every graph have a cycle? \n\n The answer is No! Let us consider the following examples to understand this. ",
            image: Graph5
          },
          {
            para: "Fig.1 does not form a cycle but still, it is a graph."
          },
          {
            para: "Fig.2 is an example of a binary tree. It can also be called a graph because it follows all the rules. We’ve nodes and edges, and this is the minimal condition to be called a graph. "
          },
          {
            para: "So a graph does not necessarily mean to be an enclosed structure, it can be an open structure as well. A graph is said to have a cycle if it starts from a node and ends at the same node. There can be multiple cycles in a graph.",
            image: Graph6
          },
          {
            para: "If there is at least one cycle present in the graph then it is called an Undirected Cyclic Graph.  \n\n In the following examples of directed graphs, the first directed graph is not cyclic as we can’t start from a node and end at the same node. Hence it is called Directed Acyclic Graph, commonly called DAG.",
            image: Graph7
          },
          {
            para: "If we just add an edge to the directed graph, then at least one cycle is present in the graph, hence it becomes Directed Cyclic Graph.",
          },
          {
            subheading: "Path in a Graph",
            image: Graph8
          },
          {
            para: "The path contains a lot of nodes and each of them is reachable.\n\n Consider the given graph,",
            image: Graph9
          },
            {
                para: "1 2 3 5 is a path. \n\n 1 2 3 2 1 is not a path, because a node can’t appear twice in a path. \n\n 1 3 5 is not a path, as adjacent nodes must have an edge and there is no edge between 1 and 3.",
            },
        ]
      },
      {
        heading: "Types of Graphs based on Degree",
        content: [
          {
            subheading: "Degree of Graph",
            para: "It is the number of edges that go inside or outside that node. \n\n For undirected graphs, the degree is the number of edges attached to a node. \n\n Example, \n D(3) = 3 \n D(4) = 2",
            image: Graph10
          },
          {
            para: " It states that the total degree of a graph is equal to twice the number of edges. This is because every edge is associated/ connected to two nodes.",
            image: Graph11
          },
          {
            para: "Total Degree of a graph = 2 x E \n\n Example, (2+2+3+2+3) = 2 x 6 => 12 = 12 ",
            image: Graph12
          },
          {
            para: "For directed graphs, we’ve Indegree and Outdegree. The indegree of a node is the number of incoming edges. The outdegree of a node is the number of outgoing edges.",
          },
          {
            subheading: "Edge Weight",
            para: "A graph may have weights assigned on its edges. It is often referred to as the cost of the edge.",
            image: Graph13
          },
          {
            para: "If weights are not assigned then we assume the unit weight, i.e, 1. In applications, weight may be a measure of the cost of a route. For example, if vertices A and B represent towns in a road network, then weight on edge AB may represent the cost of moving from A to B, or vice versa.",
          },
        ]
      },
    ]
  };
  
  // State management
  const [leftView, setLeftView] = useState('content'); // 'content' or 'code'
  const [rightView, setRightView] = useState('youtube'); // 'youtube' or 'code'
  const [currentSection, setCurrentSection] = useState(0);

  return (
    <div className="flex w-screen h-screen bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden">
      {/* Left Panel */}
      <div className="flex flex-col w-1/2 bg-white border-r border-gray-200 shadow-lg rounded-r-xl m-2 ml-0">
        {/* Panel header with toggle buttons */}
        <div className="flex ml-1">
          <button 
            className={`px-4 py-1 mr-2 rounded-lg font-medium transition-all duration-200 flex items-center ${
              leftView === 'content' 
                ? 'bg-green-400 text-white shadow-md' 
                : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200 shadow-sm'
            }`}
            onClick={() => setLeftView('content')}
          >
            <Files  className='text-green-600'/>
            <div className='ml-1 text-sm'>Content</div>
          </button>
          <button 
            className={`px-3 py-1 rounded-lg font-medium transition-all duration-200 flex items-center ${
              leftView === 'code' 
                ? 'bg-green-400 text-white shadow-md' 
                : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200 shadow-sm'
            }`}
            onClick={() => setLeftView('code')}
          >
            <Code className='text-green-600'/>
            <div className='ml-1 text-sm'>Code</div>
          </button>
        </div>
        
        {/* Panel content */}
        <div className="flex-1 p-3 overflow-auto bg-white">
          {leftView === 'content' ? (
            <div className="h-full flex flex-col">
              <div className="mb-6">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-[12px] font-medium bg-green-100 text-green-800">
                  Section {currentSection + 1} of {contentData.sections.length}
                </span>
              </div>
              
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                {contentData.sections[currentSection].heading}
                </h2>

                {contentData.sections[currentSection].content.map((item, idx) => (
                <div key={idx} className="mb-6">
                    {item.subheading && (
                    <h3 className="text-xl font-bold text-gray-700 mb-2">
                        {item.subheading}
                    </h3>
                    )}
                    <p className="text-gray-600 text-sm leading-relaxed whitespace-pre-line">
                    {item.para}
                    </p>
                    {item.image && (
                        <img 
                        src={item.image} 
                        alt="Content visual" 
                        className="rounded-xl shadow-md mt-4 border border-gray-200"/>
                    )}
                </div>
                ))}

                {/* optional image field, only if you add it later */}
                {contentData.sections[currentSection].image && (
                <img
                    src={contentData.sections[currentSection].image}
                    alt="Content visual"
                    className="w-full rounded-xl shadow-md mb-6 border border-gray-200"
                />
                )}

              <div className="mt-auto flex justify-between items-center p-2 border-t border-gray-200">
                <button 
                  className={`px-3 py-1 rounded-lg font-medium flex items-center transition-all ${
                    currentSection === 0
                      ? 'bg-green-100 text-green-600 cursor-not-allowed'
                      : 'bg-green-100 text-green-600 hover:bg-green-100 shadow-md hover:shadow-lg'
                  }`}
                  disabled={currentSection === 0}
                  onClick={() => setCurrentSection(prev => prev - 1)}
                >
                  <ArrowLeft className='text-green-400'/>
                  <div className='text-sm ml-1'>Previous</div>
                </button>
                
                <div className="flex space-x-2">
                  {contentData.sections.map((_, index) => (
                    <button
                      key={index}
                      className={`w-2 h-2 rounded-full transition-colors ${
                        index === currentSection ? 'bg-green-500' : 'bg-gray-300 hover:bg-gray-400'
                      }`}
                      onClick={() => setCurrentSection(index)}
                    />
                  ))}
                </div>
                
                <button 
                  className={`px-3 py-1 rounded-lg font-medium flex items-center transition-all ${
                    currentSection === contentData.sections.length - 1
                      ? 'bg-green-100 text-green-600 cursor-not-allowed'
                      : 'bg-green-100 text-green-600 hover:bg-green-100 shadow-md hover:shadow-lg'
                  }`}
                  disabled={currentSection === contentData.sections.length - 1}
                  onClick={() => setCurrentSection(prev => prev + 1)}
                >
                  <div className='text-sm ml-1'></div>
                  <div className='text-sm'>Next</div>
                  <ArrowRight className='text-green-400 ml-1'/>
                </button>
              </div>
            </div>
          ) : (
            <div className="relative h-full">
              <div className="absolute top-3 right-3 z-10 flex space-x-2">
                <button className="px-3 py-1 bg-green-200 text-gray-700 rounded-md text-xs font-medium hover:bg-gray-300">
                  Copy
                </button>
                <button className="px-3 py-1 bg-gray-200 text-gray-700 rounded-md text-xs font-medium hover:bg-gray-300">
                  Format
                </button>
              </div>
              <textarea 
                className="w-full h-full p-4 border border-gray-300 rounded-xl resize-none font-mono text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
                placeholder="// Your code goes here..."
                defaultValue={`function example() {
                    // This is a sample function
                    return 'Hello, world!';
                    }`}
              />
            </div>
          )}
        </div>
      </div>
      
      {/* Right Panel */}
      <div className="flex flex-col w-1/2 bg-white shadow-lg rounded-l-xl m-1 mr-0">
        {/* Panel header with toggle buttons */}
        <div className="flex p-2 bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-gray-200 rounded-tl-xl">
          <button 
            className={`px-4 mr-2 rounded-lg text-sm font-bold transition-all duration-200 flex items-center ${
              rightView === 'youtube' 
                ? 'bg-[rgb(248,38,51)] text-white shadow-md' 
                : 'bg-white text-[rgb(248,38,51)] hover:bg-gray-100 border border-gray-200 shadow-sm'
            }`}
            onClick={() => setRightView('youtube')}
          >
            <Youtube />
            <div className='ml-1'>Youtube</div>
          </button>
          <button 
            className={`px-4 py-1 rounded-lg font-medium transition-all duration-200 flex items-center ${
              rightView === 'code' 
                ? 'bg-green-400 text-white shadow-md' 
                : 'bg-white text-gray-600 hover:bg-green-100 border border-gray-200 shadow-sm'
            }`}
            onClick={() => setRightView('code')}
          >
            <Code className='text-green-600'/>
            <div className='ml-1 text-sm'>Code</div>
          </button>
        </div>
        
        {/* Panel content */}
        <div className="flex-1 overflow-hidden">
        {rightView === 'youtube' ? (
  <div className="w-full h-full flex flex-col">
    {/* Video Player */}
    <div className="flex-1 flex items-center justify-center bg-black p-4">
      <iframe
        width="100%"
        height="100%"
        src="https://www.youtube.com/embed/M3_pLsDdeuU?list=PLgUwDviBIf0oE3gA41TKO2H5bHpPd7fzn"
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="max-w-full max-h-full rounded-lg shadow-lg"
      ></iframe>
    </div>
    
    {/* Resources Section */}
    <div className="bg-white border-t border-gray-200 p-4">
      <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
        </svg>
        Additional Resources
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <a
          href="https://leetcode.com/problemset/all/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center p-3 bg-gray-50 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-colors group"
        >
          <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          </div>
          <div className="flex-1">
            <h4 className="font-medium text-gray-800 group-hover:text-blue-700">LeetCode Problems</h4>
            <p className="text-xs text-gray-500">Practice graph problems</p>
          </div>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400 group-hover:text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </a>
        
        <a
          href="https://www.geeksforgeeks.org/graph-data-structure-and-algorithms/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center p-3 bg-gray-50 rounded-lg border border-gray-200 hover:border-green-300 hover:bg-green-50 transition-colors group"
        >
          <div className="flex-shrink-0 w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mr-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
          </div>
          <div className="flex-1">
            <h4 className="font-medium text-gray-800 group-hover:text-green-700">GeeksforGeeks</h4>
            <p className="text-xs text-gray-500">Graph tutorials & examples</p>
          </div>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400 group-hover:text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </a>
        
        <a
          href="https://visualgo.net/en/graphds"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center p-3 bg-gray-50 rounded-lg border border-gray-200 hover:border-purple-300 hover:bg-purple-50 transition-colors group"
        >
          <div className="flex-shrink-0 w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mr-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
            </svg>
          </div>
          <div className="flex-1">
            <h4 className="font-medium text-gray-800 group-hover:text-purple-700">VisuAlgo</h4>
            <p className="text-xs text-gray-500">Visualize graph algorithms</p>
          </div>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400 group-hover:text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </a>
        
        <a
          href="https://www.youtube.com/playlist?list=PLgUwDviBIf0oE3gA41TKO2H5bHpPd7fzn"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center p-3 bg-gray-50 rounded-lg border border-gray-200 hover:border-red-300 hover:bg-red-50 transition-colors group"
        >
          <div className="flex-shrink-0 w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center mr-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
          </div>
          <div className="flex-1">
            <h4 className="font-medium text-gray-800 group-hover:text-red-700">YouTube Playlist</h4>
            <p className="text-xs text-gray-500">Complete graph series</p>
          </div>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400 group-hover:text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </a>
      </div>
    </div>
  </div>
): (
            <div className="relative h-full">
              <div className="absolute top-3 right-3 z-10 flex space-x-2 mr-2">
                <button className="px-3 py-1 bg-gray-700 text-gray-200 rounded-md text-xs font-medium hover:bg-gray-600">
                  Copy
                </button>
                <button className="px-3 py-1 bg-gray-700 text-gray-200 rounded-md text-xs font-medium hover:bg-gray-600">
                  Format
                </button>
              </div>
              <textarea 
                className="w-full h-full p-4 bg-gray-900 text-gray-100 rounded-lg resize-none font-mono text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="// Your code goes here..."
                defaultValue={`function example() {
// This is a sample function
return 'Hello, from the code editor!';
}`}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Intro;
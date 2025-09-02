import React, { useEffect, useRef, useState, useCallback } from "react";
import {
  Editor,
  EditorState,
  RichUtils,
  AtomicBlockUtils,
  ContentState,
  Modifier,
  SelectionState,
} from "draft-js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAlignCenter,
  faAlignLeft,
  faAlignRight,
  faBold,
  faChevronDown,
  faChevronUp,
  faCode,
  faHighlighter,
  faItalic,
  faListOl,
  faListUl,
  faQuoteRight,
  faStrikethrough,
  faSubscript,
  faSuperscript,
  faTextWidth,
  faUnderline,
  faImage,
  faArrowLeft,
  faArrowRight,
  faPrint,
} from "@fortawesome/free-solid-svg-icons";

// ===== Toolbar Component =====
const Toolbar = ({ editorState, setEditorState, addImage, onPrint }) => {
  const tools = [
    { label: "bold", style: "BOLD", icon: <FontAwesomeIcon icon={faBold} />, method: "inline" },
    { label: "italic", style: "ITALIC", icon: <FontAwesomeIcon icon={faItalic} />, method: "inline" },
    { label: "underline", style: "UNDERLINE", icon: <FontAwesomeIcon icon={faUnderline} />, method: "inline" },
    { label: "highlight", style: "HIGHLIGHT", icon: <FontAwesomeIcon icon={faHighlighter} />, method: "inline" },
    { label: "strike-through", style: "STRIKETHROUGH", icon: <FontAwesomeIcon icon={faStrikethrough} />, method: "inline" },
    { label: "Superscript", style: "SUPERSCRIPT", icon: <FontAwesomeIcon icon={faSuperscript} />, method: "inline" },
    { label: "Subscript", style: "SUBSCRIPT", icon: <FontAwesomeIcon icon={faSubscript} />, method: "inline" },
    { label: "Monospace", style: "CODE", icon: <FontAwesomeIcon icon={faTextWidth} transform="grow-3" />, method: "inline" },
    { label: "Blockquote", style: "blockQuote", icon: <FontAwesomeIcon icon={faQuoteRight} transform="grow-2" />, method: "block" },
    { label: "Unordered-List", style: "unordered-list-item", icon: <FontAwesomeIcon icon={faListUl} transform="grow-6" />, method: "block" },
    { label: "Ordered-List", style: "ordered-list-item", icon: <FontAwesomeIcon icon={faListOl} transform="grow-6" />, method: "block" },
    { label: "Code Block", style: "CODEBLOCK", icon: <FontAwesomeIcon icon={faCode} transform="grow-3" />, method: "inline" },
    { label: "Uppercase", style: "UPPERCASE", icon: <FontAwesomeIcon icon={faChevronUp} transform="grow-3" />, method: "inline" },
    { label: "lowercase", style: "LOWERCASE", icon: <FontAwesomeIcon icon={faChevronDown} transform="grow-3" />, method: "inline" },
    { label: "Left", style: "leftAlign", icon: <FontAwesomeIcon icon={faAlignLeft} transform="grow-2" />, method: "block" },
    { label: "Center", style: "centerAlign", icon: <FontAwesomeIcon icon={faAlignCenter} transform="grow-2" />, method: "block" },
    { label: "Right", style: "rightAlign", icon: <FontAwesomeIcon icon={faAlignRight} transform="grow-2" />, method: "block" },
    { label: "Image", style: "IMAGE", icon: <FontAwesomeIcon icon={faImage} />, method: "image" },
  ];

  const applyStyle = (e, style, method) => {
    e.preventDefault();
    if (method === "block") {
      setEditorState(RichUtils.toggleBlockType(editorState, style));
    } else if (method === "inline") {
      setEditorState(RichUtils.toggleInlineStyle(editorState, style));
    } else if (method === "image") {
      document.getElementById("image-upload").click();
    }
  };

  const isActive = (style, method) => {
    if (method === "block") {
      const selection = editorState.getSelection();
      const blockType = editorState.getCurrentContent().getBlockForKey(selection.getStartKey()).getType();
      return blockType === style;
    } else if (method === "inline") {
      return editorState.getCurrentInlineStyle().has(style);
    }
    return false;
  };

  return (
    <div className="flex flex-wrap mb-2 gap-2">
      {tools.map((item, idx) => (
        <button
          key={`${item.label}-${idx}`}
          title={item.label}
          className={`px-3 py-2 border border-gray-300 rounded hover:bg-gray-100 transition-colors ${
            isActive(item.style, item.method) ? "bg-gray-200 text-black" : "text-gray-600"
          }`}
          onClick={(e) => applyStyle(e, item.style, item.method)}
          onMouseDown={(e) => e.preventDefault()}
        >
          {item.icon || item.label}
        </button>
      ))}
      <button
        title="Print"
        className="px-3 py-2 border border-gray-300 rounded hover:bg-gray-100 transition-colors text-gray-600"
        onClick={onPrint}
      >
        <FontAwesomeIcon icon={faPrint} />
      </button>
      {/* Hidden file input for image upload */}
      <input
        id="image-upload"
        type="file"
        accept="image/*"
        style={{ display: "none" }}
        onChange={(e) => {
          const file = e.target.files[0];
          if (file) {
            const reader = new FileReader();
            reader.onload = (ev) => addImage(ev.target.result);
            reader.readAsDataURL(file);
          }
        }}
      />
    </div>
  );
};

// ===== Page Component =====
const Page = ({ content, pageNumber, totalPages, isPrintView = false }) => {
  return (
    <div className={`relative bg-white mb-6 ${isPrintView ? '' : 'shadow-lg'}`}>
      {/* A4 size container - 210mm x 297mm at 96 DPI */}
      <div 
        className={`p-8 ${isPrintView ? '' : 'border border-gray-300'}`}
        style={{ 
          width: '794px',  // 210mm at 96 DPI
          height: '1123px', // 297mm at 96 DPI
          overflow: 'hidden'
        }}
      >
        {content}
      </div>
      {!isPrintView && (
        <div className="absolute bottom-2 right-4 text-sm text-gray-500">
          Page {pageNumber} of {totalPages}
        </div>
      )}
    </div>
  );
};

// ===== Pagination Controls =====
const PaginationControls = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <div className="flex justify-center items-center my-4 gap-4">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-4 py-2 border border-gray-300 rounded disabled:opacity-50 hover:bg-gray-100"
      >
        <FontAwesomeIcon icon={faArrowLeft} />
      </button>
      <span className="text-sm">
        Page {currentPage} of {totalPages}
      </span>
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-4 py-2 border border-gray-300 rounded disabled:opacity-50 hover:bg-gray-100"
      >
        <FontAwesomeIcon icon={faArrowRight} />
      </button>
    </div>
  );
};

const handleDropImage = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (ev) => addImage(ev.target.result);
      reader.readAsDataURL(file);
    }
  };

// ===== Canva Component =====
const Canva = () => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [pages, setPages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [showPrintView, setShowPrintView] = useState(false);
  const editor = useRef(null);
  const pageRefs = useRef([]);

  useEffect(() => {
    editor.current.focus();
  }, []);

  useEffect(() => {
    // Split content into pages whenever editorState changes
    splitContentIntoPages();
  }, [editorState]);

  const handleKeyCommand = (command) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      setEditorState(newState);
      return true;
    }
    return false;
  };

  const addImage = (dataUrl) => {
    const contentState = editorState.getCurrentContent();
    const contentStateWithEntity = contentState.createEntity("IMAGE", "IMMUTABLE", { src: dataUrl });
    const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
    const newState = AtomicBlockUtils.insertAtomicBlock(editorState, entityKey, " ");
    setEditorState(newState);
  };

  const mediaBlockRenderer = (block) => {
    if (block.getType() === "atomic") return { component: ImageComponent, editable: false };
    return null;
  };

  const styleMap = {
    CODE: { backgroundColor: "rgba(0,0,0,0.05)", fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace', fontSize: 16, padding: 2 },
    HIGHLIGHT: { backgroundColor: "#F7A5F7" },
    UPPERCASE: { textTransform: "uppercase" },
    LOWERCASE: { textTransform: "lowercase" },
    CODEBLOCK: { fontFamily: '"fira-code", "monospace"', fontSize: "inherit", background: "#ffeff0", fontStyle: "italic", lineHeight: 1.5, padding: "0.3rem 0.5rem", borderRadius: "0.2rem" },
    SUPERSCRIPT: { verticalAlign: "super", fontSize: "80%" },
    SUBSCRIPT: { verticalAlign: "sub", fontSize: "80%" },
  };

  const myBlockStyleFn = (contentBlock) => {
    switch (contentBlock.getType()) {
      case "blockQuote": return "text-gray-500 italic border-l-2 border-gray-400 pl-3";
      case "leftAlign": return "text-left";
      case "rightAlign": return "text-right";
      case "centerAlign": return "text-center";
      case "justifyAlign": return "text-justify";
      default: return null;
    }
  };

  // Function to split content into A4-sized pages based on approximate height calculation
  const splitContentIntoPages = useCallback(() => {
    const contentState = editorState.getCurrentContent();
    const blockMap = contentState.getBlockMap();
    const newPages = [];
    let currentPageBlocks = [];
    let cumulativeHeight = 0;
    const MAX_HEIGHT = "100px"; // A4 minus padding
  
    // Render each block into a hidden div to measure height
    const tempContainer = document.createElement("div");
    tempContainer.style.position = "absolute";
    tempContainer.style.visibility = "hidden";
    tempContainer.style.width = "794px"; // A4 width
    document.body.appendChild(tempContainer);
  
    blockMap.forEach((block) => {
      const blockDiv = document.createElement("div");
      blockDiv.innerText = block.getText();
      tempContainer.appendChild(blockDiv);
      const blockHeight = blockDiv.offsetHeight;
  
      if (cumulativeHeight + blockHeight > MAX_HEIGHT && currentPageBlocks.length > 0) {
        const pageContentState = ContentState.createFromBlockArray(
          currentPageBlocks,
          contentState.getEntityMap()
        );
        newPages.push({ contentState: pageContentState });
        currentPageBlocks = [block];
        cumulativeHeight = blockHeight;
      } else {
        currentPageBlocks.push(block);
        cumulativeHeight += blockHeight;
      }
    });
  
    if (currentPageBlocks.length > 0) {
      const pageContentState = ContentState.createFromBlockArray(
        currentPageBlocks,
        contentState.getEntityMap()
      );
      newPages.push({ contentState: pageContentState });
    }
  
    setPages(newPages);
    if (currentPage > newPages.length) setCurrentPage(newPages.length);
    document.body.removeChild(tempContainer);
  }, [editorState, currentPage]);
  

  const handlePrint = () => {
    setShowPrintView(true);
    setTimeout(() => {
      window.print();
      setTimeout(() => setShowPrintView(false), 500);
    }, 100);
  };

  // Render the print view
  if (showPrintView) {
    return (
      <div className="print-view">
        {pages.map((page, index) => (
          <Page
            key={index}
            content={
              <Editor
                editorState={EditorState.createWithContent(page.contentState)}
                onChange={() => {}}
                readOnly={true}
                blockRendererFn={mediaBlockRenderer}
                customStyleMap={styleMap}
                blockStyleFn={myBlockStyleFn}
              />
            }
            pageNumber={page.pageNumber}
            totalPages={pages.length}
            isPrintView={true}
          />
        ))}
      </div>
    );
  }

  return (
    <div className="w-full mx-auto mt-8 p-4 bg-gray-100 rounded flex gap-8">
  {/* Left side - Editor */}
  <div className="w-1/2 flex flex-col">
    <div
      className="flex-1 p-4 border border-black bg-white rounded overflow-hidden"
      onClick={() => editor.current.focus()}
      onDrop={handleDropImage}
      onDragOver={(e) => e.preventDefault()}
    >
      <Toolbar 
        editorState={editorState} 
        setEditorState={setEditorState} 
        addImage={addImage} 
        onPrint={handlePrint}
      />
      <div className="border border-green-500 p-2 h-full overflow-auto">
        <Editor
          ref={editor}
          editorState={editorState}
          onChange={setEditorState}
          handleKeyCommand={handleKeyCommand}
          blockRendererFn={mediaBlockRenderer}
          customStyleMap={styleMap}
          blockStyleFn={myBlockStyleFn}
        />
      </div>
    </div>
  </div>

  {/* Right side - Page Preview */}
  <div className="w-1/2 flex flex-col items-center">
    {pages.length > 0 ? (
      <>
        <PaginationControls 
          currentPage={currentPage} 
          totalPages={pages.length} 
          onPageChange={setCurrentPage} 
        />
        <div className="flex-1 overflow-auto">
          <Page 
            content={
              <Editor
                editorState={EditorState.createWithContent(pages[currentPage - 1].contentState)}
                onChange={() => {}}
                readOnly={true}
                blockRendererFn={mediaBlockRenderer}
                customStyleMap={styleMap}
                blockStyleFn={myBlockStyleFn}
              />
            } 
            pageNumber={currentPage} 
            totalPages={pages.length} 
          />
        </div>
      </>
    ) : (
      <div className="flex items-center justify-center h-full text-gray-500">
        Start typing to see page preview
      </div>
    )}
  </div>
</div>

  );
};

// ===== Image Renderer =====
const ImageComponent = (props) => {
  const { src } = props.contentState.getEntity(props.block.getEntityAt(0)).getData();
  return <img src={src} alt="Inserted" className="my-2 max-w-full rounded max-h-[300px] object-contain" />;
};

// Add print styles
const printStyles = `
  @media print {
    body * {
      visibility: hidden;
    }
    .print-view, .print-view * {
      visibility: visible;
    }
    .print-view {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
    }
    .print-view > div {
      page-break-after: always;
    }
  }
`;

// Inject print styles
const styleSheet = document.createElement("style");
styleSheet.innerText = printStyles;
document.head.appendChild(styleSheet);

export default Canva;
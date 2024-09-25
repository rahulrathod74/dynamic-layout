import React, { useState, useEffect } from "react";
import { DndContext, useDraggable, useDroppable } from "@dnd-kit/core";
import './dynamic.css'

const controls = [
  { id: "textbox", content: "Text Box" },
  { id: "button", content: "Button" },
  { id: "image", content: "Image" },
];

const DroppableArea = ({ id, children }) => {
  const { setNodeRef } = useDroppable({ id });
  return <div ref={setNodeRef} className="droppable-area">{children}</div>;
};

const DraggableControl = ({ id, content }) => {
  const { setNodeRef, listeners, attributes, transform } = useDraggable({ id });
  const style = {
    transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : undefined,
  };
  return (
    <div
      ref={setNodeRef}
      style={style}
      className="draggable"
      {...listeners}
      {...attributes}
    >
      {content}
    </div>
  );
};

const DynamicLayout = () => {
  const [layout, setLayout] = useState([]);

  useEffect(() => {
    const savedLayout = localStorage.getItem("layout");
    if (savedLayout) {
      setLayout(JSON.parse(savedLayout));
    }
  }, []);

  const handleDragEnd = (event) => {
    const { over, active } = event;
    if (over) {
      setLayout((prev) => [...prev, active.id]);
    }
  };

  const saveLayout = () => {
    localStorage.setItem("layout", JSON.stringify(layout));
    alert("Layout saved successfully!");
  };

  const loadLayout = () => {
    const savedLayout = localStorage.getItem("layout");
    if (savedLayout) {
      setLayout(JSON.parse(savedLayout));
    } else {
      alert("No layout found!");
    }
  };

  const publishLayout = () => {
    const newWindow = window.open();
    const layoutHtml = layout
      .map((controlId) => {
        if (controlId === "textbox") return "<div>Text Box</div>";
        if (controlId === "button") return "<button>Button</button>";
        if (controlId === "image") return '<img src="placeholder.jpg" alt="Image" />';
        return "";
      })
      .join("");
    newWindow.document.write(layoutHtml);
    newWindow.document.close();
  };

  return (
    <div className="layout-container">
      <div className="control-panel">
        <h3>Available Controls</h3>
        {controls.map((control) => (
          <DraggableControl key={control.id} id={control.id} content={control.content} />
        ))}
      </div>

      <DndContext onDragEnd={handleDragEnd}>
        <DroppableArea id="droppable">
          <h3>Dynamic Page Layout</h3>
          {layout.map((controlId, index) => (
            <div key={index}>
              {controlId === "textbox" && <div>Text Box</div>}
              {controlId === "button" && <button>Button</button>}
              {controlId === "image" && <img src="placeholder.jpg" alt="Image" />}
            </div>
          ))}
          <div className="action-buttons">
        <button onClick={saveLayout}>Save Layout</button>
        <button onClick={loadLayout}>Load Layout</button>
        <button onClick={publishLayout}>Publish</button>
      </div>
        </DroppableArea>
        
      </DndContext>

      
    </div>
  );
};

export default DynamicLayout;

import React from "react";
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";

const Draggable = (props: { id: string; children: React.ReactNode }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: props.id,
  });
  const style = {
    // Outputs `translate3d(x, y, 0)`
    transform: CSS.Translate.toString(transform),
  };

  return (
    <button ref={setNodeRef} style={style} {...listeners} {...attributes}>
      {props.children}
    </button>
  );
};

interface DragDivProps {
    id: string;
    content: string;
    type: null;
  }

// make dragdiv extend from draggable
export const DragDiv = ({ content, id }: DragDivProps) => {
    return (
        <Draggable id={id}>
        <div className="draggable border-2 border-black rounded-xl p-4 m-4">
            <p className="text-black text-2xl font-bold text-center">{content}</p>
        </div>
        </Draggable>
    );
};

export default Draggable;

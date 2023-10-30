"use client";
import Image from "next/image";
import CodeButtons from "./components/CodeButtons";

// interface ContentItem {
//   id: string;
//   content: string;
// }

export default function Page() {
  // const [contents, setContents] = useState<ContentItem[]>([
  //   { id: "draggable-1", content: "Drag me 1" },
  //   { id: "draggable-2", content: "Drag me 2" },
  //   { id: "draggable-3", content: "Drag me 3" },
  //   { id: "draggable-4", content: "Drag me 4" },
  //   { id: "draggable-5", content: "Drag me 5" },
  // ]);
  // const [droppedContent, setDroppedContent] = useState("");
  // const [droppedId, setDroppedId] = useState("");

  // const handleDragEnd = ({ over, active }: any) => {
  //   if (over?.id === "droppable") {
  //     // use id to search content in contents
  //     const activeContent = contents.find((item) => item.id === active.id);

  //     // remove the draggable- prefix
  //     const activeId = active.id.replace("draggable-", "");

  //     setDroppedId(activeId);
  //     setDroppedContent(activeContent?.content || "");
  //   } else {
  //     setDroppedId("");
  //     setDroppedContent("");
  //   }
  // };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="header z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
          Get started by editing&nbsp;
          <code className="font-mono font-bold">src/app/page.tsx</code>
        </p>
        <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
          <a
            className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0"
            href="https://vercel.com?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            By{" "}
            <Image
              src="/vercel.svg"
              alt="Vercel Logo"
              className="dark:invert"
              width={100}
              height={24}
              priority
            />
          </a>
        </div>
      </div>

      {/* //TODO: Implement drag/drop function later*/}
      {/* divide the main into 2 column with width ratio is 3/7 */}
      {/* <div className="main grid w-full max-w-5xl grid-rows-10 grid-cols-3 gap-4">
        <DndContext onDragEnd={handleDragEnd}>
          <div className="sidebar col-span-1 justify-center items-center bg-gray-100">
            <p className="text-black text-2xl font-bold text-center">Sidebar</p>
            {contents.map((item) => (
              <DragDiv
                id={item.id}
                content={item.content}
                key={item.id}
                type={null}
              />
            ))}
          </div>
          <div className="content col-span-2 justify-center items-center bg-gray-100">
            <p className="text-black text-2xl font-bold text-center">
              Main Content
            </p>


              <Droppable
                id="droppable"
                className="droppable border-2 border-black rounded-xl p-4 m-4 h-48"
              >
                <DragDiv id={droppedId} content={droppedContent} type={null} />
              </Droppable>
          </div>
        </DndContext>
      </div> */}

      {/* //* This is static, non-interactive buttons */}
      <div className="main grid w-full max-w-5xl grid-rows-10 grid-cols-3 gap-4">
      
          <div className="sidebar col-span-1 justify-center items-center bg-gray-100">
            <p className="text-black text-2xl font-bold text-center">Sidebar</p>
            <CodeButtons />
          </div>

          <div className="content col-span-2 justify-center items-center bg-gray-100">
            <p className="text-black text-2xl font-bold text-center">
              Main Content
            </p>

          </div>

      </div>

      <div className="footer mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0">
        <div className="flex flex-col items-center justify-center">Footer</div>
      </div>
    </main>
  );
}

"use client";
import Image from 'next/image';
// import { Draggable, Droppable } from '@shopify/draggable';

// create a component here
const DragDiv = ({ content }: { content: string }) => {
  return (
    <div className="draggable border-2 border-black rounded-xl p-4 m-4">
      <p className="text-black text-2xl font-bold text-center">{content}</p>
    </div>
  );
};

export default function Home() {
  const contents = ['Drag me 1', 'Drag me 2', 'Drag me 3', 'Drag me 4', 'Drag me 5'];

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
            By{' '}
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

      {/* divide the main into 2 column with width ratio is 3/7 */}
      <div className="main grid w-full max-w-5xl grid-rows-10 grid-cols-3 gap-4">
        <div className="sidebar col-span-1 justify-center items-center bg-gray-100">
          <p className="text-black text-2xl font-bold text-center">Sidebar</p>
          {
            contents.map((content, index) => (
              <DragDiv content={content} key={index} />
            ))
          }

        </div>
        <div className="content col-span-2 justify-center items-center bg-gray-100">
          <p className="text-black text-2xl font-bold text-center">Main Content</p>
        </div>
      </div>

      <div className="footer mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0">
        <div className="flex flex-col items-center justify-center">
          Footer
        </div>
      </div>
    </main>
  )
}

"use client";
import Image from 'next/image';
import { Draggable, Droppable } from '@shopify/draggable';

export default function Home() {
  const droppable = new Droppable(document.querySelectorAll('.main'), {
    draggable: '.draggable',
    dropzone: '.drop-div',
  });

  droppable.on('droppable:dropped', (event) => {
    console.log('dropped');
  });

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

      <div className="main relative flex place-items-center before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full">
        <div className="draggable w-fit h-fit bg-gradient-radial rounded-sm shadow-lg bg-red-400">
          This div is draggable
        </div>

        <div className="drop-div w-fit h-fit bg-gradient-radial rounded-sm shadow-lg bg-blue-400">
          This div is dropzone
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

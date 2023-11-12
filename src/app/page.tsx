import CodeUI from "./components/CodeUI";

export default function Page() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {/* <div className="header z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
      </div> */}
      <div className="main w-full h-full">
        <CodeUI />
      </div>

      {/* <div className="footer mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0">
        <div className="flex flex-col items-center justify-center">Footer</div>
      </div> */}
    </main>
  );
}

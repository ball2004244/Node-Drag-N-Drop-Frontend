const outputFormatter = (output: string) => {
  // process \n
  try {
    const lines = output.split("\n");
    const formattedOutput = lines.map((line, index) => {
      return (
        <span key={index}>
          {line}
          <br />
        </span>
      );
    });

    return formattedOutput;
  } catch (err: Error | any) {
    return output;
  }
};

interface ConsoleProps {
  status: string;
  stdout: string;
  stderr: string;
  currentConsole: string;
  height?: string;
}

const Console = ({ status, stdout, stderr, currentConsole, height }: ConsoleProps) => {
  if (!height) height = "32rem";
  const heightStyle = `h-[${height}]`;
  const consoleStyle = `console flex flex-col gap-2 flex-row bg-black dark:bg-gray-800 rounded-xl w-full ${heightStyle} p-6 my-4 wrap overflow-auto break-all`
  return (
    <div className={consoleStyle}>
      <h2 className="text-2xl text-white mb-2 font-bold">{currentConsole}</h2>
      <h3 className="text-xl text-white m-1">
        <span className="font-semibold">Status:</span> {status}
      </h3>
      <h3 className="text-xl text-white m-1">
        <span className="font-semibold">Stdout:</span> {outputFormatter(stdout)}
      </h3>
      <h3 className="text-xl text-white m-1">
        <span className="font-semibold">Stderr:</span> {outputFormatter(stderr)}
      </h3>
    </div>
  );
};

const ConsoleUI = ({
  status,
  stdout,
  stderr,
  currentConsole,
  height,
}: ConsoleProps) => {
  return (
    <Console
      status={status}
      stdout={stdout}
      stderr={stderr}
      currentConsole={currentConsole}
      height={height}
    />
  );
};
export default ConsoleUI;

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
}

const Console = ({ status, stdout, stderr, currentConsole }: ConsoleProps) => {
  return (
    <div className="console flex flex-col gap-2 flex-row bg-black dark:bg-gray-800 rounded-xl w-full lg:min-h-[32rem] h-[14rem] p-6 wrap overflow-auto break-all">
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
}: ConsoleProps) => {
  return (
    <Console
      status={status}
      stdout={stdout}
      stderr={stderr}
      currentConsole={currentConsole}
    />
  );
};
export default ConsoleUI;

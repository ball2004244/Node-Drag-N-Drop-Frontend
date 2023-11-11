const API_URL: string =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:9000";

const getRoot = async () => {
  try {
    const url = `${API_URL}`;
    const req = await fetch(url);
    const res = await req.json();

    return res;
  } catch (err) {
    console.log(err);
    return err;
  }
};

/**
 * Sends Python code to the backend for execution.
 * @param code - The Python code to execute.
 * @param filename - The name of the file to create on the backend.
 * @returns A Promise that resolves to the response from the backend.
 */
const sendCode = async (code: object, filename: string = "code.py") => {
  try {
    const url = `${API_URL}/pyjson`;
    const data = {
      code: code,
      filename: filename,
    };

    const req = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const res = await req.json();

    return res;
  } catch (err) {
    console.log(err);
    return err;
  }
};

/**
 * Sends a command to the backend for execution.
 * @param command - The Unix command to execute.
 * @returns A Promise that resolves to the response from the backend.
 */
const sendCommand = async (command: object) => {
  try {
    const url = `${API_URL}/cli`;
    const req = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(command),
    });
    const res = await req.json();

    return res;
  } catch (err) {
    console.log(err);
    return err;
  }
};

/**
 * Gets the keywords for coding Python.
 * @returns A Promise that resolves to the response from the backend.
 */
const getConfig = async () => {
  try {
    const url = `${API_URL}/config`;
    const req = await fetch(url);
    const res = await req.json();

    return res;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export { getRoot, sendCode, sendCommand, getConfig };

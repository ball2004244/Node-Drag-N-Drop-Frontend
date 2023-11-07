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

const sendCode = async (code: object) => {
  try {
    const url = `${API_URL}`;
    const req = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(code),
    });
    const res = await req.json();

    return res;
  } catch (err) {
    console.log(err);
    return err;
  }
};

const sendCommand = async (command: object) => {
  try {
    const url = `${API_URL}/cli`
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
}
export { getRoot, sendCode, sendCommand };

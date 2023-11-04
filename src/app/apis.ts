const API_URL: string =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:9000";
const getRoot = async () => {
  try {
    const req = await fetch(API_URL);
    const res = await req.json();

    return res;
  } catch (err) {
    console.log(err);
    return err;
  }
};

const sendCode = async (code: object) => {
  try {
    console.log(API_URL);
    const req = await fetch(API_URL, {
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
export { getRoot, sendCode };

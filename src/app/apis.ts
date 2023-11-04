const getRoot = async () => {
  try {
    const req = await fetch("http://localhost:9000/");
    const res = await req.json();

    return res;
  } catch (err) {
    console.log(err);
    return err;
  }
};

const sendCode = async (code: object) => {
  try {
    const req = await fetch("http://localhost:9000/", {
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

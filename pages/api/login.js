import cookie from "cookie";

const handler = (req, res) => {
  if (req.method === "POST") {
    const { username, password } = req.body;
    console.log("Received credentials:", { username, password });
    console.log("Environment variables:", {
      ADMIN_USERNAME: process.env.ADMIN_USERNAME,
      ADMIN_PASSWORD: process.env.ADMIN_PASSWORD
    });
    
    if (
      username.trim() === process.env.ADMIN_USERNAME.trim() &&
      password.trim() === process.env.ADMIN_PASSWORD.trim()
    ) {
      res.setHeader(
        "Set-Cookie",
        cookie.serialize("token", process.env.TOKEN.trim(), {
          maxAge: 60 * 60,
          sameSite: "strict",
          path: "/",
        })
      );
      res.status(200).json("Successful");
    } else {
      res.status(400).json("Wrong Credentials!");
    }
  }
};

export default handler;

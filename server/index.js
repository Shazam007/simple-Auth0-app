const express = require("express");
const axios = require("axios");
const cors = require("cors");
var jwt = require("express-jwt");
var jwks = require("jwks-rsa");

const app = express();

app.use(cors());
app.use(express.json());

//apply the jwt authentication middleware
var jwtCheck = jwt({
  secret: jwks.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: "https://auth0shazam007.us.auth0.com/.well-known/jwks.json",
  }),
  audience: "http://localhost:4000/protected",
  issuer: "https://auth0shazam007.us.auth0.com/",
  algorithms: ["RS256"],
}).unless({ path: ["/normal"] });

app.use(jwtCheck);

//normal route without protecting --> need to mention in the end of the middlewear
app.get("/normal", (req, res) => {
  res.json({ status: "in normal" });
});

//protected route
app.get("/protected", async (req, res) => {
  //to get the user data from auth0 server using the recived token and axios
  const token = req.headers.authorization.split(" ")[1];
  const response = await axios.get(
    "https://auth0shazam007.us.auth0.com/userinfo",
    {
      headers: {
        authorization: `Bearer ${token}`,
      },
    }
  );
  console.log(response.data);
  res.json({ status: "in protected", user: response.data });
});

app.listen(4000, () => {
  console.log("listening on 4000");
});

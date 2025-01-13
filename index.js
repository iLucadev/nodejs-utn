import app from "./src/app.js";
import { PORT } from "./src/utils/config.js";

app.listen(PORT);
console.log("Server on port", PORT);

import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";
import { engine } from "express-handlebars";
import moment from "moment";
import AppConfig from "./config/AppConfig";
import connectDB from "./config/DB";
import router from "./routes/index.route";
import parseToken from "./middlewares/parseToken";
import chalk from "chalk";
var methodOverride = require("method-override");

const app = express();
app.use(methodOverride("_method"));

app.use(express.json());
app.use(express.static(path.join(__dirname + "/public")));

app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    credentials: true,
  })
);

app.use(cookieParser());

app.set("view engine", "hbs");
app.set("views", path.join(__dirname + "/views"));
app.engine(
  "hbs",
  engine({
    defaultLayout: "main",
    extname: ".hbs",
    helpers: {
      incremented: function (index) {
        index++;
        return index;
      },
      formatDate: function (timestamp: Date) {
        return moment(timestamp).format("YYYY-MM-DD HH:mm");
      },
      eq: function (arg1: any, arg2: any) {
        return arg1 == arg2;
      },
      isContain: function (array, element) {
        if (array && array.length > 0) return array.includes(element);
        return false;
      },
      convertArray: function (rating) {
        let a = [];
        for (let i = 0; i < rating; i++) {
          a.push(i);
        }
        return a;
      },
      getSubString(string: string, size: number) {
        return string.slice(0, size);
      },
    },
  })
);

app.use(parseToken);
app.use("/", router);

app.listen(AppConfig.PORT, async () => {
  console.log(
    chalk.green(`Server listening on http://localhost:${AppConfig.PORT}`)
  );
  await connectDB();
});

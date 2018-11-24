import ReactDOM from "react-dom";
import RouteConfig from "./routes/index";
import "./lib/css/style";

ReactDOM.render(
  { ...RouteConfig }
  ,
  document.getElementById('root')
);
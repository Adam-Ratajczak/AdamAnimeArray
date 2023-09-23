import Menubar from "../../widgets/Menubar";
import { Outlet } from "react-router-dom";

export default function Root() {
  return (
    <div id="main">
      <Menubar />
      <Outlet></Outlet>
    </div>
  );
}

import "./pages/General Setting"
import GeneralSetting from './pages/General Setting';
import AddUsers from "./pages/AddUser"
import UserTable from "./pages/UserTable";
import CarTypes from "./pages/CarTypes";
import AccountSetting from "./pages/AccountSettings";
function App() {
  return (
    <div className="grid grid-col-1 p-20 bg-gray-500" style={{height:"500vh"}}>
      <GeneralSetting/>
      <AccountSetting/>
      <AddUsers/>
      <UserTable/>
      <CarTypes/>
    </div>
  );
}

export default App;



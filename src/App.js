import "./pages/General Setting"
import AddUsers from "./pages/AddUser"
import UserTable from "./pages/UserTable";
import CarTypes from "./pages/CarTypes";
import AccountSetting from "./pages/AccountSettings";
function App() {
  const authToken='12|gauJBMil8TALikhxZiB8K35PjniNy2FdLtjAbm7T9556329d'
  return (
    <div className="grid grid-col-1 py-20 px-10" style={{height:"500vh"}}>
      <AccountSetting authToken= {authToken}/>
      <AddUsers authToken= {authToken}/>
      <UserTable authToken= {authToken}/>
      <CarTypes authToken= {authToken}/>
    </div>
  );
}

export default App;



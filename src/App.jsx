import { Navigate, Outlet, Route, Routes } from 'react-router'
import './App.css'
import Signup from './components/Signup'
import Signin from './components/Signin'
import Admin from './components/Admin'
import Adminpage from './components/Adminpage'
import Dashboard from './components/Dashboard'
import Narvarbar from './components/Narvarbar'
import Addaccountpage from './components/Addaccountpage'
import Changepassword from './components/Changepassword'
import Converter from './components/Converter'
import Referralpage from './components/Referralpage'
import Profilepage from './components/Profilepage'
import Withdrawalhistory from './components/Withdrawalhistory'
import Forgetpage from './components/Forgetpage'
import Emailpage from './components/Emailpage'
import Landingpage from './components/Landingpage'
import Notfound from './components/Notfound'
import Spinner from './components/Spinner'
import Puzzle from './components/puzzlegame/Puzzle'
import Puzzlehis from './components/puzzlegame/Puzzlehis'

function App() {

  let admintoken = localStorage.admintoken
  
  
  const DashboardLayout = () => {
    let token = localStorage.token
    return (
      <Routes>
        <Route path='dashboard/' element={token ? <Outlet /> : <Navigate to={'/login'} />}>
          <Route path="" element={<Dashboard />} />
        </Route>
      </Routes>
    )
  }


  return (
    <>
      <Routes basename="/my-app">
        <Route path='/' element={<Landingpage />} />
        <Route path='signup' element={<Signup />} />
        <Route path='login' element={<Signin />} />
        <Route path='/admin' element={<Admin />} />
        <Route path='/adminpage' element={<Adminpage />} />
        <Route path='/*' element={<DashboardLayout/>} />
        <Route path='addaccount' element={<Addaccountpage />} />
        <Route path='changepassword' element={<Changepassword />} />
        <Route path='converter' element={<Converter />} />
        <Route path='referral' element={<Referralpage />} />
        <Route path='profile' element={<Profilepage />} />
        <Route path='navbar' element={<Narvarbar />} />
        <Route path='forgetpassword' element={<Forgetpage />} />
        <Route path='withdrawalhistory' element={<Withdrawalhistory />} />
        <Route path='emailpage' element={<Emailpage />} />
        <Route path='spinner' element={<Spinner />} />
        <Route path='puzzle' element={<Puzzle/>}/>
        <Route path='puzzlehis' element={<Puzzlehis/>} />
        <Route path='*' element={<Notfound />} />
      </Routes>

    </>
  )
}

export default App

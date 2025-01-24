/* eslint-disable no-unused-vars */
import { Navigate, Route, Routes } from "react-router-dom"
import { useQuery } from "@tanstack/react-query";
import { getProfile } from "../services/user";

import AuthPage from "../pages/AuthPage";
import HomePage from "../pages/HomePage";
import DashboardPage from "../pages/DashboardPage";
import AdminPage from "../pages/AdminPage";
import PageNotFound from "../pages/404";
import Loader from "../components/modules/loader";
import UserListPage from "../pages/UserListPage";


function Router() {
  const {data, isLoading, error} = useQuery({queryKey: ["profile"],queryFn: getProfile});
  
  if (isLoading) return <Loader/>
  
  return (
    <Routes>
        <Route index element={<HomePage/>}/>
        <Route path="/dashboard" element={data ? <DashboardPage/> : <Navigate to="/auth"/>}/>
        <Route path="/my_list" element={data ? <UserListPage/> : <Navigate to="/auth"/>}/>
        <Route path="/auth" element={data ?<Navigate to="/dashboard"/> :<AuthPage/>}/>
        <Route path="/admin" element={data && data.data.role === "ADMIN" ? <AdminPage/> : <Navigate to="/" />}/>
        <Route path="*" element={<PageNotFound/>}/>
        {/* <Route index element={<HomePage/>}/>
        <Route path="/dashboard" element={<DashboardPage/>}/>
        <Route path="/auth" element={<AuthPage/>}/>
        <Route path="/admin" element={<AdminPage/>}/>
        <Route path="*" element={<PageNotFound/>}/> */}
    </Routes>
  )
}

export default Router
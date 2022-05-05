import React from "react";
import { Routes, Route } from "react-router-dom";
import { useQuery } from "react-query";

import AdminLayout from "./layouts/AdminLayout";
import Dashboard from "./components/Dashboard";
import ButtonDemo from "./components/ButtonDemo";
import ChartDemo from "./components/ChartDemo";
import Documentation from "./components/Documentation";
import FileDemo from "./components/FileDemo";
import FloatLabelDemo from "./components/FloatLabelDemo";
import FormLayoutDemo from "./components/FormLayoutDemo";
import InputDemo from "./components/InputDemo";
import ListDemo from "./components/ListDemo";
import MenuDemo from "./components/MenuDemo";
import MessagesDemo from "./components/MessagesDemo";
import MiscDemo from "./components/MiscDemo";
import OverlayDemo from "./components/OverlayDemo";
import MediaDemo from "./components/MediaDemo";
import PanelDemo from "./components/PanelDemo";
import TableDemo from "./components/TableDemo";
import TreeDemo from "./components/TreeDemo";
import InvalidStateDemo from "./components/InvalidStateDemo";
import BlocksDemo from "./components/BlocksDemo";
import IconsDemo from "./components/IconsDemo";

import Crud from "./pages/Crud";
import EmptyPage from "./pages/EmptyPage";
import TimelineDemo from "./pages/TimelineDemo";
import CreateAllowanceClaim from "./pages/CreateAllowanceClaim";
import ViewAllAllowanceClaim from "./pages/ViewAllAllowanceClaim";
import ViewAllowanceRateConfiguration from "./pages/ViewAllowanceRateConfiguration";
import ProtectedRoute from "./pages/ProtectedRoute";
import Unauthorized from "./pages/Unauthorized";
import Error from "./pages/Error";

// import PublicLayout from "./layouts/PublicLayout";
import Login from "./pages/Login";

import { AuthProvider } from "./context/AuthContext";

const App = () => {
    return (
        <AuthProvider>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/" element={<AdminLayout />}>
                    <Route
                        index
                        element={
                            <ProtectedRoute>
                                <Dashboard />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/createAllowanceClaim"
                        element={
                            <ProtectedRoute roles={["Teacher"]}>
                                <CreateAllowanceClaim />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/viewAllAllowanceClaim"
                        element={
                            <ProtectedRoute roles={["Admin", "Teacher"]}>
                                <ViewAllAllowanceClaim />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/viewAllAllowanceRate"
                        element={
                            <ProtectedRoute roles={["Admin"]}>
                                <ViewAllowanceRateConfiguration />
                            </ProtectedRoute>
                        }
                    />
                    <Route path="/unauthorized" element={<Unauthorized />} />

                    {/*    <Route path="/formlayout" element={<FormLayoutDemo />} />
                    <Route path="/input" element={<InputDemo />} />
                    <Route path="/floatlabel" element={<FloatLabelDemo />} />
                    <Route path="/invalidstate" element={<InvalidStateDemo />} />
                    <Route path="/button" element={<ButtonDemo />} />
                    <Route path="/table" element={<TableDemo />} />
                    <Route path="/list" element={<ListDemo />} />
                    <Route path="/tree" element={<TreeDemo />} />
                    <Route path="/panel" element={<PanelDemo />} />
                    <Route path="/overlay" element={<OverlayDemo />} />
                    <Route path="/media" element={<MediaDemo />} />
                    <Route path="/menu" element={<MenuDemo />} />
                    <Route path="/messages" element={<MessagesDemo />} />
                    <Route path="/blocks" element={<BlocksDemo />} />
                    <Route path="/icons" element={<IconsDemo />} />
                    <Route path="/file" element={<FileDemo />} />
                    <Route path="/chart" element={<ChartDemo />} />
                    <Route path="/misc" element={<MiscDemo />} />
                    <Route path="/timeline" element={<TimelineDemo />} />
                    <Route path="/crud" element={<Crud />} />
                    <Route path="/empty" element={<EmptyPage />} />
                    <Route path="/documentation" element={<Documentation />} /> */}
                </Route>
                <Route path="*" element={<Error />} />
            </Routes>
        </AuthProvider>
    );
};

export default App;

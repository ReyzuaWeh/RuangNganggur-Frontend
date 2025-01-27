import { RoleType } from "@/dataType/khusus";
import SidebarJobseeker from "@components/Sidebar";
import SidebarEmployer from "@components/SidebarEmployer";
import { useMyProfile } from "@provider/userProvider";
import React from "react";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
    const { profile } = useMyProfile()
    return (
        <div className="flex h-fit flex-col lg:flex-row">
            {profile?.role === RoleType.jobseeker && <SidebarJobseeker />}
            {profile?.role === RoleType.employer && <SidebarEmployer />}
            <section className="py-8 px-7 w-full min-h-screen">{children}</section>
        </div>
    );
};

export default DashboardLayout;

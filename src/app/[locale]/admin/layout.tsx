import { AdminSidebarItems } from "@/components/constants/Constants";
import Sidebar from "@/components/templates/admin/Sidebar";

function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <section className="px-[5%] py-16">
      <div className="grid h-screen transition-colors duration-400 grid-cols-1 md:grid-cols-[15rem_1fr] border border-snow/20 rounded mt-10">
        {/* Sidebar */}
        <Sidebar items={AdminSidebarItems} />

        {/* Main Content */}
        <div className="p-8 overflow-y-auto  md:pb-8 pb-[env(safe-area-inset-bottom)]">
          <div className="mx-auto max-w-5xl flex flex-col gap-y-12">
            {children}
          </div>
        </div>
      </div>
    </section>
  );
}

export default AdminLayout;

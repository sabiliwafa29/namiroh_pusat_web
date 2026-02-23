import Sidebar from './Sidebar'
import Navbar from './Navbar'

export default function Layout({ children, title }) {
  return (
    <div className="flex h-screen overflow-hidden bg-gray-100">
      <Sidebar />
      <main className="ml-64 flex-1 overflow-y-auto">
        <Navbar title={title} />
        <div className="p-6">
          {children}
        </div>
      </main>
    </div>
  )
}

import OrgChart from "./components/OrgChart";

function App() {
  return (
    <main className="min-h-screen  p-4">
      <h1 className="text-3xl font-bold text-center mb-2">
        Organization Chart
      </h1>
      <p className="text-gray-600 text-center mb-6">Company hierarchy</p>
      <OrgChart />
    </main>
  );
}


export default App;

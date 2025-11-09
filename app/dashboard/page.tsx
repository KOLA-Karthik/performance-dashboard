import { DataProvider } from "../../components/providers/DataProvider";
import PerformanceMonitor from "../../components/ui/PerformanceMonitor";
import FilterPanel from "../../components/controls/FilterPanel";
import TimeRangeSelector from "../../components/controls/TimeRangeSelector";
import LineChart from "../../components/charts/LineChart";
import BarChart from "../../components/charts/BarChart";
import ScatterPlot from "../../components/charts/ScatterPlot";
import Heatmap from "../../components/charts/Heatmap";
import DataTable from "../../components/ui/DataTable";
import { generateInitialDataset } from "../../lib/dataGenerator";
import ClientRunner from "./runner";

export default async function DashboardPage(){
  const initialData = generateInitialDataset(12000);
  return (
    <DataProvider initialData={initialData}>
      <h1 style={{marginBottom:8}}>Real-time Performance Dashboard</h1>
      <ClientRunner/>
      <div className="grid grid-2">
        <div className="card"><h3>Line</h3><LineChart/></div>
        <div className="card"><h3>Scatter</h3><ScatterPlot/></div>
        <div className="card"><h3>Bar</h3><BarChart/></div>
        <div className="card"><h3>Heatmap</h3><Heatmap/></div>
      </div>
      <div className="grid grid-2" style={{marginTop:12}}>
        <FilterPanel/>
        <PerformanceMonitor/>
      </div>
      <div style={{marginTop:12}}><TimeRangeSelector/></div>
      <div style={{marginTop:12}}><DataTable/></div>
    </DataProvider>
  );
}

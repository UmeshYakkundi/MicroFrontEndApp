import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit, OnDestroy {

  constructor() {
    DetailsComponent.compContext = this;
  }

  static compContext: any;
  static systems: any[] = [];

    showChart = true;
    chart: any;
    timeout:any = null;

  details: any;
  dpChartOptions = {
    animationEnabled: true,
    data: [{
      type: "doughnut",
      yValueFormatString: "#,###.##'%'",
      indexLabel: "{name}",
      indexLabelPlacement: "inside",
      dataPoints: [
        { y: 25, name: "" },
        { y: 25, name: "" },
        { y: 25, name: "" },
        { y: 25, name: "" }
      ]
    }]
  };

  powerChartOptions = {
    animationEnabled: true,
    toolTip: {
      shared: true
    },
    legend: {
      cursor: "pointer",
      itemclick: function (e: any) {
        if (typeof (e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
          e.dataSeries.visible = false;
        }
        else {
          e.dataSeries.visible = true;
        }
        e.chart.render();
      }
    },
    data: [{
      type: "column",
      name: "Power consumed (kWatts)",
      legendText: "Power consumed (kWatts)",
      showInLegend: true,
      dataPoints: [
        { label: "Sun", y: 262 },
        { label: "Mon", y: 211 },
        { label: "Tue", y: 175 },
        { label: "Wed", y: 137 },
        { label: "Thu", y: 97.8 },
        { label: "Fri", y: 115 },
        { label: "Sat", y: 104 }
      ]
    }, {
      type: "column",
      name: "CO2e Emissions (kilos)",
      legendText: "CO2e Emissions (kilos)",
      axisYType: "secondary",
      showInLegend: true,
      dataPoints: [
        { label: "Sun", y: 11.15 },
        { label: "Mon", y: 2.5 },
        { label: "Tue", y: 3.6 },
        { label: "Wed", y: 4.2 },
        { label: "Thu", y: 2.6 },
        { label: "Fri", y: 2.7 },
        { label: "Sat", y: 3.1 }
      ]
    }]
  }

  // these values will be passed from container
  deviceName: string = "apm00145042834";
  hostName: string = "matacan.storage.tucson.ibm.com";
  driveName: string = "shrimp8";
  volumeName: string = "vol0";
  diskName: string = "disk1";
  capacity: number = 1024;
  formattedCapacity = "125B";

  // these values would need to be generated randomly
  advisoryCount: number = this.rand(9, 3);
  alertsCount: number = this.rand(6, 3);
  ticketsCount: number = this.rand(8, 3);

  criticalCount: number = this.rand(this.advisoryCount - 2, 1);
  warningsCount: number = this.rand(this.alertsCount, 1);
  todaysCount: number = this.rand(this.ticketsCount, 1);

  availablePct = this.rand(25, 10);
  savingsPct = this.rand(20, 5);
  reclaimablePct = this.rand(20, 5);

  flashCopyPct = this.rand(20, 5);
  unprotectedPct = this.rand(20, 5);
  asyncReplPct = this.rand(50, 5);
  syncReplPct = 100 - this.flashCopyPct - this.unprotectedPct - this.asyncReplPct;

  // co2 emissions
  todayCo2 = this.rand(2000, 1000); // 1000 - 2000
  todayCo2ChangePct = this.rand(1, 0) > 0 ? this.rand(1, 10) : this.rand(1, 10) * (-1);

  sunCo2 = this.rand(2000, 1000);
  monCo2 = this.rand(2000, 1000);
  tueCo2 = this.rand(2000, 1000);
  wedCo2 = this.rand(2000, 1000);
  thuCo2 = this.rand(2000, 1000);
  friCo2 = this.rand(2000, 1000);
  satCo2 = this.rand(2000, 1000);

  // wattage / power consumed

  sunWatt = this.rand(2000, 1000);
  monWatt = this.rand(2000, 1000);
  tueWatt = this.rand(2000, 1000);
  wedWatt = this.rand(2000, 1000);
  thuWatt = this.rand(2000, 1000);
  friWatt = this.rand(2000, 1000);
  satWatt = this.rand(2000, 1000);


  // these values have to be calculated
  availableSizeInBytes = 0;
  formattedAvailableSize = '15GB';
  usedPct = 85;

  flashCopyVal = 10;
  asyncReplVal = 10;
  syncReplVal = 10;
  unprotectedVal = 10;


  public ngOnInit(): void {
    document.addEventListener('app-component-event', this.handleEventData, { capture: true });
  }

  public ngOnDestroy(): void {
    document.removeEventListener('app-component-event', this.handleEventData);
  }

  handleEventData(e: any) {
    if (!DetailsComponent.compContext.details || DetailsComponent.compContext.details.id !== e.detail.id) {
      DetailsComponent.compContext.details = e.detail;
      DetailsComponent.compContext.deviceName = e.detail.name;

      let system: any = {};
      // if the system was never visited before, cache the system, else get it from cache store
      if (!DetailsComponent.systems[e.detail.id]) {
        system.deviceName = e.detail.name;
        system.driveName = e.detail.driveName;
        system.hostName = e.detail.hostName;
        system.nodeName = e.detail.nodeName;
        system.volumeName = e.detail.volumeName;
        system.diskName = e.detail.diskName;
        system.formattedCapacity = e.detail.capacity;
        system.capacity = DetailsComponent.compContext.getCapacityInBytes(e.detail.capacity);

        // randomly generate different details
        //---------------------------------------------------------

        // these values would need to be generated randomly
        // notification values
        system.advisoryCount = DetailsComponent.compContext.rand(9, 3);
        system.alertsCount = DetailsComponent.compContext.rand(6, 3);
        system.ticketsCount = DetailsComponent.compContext.rand(8, 3);
        system.criticalCount = DetailsComponent.compContext.rand(DetailsComponent.compContext.advisoryCount - 2, 1);
        system.warningsCount = DetailsComponent.compContext.rand(DetailsComponent.compContext.alertsCount-2, 1);
        system.todaysCount = DetailsComponent.compContext.rand(DetailsComponent.compContext.ticketsCount-2, 1);
        // storage vals
        system.availablePct = DetailsComponent.compContext.rand(25, 10);
        system.savingsPct = DetailsComponent.compContext.rand(20, 5);
        system.reclaimablePct = DetailsComponent.compContext.rand(20, 5);
        system.flashCopyPct = DetailsComponent.compContext.rand(20, 5);
        system.unprotectedPct = DetailsComponent.compContext.rand(20, 5);
        system.asyncReplPct = DetailsComponent.compContext.rand(50, 5);
        system.syncReplPct = 100 - DetailsComponent.compContext.flashCopyPct - DetailsComponent.compContext.unprotectedPct - DetailsComponent.compContext.asyncReplPct;
        // co2 emissions
        system.todayCo2 = DetailsComponent.compContext.rand(2000, 1000); // 1000 - 2000
        system.todayCo2ChangePct = DetailsComponent.compContext.rand(1, 0) > 0 ? DetailsComponent.compContext.rand(1, 10) : DetailsComponent.compContext.rand(1, 10) * (-1);
        system.sunCo2 = DetailsComponent.compContext.rand(2000, 1000);
        system.monCo2 = DetailsComponent.compContext.rand(2000, 1000);
        system.tueCo2 = DetailsComponent.compContext.rand(2000, 1000);
        system.wedCo2 = DetailsComponent.compContext.rand(2000, 1000);
        system.thuCo2 = DetailsComponent.compContext.rand(2000, 1000);
        system.friCo2 = DetailsComponent.compContext.rand(2000, 1000);
        system.satCo2 = DetailsComponent.compContext.rand(2000, 1000);
        // wattage / power consumed
        system.sunWatt = DetailsComponent.compContext.rand(2000, 1000);
        system.monWatt = DetailsComponent.compContext.rand(2000, 1000);
        system.tueWatt = DetailsComponent.compContext.rand(2000, 1000);
        system.wedWatt = DetailsComponent.compContext.rand(2000, 1000);
        system.thuWatt = DetailsComponent.compContext.rand(2000, 1000);
        system.friWatt = DetailsComponent.compContext.rand(2000, 1000);
        system.satWatt = DetailsComponent.compContext.rand(2000, 1000);

        // these values have to be calculated
        system.availableSizeInBytes = Math.floor(system.capacity * (system.availablePct / 100));

        system.flashCopyVal = Math.floor(system.capacity * (system.flashCopyPct / 100));
        system.asyncReplVal = Math.floor(system.capacity * (system.asyncReplPct / 100));
        system.syncReplVal = Math.floor(system.capacity * (system.syncReplPct / 100));
        system.unprotectedVal = Math.floor(system.capacity * (system.unprotectedPct / 100));
        system.formattedAvailableSize = DetailsComponent.compContext.getFormattedCapacity(system.availableSizeInBytes);

        //----------------------------------------------------------
        // store the system in cache
        DetailsComponent.systems[e.detail.id] = system;
      } else {
        system = DetailsComponent.systems[e.detail.id];
      }

      // set different component scoped variables of the system

      DetailsComponent.compContext.deviceName = system.deviceName;
      DetailsComponent.compContext.driveName = system.driveName;
      DetailsComponent.compContext.hostName = system.hostName;
      DetailsComponent.compContext.nodeName = system.nodeName;
      DetailsComponent.compContext.volumeName = system.volumeName;
      DetailsComponent.compContext.diskName = system.diskName;
      DetailsComponent.compContext.capacity = system.capacity;
      DetailsComponent.compContext.formattedCapacity = system.formattedCapacity;
      // notification values
      DetailsComponent.compContext.advisoryCount = system.advisoryCount;
      DetailsComponent.compContext.alertsCount = system.alertsCount;
      DetailsComponent.compContext.ticketsCount = system.ticketsCount;
      DetailsComponent.compContext.criticalCount = system.criticalCount;
      DetailsComponent.compContext.warningsCount = system.warningsCount;
      DetailsComponent.compContext.todaysCount = system.todaysCount;
      // storage vals
      DetailsComponent.compContext.availablePct = system.availablePct;
      DetailsComponent.compContext.savingsPct = system.savingsPct;
      DetailsComponent.compContext.reclaimablePct = system.reclaimablePct;
      DetailsComponent.compContext.flashCopyPct = system.flashCopyPct;
      DetailsComponent.compContext.unprotectedPct = system.unprotectedPct;
      DetailsComponent.compContext.asyncReplPct = system.asyncReplPct;
      DetailsComponent.compContext.syncReplPct = system.syncReplPct;
      // co2 emissions
      DetailsComponent.compContext.todayCo2 = system.todayCo2;
      DetailsComponent.compContext.todayCo2ChangePct = system.todayCo2ChangePct;
      DetailsComponent.compContext.sunCo2 = system.sunCo2;
      DetailsComponent.compContext.monCo2 = system.monCo2;
      DetailsComponent.compContext.tueCo2 = system.tueCo2;
      DetailsComponent.compContext.wedCo2 = system.wedCo2;
      DetailsComponent.compContext.thuCo2 = system.thuCo2;
      DetailsComponent.compContext.friCo2system.friCo2;
      DetailsComponent.compContext.satCo2 = system.satCo2;
      // wattage / power consumed
      DetailsComponent.compContext.sunWatt = system.sunWatt;
      DetailsComponent.compContext.monWatt = system.monWatt;
      DetailsComponent.compContext.tueWatt = system.tueWatt;
      DetailsComponent.compContext.wedWatt = system.wedWatt;
      DetailsComponent.compContext.thuWatt = system.thuWatt;
      DetailsComponent.compContext.friWatt = system.friWatt;
      DetailsComponent.compContext.satWatt = system.satWatt;
      // these values were calculated
      DetailsComponent.compContext.availableSizeInBytes = system.availableSizeInBytes;
      DetailsComponent.compContext.flashCopyVal = system.flashCopyVal;
      DetailsComponent.compContext.asyncReplVal = system.asyncReplVal;
      DetailsComponent.compContext.syncReplVal = system.syncReplVal;
      DetailsComponent.compContext.unprotectedVal = system.unprotectedVal;
      DetailsComponent.compContext.formattedAvailableSize = system.formattedAvailableSize;
      DetailsComponent.compContext.usedPct = 100 - DetailsComponent.compContext.availablePct;
      
      const dPoints = [
        { y: DetailsComponent.compContext.flashCopyPct, name: "" },
        { y: DetailsComponent.compContext.asyncReplPct, name: "" },
        { y: DetailsComponent.compContext.syncReplPct, name: "" },
        { y: DetailsComponent.compContext.unprotectedPct, name: "" }
      ];
      DetailsComponent.compContext.dpChartOptions.data[0].dataPoints = dPoints;

      const pDataPoints1 = [
        { label: "Sun", y: DetailsComponent.compContext.sunCo2 },
        { label: "Mon", y: DetailsComponent.compContext.monCo2 },
        { label: "Tue", y: DetailsComponent.compContext.tueCo2 },
        { label: "Wed", y: DetailsComponent.compContext.wedCo2 },
        { label: "Thu", y: DetailsComponent.compContext.thuCo2 },
        { label: "Fri", y: DetailsComponent.compContext.friCo2 },
        { label: "Sat", y: DetailsComponent.compContext.satCo2 }
      ];
      const pDataPoints2 = [
        { label: "Sun", y: DetailsComponent.compContext.sunWatt },
        { label: "Mon", y: DetailsComponent.compContext.monWatt },
        { label: "Tue", y: DetailsComponent.compContext.tueWatt },
        { label: "Wed", y: DetailsComponent.compContext.wedWatt },
        { label: "Thu", y: DetailsComponent.compContext.thuWatt },
        { label: "Fri", y: DetailsComponent.compContext.friWatt },
        { label: "Sat", y: DetailsComponent.compContext.satWatt }
      ];
      DetailsComponent.compContext.powerChartOptions.data[0].dataPoints = pDataPoints1;
      DetailsComponent.compContext.powerChartOptions.data[0].dataPoints = pDataPoints2;

      DetailsComponent.compContext.showChart  =false;
      setTimeout(()=>{DetailsComponent.compContext.showChart = true;}, 500);

    }


  }


  // input like "15GB"
  getCapacityInBytes(capacity: string) {
    type Units = { [key: string]: string };
    const units: Units = { 'B': '0', 'KB': '1', 'MB': '2', 'GB': '3', 'TB': '4' };
  const matches = capacity.match(/(\d+)(\w+)/);
  if(matches != undefined){
    const size = parseInt(capacity);
    const unit = capacity.slice(-2);
  return size * Math.pow(1024, parseInt(units[unit]));
  } else {
    return 0;
  }
  }

  public getFormattedCapacity(sizeInBytes: number): string {
    const units = ['B', 'KB', 'MB', 'GB', 'TB'];
  let size = sizeInBytes;
  let unitIndex = 0;
  while (size >= 1024 && unitIndex < units.length - 1) {
    size /= 1024;
    unitIndex++;
  }
  return `${size.toFixed(0)}${units[unitIndex]}` as any as string;
  }

  rand(max: number, min: number = 0) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

}

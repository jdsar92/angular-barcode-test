import { AfterViewInit, Component, ViewChild, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgxScannerQrcodeComponent, NgxScannerQrcodeModule, ScannerQRCodeConfig, ScannerQRCodeDevice } from 'ngx-scanner-qrcode';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgxScannerQrcodeModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  title = 'my-angular-project';
  config: ScannerQRCodeConfig = {
    constraints: { 
      video: {
        width: 1000,
        height: 500
      }
    },
    isBeep: false
  }

  isLoading=false
  isScannerReady:boolean=false
  devices:any

  @ViewChild(NgxScannerQrcodeComponent) scanner!: NgxScannerQrcodeComponent;

 
  

  public handle(action: any, fn: string): void {
    // Fix issue #27, #29
    const playDeviceFacingBack = (devices: any[]) => {
      // front camera or back camera check here!
      const device = devices.find(f => (/back|rear|environment/gi.test(f.label))); // Default Back Facing Camera
      action.playDevice(device ? device.deviceId : devices[0].deviceId);
    }

    if (fn === 'start') {
      action[fn](playDeviceFacingBack).subscribe((r: any) => alert(fn + ""+ JSON.stringify(r)));
    } else {
      action[fn]().subscribe((r: any) => console.log(fn, r), alert);
    }
  }
  

  onScannerReady(event: any) {
    // Handle the (start) event here
    console.log('Scanner ready:', event);
  }

  onScannerEvent(event: any) {
    // Handle the (start) event here
    console.log('Scanner event:', event);
    this.scanner.pause()

    alert("Lectura codigo de barras: " +  event[0].value)
    this.scanner.play()
  }
}

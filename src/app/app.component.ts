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
        width: window.innerWidth
      }
    },
    isBeep: false
  }

  isLoading=false
  isScannerReady:boolean=false
  devices:any

  @ViewChild(NgxScannerQrcodeComponent) scanner!: NgxScannerQrcodeComponent;

 
  

  startScanner() {
    this.isLoading = !this.isLoading
    if (this.scanner) {
      if(this.isLoading){
        this.scanner.start();
        this.devices = this.scanner.devices
        alert(JSON.stringify(this.devices))
      }else{
        this.scanner.stop()
      }      
    } else {
      console.error('Scanner component not found.');
    }
  }
  

  onScannerReady(event: any) {
    // Handle the (start) event here
    console.log('Scanner ready:', event);
  }

  onScannerEvent(event: any) {
    // Handle the (start) event here
    console.log('Scanner event:', event);
    this.scanner.stop()

    alert("Lectura codigo de barras: " +  event[0].value)
    this.scanner.start()
  }
}

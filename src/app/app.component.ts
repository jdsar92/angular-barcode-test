import { AfterViewInit, Component, ViewChild, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgxScannerQrcodeComponent, NgxScannerQrcodeModule, ScannerQRCodeConfig } from 'ngx-scanner-qrcode';
import { CommonModule } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgxScannerQrcodeModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  private modalService = inject(NgbModal);

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

  @ViewChild(NgxScannerQrcodeComponent) scanner!: NgxScannerQrcodeComponent;

 
  

  startScanner() {
    this.isLoading = !this.isLoading
    if (this.scanner) {
      if(this.isLoading){
        this.scanner.start();
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

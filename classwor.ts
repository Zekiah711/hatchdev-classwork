type Platform = "windows" | "web" |"MacOS";
// Factory Method
interface Button { render(): void; onClick(handler: () => void): void; }
class WindowsButton implements Button { private handler: (() => void) | null = null;
render(): void {
    console.log("[Windows] Drawing a native OS button")
}

onClick(handler: () => void): void {
    console.log("[Windows] Binding a native click event");
    this.handler = handler;
}
}

class MacOSButton implements Button { private handler: (() => void) | null = null;
render(): void {
    console.log("[MacOS] Rendering This one is for MacOS")
}

onClick(handler: () => void): void {
    console.log("[MacOS] Adding an Apple 'click' listener");
    this.handler = handler;
}
}
class HTMLButton implements Button { private handler: (() => void) | null = null;
render(): void {
    console.log("[Web] Rendering <button>OK</button>")
}

onClick(handler: () => void): void {
    console.log("[Web] Adding a browser 'click' listener");
    this.handler = handler;
}
}
abstract class Dialog { abstract createButton(): Button;
render(): void {
    const okButton = this.createButton();
    okButton.onClick(() => this.close());
    okButton.render();
}

close(): void {
        console.log("Dialog closed")
}
}
class WindowsDialog extends Dialog { override createButton(): Button { return new WindowsButton() } }
class WebDialog extends Dialog { override createButton(): Button { return new HTMLButton() } }
class MacOSDialog extends Dialog { override createButton(): Button { return new MacOSButton() } }
interface AppConfig { platform: Platform }
class Application { private readonly dialog: Dialog;
constructor(config: AppConfig) {
    this.dialog = Application.chooseDialog(config.platform)
}

private static chooseDialog(platform: Platform): Dialog {
    switch (platform) {
        case "windows":
            return new WindowsDialog();
        case "web":
            return new WebDialog();
          case "MacOS":
            return new MacOSDialog();
        default: {
            const unknown: never = platform;
            throw new Error(`Unknown platform: ${String(unknown)}`)
        }
    }
}

run(): void {
    this.dialog.render()
}
}
new Application({platform: "windows"}).run(); new Application({ platform: "web"}).run(); new Application({ platform: "MacOS"}).run();





interface Transport { deliver(cargo: string): void; costPerKm (): number;}

class Truck implements Transport{ deliver(cargo: string): void {
console.log(`🚚 Delivering ${cargo} by road`);
}
costPerKm(): number {
return 2;
}
} 


abstract class Logistics { abstract createTransport():Transport;
planDelivery(cargo: string): void {
console.log(`Planning delivery of ${cargo}... `);

const transport= this.createTransport()
transport.deliver(cargo);
console.log("Delivery logged. ");
}
estimateCost(km: number): number {

const transport = this.createTransport()
return km * transport.costPerKm();
}
} 

class RoadLogistics  extends Logistics { override createTransport(): Transport { return new Truck() } }


new RoadLogistics().planDelivery("cement");

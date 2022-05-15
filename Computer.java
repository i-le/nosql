package usb;

public class Computer {
    public void powerOn() {
        System.out.println("kaiji");
    }

    public void powerOff() {
        System.out.println("guanji");
    }

    public void useDevice(Usb usb) {
        usb.open();
        usb.close();
    }
}

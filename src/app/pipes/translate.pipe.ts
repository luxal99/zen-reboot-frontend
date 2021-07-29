import {Pipe, PipeTransform} from "@angular/core";
import {isNumeric} from "rxjs/internal-compatibility";

@Pipe({
  name: "translate"
})
export class TranslatePipe implements PipeTransform {

  transform(value: any): any {
    let valueToUpperCase = "";
    if (!isNumeric(value)) {
      valueToUpperCase = value.toUpperCase();
    }
    if (!value) {
      return "";
    }


    if (valueToUpperCase === "PERCENT") {
      return "Procenat";
    } else if (valueToUpperCase === "FLAT") {
      return "Fiksno";
    } else if (valueToUpperCase === "NONE") {
      return "Nijedan";
    } else if (valueToUpperCase === "CASH") {
      return "Keš";
    } else if (valueToUpperCase === "CARD") {
      return "Kartica";
    } else if (valueToUpperCase === "ACCOUNT PAYMENT") {
      return "Plaćanje preko računa";
    } else if (valueToUpperCase === "DISCOUNT") {
      return "Popust";
    } else if (valueToUpperCase === "VOUCHER") {
      return "Vaučer";
    } else if (valueToUpperCase === "ONLINE VOUCHER") {
      return "Online vaučer";
    } else if (valueToUpperCase === "PACKAGE") {
      return "Paket";
    } else if (valueToUpperCase === "POINT OF SALE") {
      return "Na licu mesta";
    } else if (valueToUpperCase === "NEW") {
      return "Novi";
    } else if (valueToUpperCase === "CANCELED") {
      return "Otkazan";
    } else if (valueToUpperCase === "COMPLETED") {
      return "Kompletiran";
    } else if (valueToUpperCase === "CONFIRMED") {
      return "Potvrđen";
    } else if (valueToUpperCase === "TODAY") {
      return "Dnevni";
    } else if (valueToUpperCase === "Week") {
      return "Nedeljni";
    } else if (valueToUpperCase === "MONTH") {
      return "Mesečni";
    } else if (valueToUpperCase === "THREE_MONTHS") {
      return "Tromesečni";
    } else if (valueToUpperCase === "SIX_MONTHS") {
      return "Šestomesečni";
    } else if (valueToUpperCase === "ROLE_ADMIN") {
      return "Admin";
    } else if (valueToUpperCase === "ROLE_THERAPIST") {
      return "Terapeut";
    } else if (valueToUpperCase === "ROLE_RECEPTIONIST") {
      return "Recepcionista";
    } else if (valueToUpperCase === "BILL") {
      return "Račun";
    } else if (valueToUpperCase === "TAX") {
      return "Taksa";
    } else if (valueToUpperCase === "EXPENSE") {
      return "Trošak";
    } else if (valueToUpperCase === "INVESTMENT") {
      return "Ulaganje";
    } else if (valueToUpperCase === "BLANCO") {
      return "Blanko";
    } else if (valueToUpperCase === "PRODUCT") {
      return "Proizvod";
    } else if (valueToUpperCase === "WEEK") {
      return "Nedeljni";
    } else if (valueToUpperCase === "MALE") {
      return "Muški";
    } else if (valueToUpperCase === "FEMALE") {
      return "Ženski";
    } else {
      return value;
    }
  }

}

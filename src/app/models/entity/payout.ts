import {Appointment} from "./appointment";
import {Staff} from "./staff";

export interface Payout {
  id?: number;
  appointment?: Appointment;
  appointmentCanceled?: boolean;
  categoryPercentage?: number;
  date?: string;
  createdDate?: string;
  originalValue?: number;
  staff?: Staff;
  value?: number;

}

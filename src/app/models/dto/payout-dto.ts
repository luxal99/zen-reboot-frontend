import {Staff} from "../entity/staff";
import {AppointmentDTO} from "./AppointmentDTO";

export interface PayoutDto {
  id?: number;
  appointment?: AppointmentDTO;
  appointmentCanceled?: boolean;
  categoryPercentage?: number;
  date?: string;
  createdDate?: string;
  originalValue?: number;
  staff?: Staff;
  value?: number;
}

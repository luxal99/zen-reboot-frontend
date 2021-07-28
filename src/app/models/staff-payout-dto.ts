import {Payout} from "./payout";
import {Staff} from "./staff";

export interface StaffPayoutDto {
  payouts?: Payout[];
  staff?: Staff;
  total?: number
}

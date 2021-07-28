import {Payout} from "../entity/payout";
import {Staff} from "../entity/staff";

export interface StaffPayoutDto {
  payouts?: Payout[];
  staff?: Staff;
  total?: number
}

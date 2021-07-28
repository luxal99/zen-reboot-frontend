import {Staff} from "../entity/staff";
import {PayoutDto} from "./payout-dto";

export interface StaffPayoutDto {
  payouts?: PayoutDto[];
  staff?: Staff;
  total?: number
}

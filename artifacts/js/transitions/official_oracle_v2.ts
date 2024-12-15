import {
  tx
} from "@doko-js/core";
import * as records from "../types/official_oracle_v2";


export type Official_oracle_v2Set_unique_idTransition = tx.ExecutionReceipt < [tx.Transition < [tx.FutureOutput], 'official_oracle_v2', 'set_unique_id' > , ] >
  export type Official_oracle_v2Set_pcr_valuesTransition = tx.ExecutionReceipt < [tx.Transition < [tx.FutureOutput], 'official_oracle_v2', 'set_pcr_values' > , ] >
  export type Official_oracle_v2Set_keyTransition = tx.ExecutionReceipt < [tx.Transition < [tx.FutureOutput], 'official_oracle_v2', 'set_key' > , ] >
  export type Official_oracle_v2Set_data_sgxTransition = tx.ExecutionReceipt < [tx.Transition < [tx.FutureOutput], 'official_oracle_v2', 'set_data_sgx' > , ] >
  export type Official_oracle_v2Set_data_nitroTransition = tx.ExecutionReceipt < [tx.Transition < [tx.FutureOutput], 'official_oracle_v2', 'set_data_nitro' > , ] >
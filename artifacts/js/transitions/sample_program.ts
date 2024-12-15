import {
  tx
} from "@doko-js/core";
import * as records from "../types/sample_program";


export type Sample_programQuery_oracleTransition = tx.ExecutionReceipt < [tx.Transition < [tx.FutureOutput], 'sample_program', 'query_oracle' > , ] >
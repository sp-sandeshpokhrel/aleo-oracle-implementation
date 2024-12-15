import {
  ContractConfig,
  zkGetMapping,
  LeoAddress,
  LeoRecord,
  js2leo,
  leo2js,
  ExternalRecord,
  ExecutionMode,
  ExecutionContext,
  CreateExecutionContext,
  TransactionResponse
} from "@doko-js/core";
import {
  BaseContract
} from "../../contract/base-contract";
import {
  TransactionModel
} from "@provablehq/sdk";
import * as receipt from "./transitions/sample_program";

export class Sample_programContract extends BaseContract {

  constructor(config: Partial < ContractConfig > = {
    mode: ExecutionMode.LeoRun
  }) {
    super({
      ...config,
      appName: 'sample_program',
      fee: '0.01',
      contractPath: 'artifacts/leo/sample_program',
      isImportedAleo: false
    });
  }
  async query_oracle(): Promise < TransactionResponse < TransactionModel & receipt.Sample_programQuery_oracleTransition, [] >> {

    const params = []
    const result = await this.ctx.execute('query_oracle', params);
    return result
  }


}
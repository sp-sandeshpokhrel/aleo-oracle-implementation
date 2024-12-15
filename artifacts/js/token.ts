import {
  token
} from "./types/token";
import {
  gettokenLeo
} from "./js2leo/token";
import {
  gettoken
} from "./leo2js/token";
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
import * as receipt from "./transitions/token";

export class TokenContract extends BaseContract {

  constructor(config: Partial < ContractConfig > = {
    mode: ExecutionMode.LeoRun
  }) {
    super({
      ...config,
      appName: 'token',
      fee: '0.01',
      contractPath: 'artifacts/leo/token',
      isImportedAleo: false
    });
  }
  async mint_public(r0: LeoAddress, r1: bigint): Promise < TransactionResponse < TransactionModel & receipt.TokenMint_publicTransition, [] >> {
    const r0Leo = js2leo.address(r0);
    const r1Leo = js2leo.u64(r1);

    const params = [r0Leo, r1Leo]
    const result = await this.ctx.execute('mint_public', params);
    return result
  }

  async mint_private(r0: LeoAddress, r1: bigint): Promise < TransactionResponse < TransactionModel & receipt.TokenMint_privateTransition, [LeoRecord] >> {
    const r0Leo = js2leo.address(r0);
    const r1Leo = js2leo.u64(r1);

    const params = [r0Leo, r1Leo]
    const result = await this.ctx.execute('mint_private', params);
    result.set_converter_fn([leo2js.record]);
    return result
  }

  async transfer_public(r0: LeoAddress, r1: bigint): Promise < TransactionResponse < TransactionModel & receipt.TokenTransfer_publicTransition, [] >> {
    const r0Leo = js2leo.address(r0);
    const r1Leo = js2leo.u64(r1);

    const params = [r0Leo, r1Leo]
    const result = await this.ctx.execute('transfer_public', params);
    return result
  }

  async transfer_private(r0: token, r1: LeoAddress, r2: bigint): Promise < TransactionResponse < TransactionModel & receipt.TokenTransfer_privateTransition, [LeoRecord, LeoRecord] >> {
    const r0Leo = js2leo.json(gettokenLeo(r0));
    const r1Leo = js2leo.address(r1);
    const r2Leo = js2leo.u64(r2);

    const params = [r0Leo, r1Leo, r2Leo]
    const result = await this.ctx.execute('transfer_private', params);
    result.set_converter_fn([leo2js.record, leo2js.record]);
    return result
  }

  async transfer_private_to_public(r0: token, r1: LeoAddress, r2: bigint): Promise < TransactionResponse < TransactionModel & receipt.TokenTransfer_private_to_publicTransition, [LeoRecord] >> {
    const r0Leo = js2leo.json(gettokenLeo(r0));
    const r1Leo = js2leo.address(r1);
    const r2Leo = js2leo.u64(r2);

    const params = [r0Leo, r1Leo, r2Leo]
    const result = await this.ctx.execute('transfer_private_to_public', params);
    result.set_converter_fn([leo2js.record]);
    return result
  }

  async transfer_public_to_private(r0: LeoAddress, r1: bigint): Promise < TransactionResponse < TransactionModel & receipt.TokenTransfer_public_to_privateTransition, [LeoRecord] >> {
    const r0Leo = js2leo.address(r0);
    const r1Leo = js2leo.u64(r1);

    const params = [r0Leo, r1Leo]
    const result = await this.ctx.execute('transfer_public_to_private', params);
    result.set_converter_fn([leo2js.record]);
    return result
  }

  async account(key: LeoAddress, defaultValue ? : bigint): Promise < bigint > {
    const keyLeo = js2leo.address(key);

    const params = [keyLeo]
    const result = await zkGetMapping(
      this.config,
      'account',
      params[0],
    );

    if (result != null)
      return leo2js.u64(result);
    else {
      if (defaultValue != undefined) return defaultValue;
      throw new Error(`account returned invalid value[input: ${key}, output: ${result}`);
    }
  }


}
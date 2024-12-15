import { Sample_programContract } from '../artifacts/js/sample_program';
import { Official_oracle_v2Contract } from '../artifacts/js/official_oracle_v2';
import { getUniqueIDLeo } from '../artifacts/js/js2leo/official_oracle_v2';
import { getPcrValues, getReportData, getUniqueID } from '../artifacts/js/leo2js/official_oracle_v2';
import { OracleClient } from '@zkportal/aleo-oracle-sdk';
import { ExecutionMode } from '@doko-js/core';
import { getReport } from '../artifacts/js/leo2js/official_oracle_v2';
import { getReportDataLeo, getReportLeo } from '../artifacts/js/js2leo/official_oracle_v2';

const sample_program = new Sample_programContract({ mode: ExecutionMode.SnarkExecute });
const official_oracle_v2 = new Official_oracle_v2Contract({ mode: ExecutionMode.SnarkExecute });


const oracle = new Official_oracle_v2Contract({ mode: ExecutionMode.SnarkExecute });
const [aleoUser1] = oracle.getAccounts()

async function deployOracle() {

  const response = await oracle.deploy();
  await response.wait();
}

async function setKey() {
  const response = await oracle.set_key("aleo1afxcqyzcz3kx880q33zws33k503mlth9gql52ddylvcgzv9c4gxs757xsc", true);
  await response.wait();
}

async function setUniqueId() {
  const uniqueId = getUniqueID({ chunk_1: "17015025951288053756798481735252851837u128", chunk_2: "254884026197434376786037417116726328985u128" })
  const response = await oracle.set_unique_id(uniqueId);
  await response.wait();

}

async function setPcrValues() {
  const pcrValues = getPcrValues({ pcr_0_chunk_1: "154937738524841859450777744171030023482u128", pcr_0_chunk_2: "18955371407123342744870463710219413577u128", pcr_0_chunk_3: "251323490861154864218500338263451402165u128", pcr_1_chunk_1: "160074764010604965432569395010350367491u128", pcr_1_chunk_2: "139766717364114533801335576914874403398u128", pcr_1_chunk_3: "227000420934281803670652481542768973666u128", pcr_2_chunk_1: "163357810289091459527880728033172925451u128", pcr_2_chunk_2: "213887741940950969244683424517708448256u128", pcr_2_chunk_3: "330785448869873692865026718741475118101u128" })
  const response = await oracle.set_pcr_values(pcrValues);
  await response.wait();
}

async function check() {
  const client = new OracleClient(); // will use default notarizer and verifier

  const enclavesInfo = await client.enclavesInfo();
  console.log(enclavesInfo);

  const request = {
    url: 'google.com',
    requestMethod: 'GET',
    responseFormat: 'html',
    htmlResultType: 'value',
    selector: '/html/head/title',
    encodingOptions: {
      value: 'string'
    }
  };
  // @ts-ignore
  const attestedResponses = await client.notarize(request);
  for (const attestedResponse of attestedResponses) {
    console.log(attestedResponse.oracleData);
  }
  const parsed = JSON.parse(attestedResponses[0].oracleData.report);
  const report = getReportData(parsed);
  const parsed2 = JSON.parse(attestedResponses[0].oracleData.userData);
  const reportLeo = getReport(parsed2)
  console.log(report);
  const signature = attestedResponses[0].oracleData.signature;

  const set_data_sgx = await official_oracle_v2.set_data_sgx(parsed2, parsed, signature, attestedResponses[0].oracleData.address);
  const set = await set_data_sgx.wait();
  console.log(set);
  console.log(set_data_sgx);

}

async function main() {

  await deployOracle();
  await setKey();
  await setUniqueId();
  await setPcrValues();
  // await check();
}

main()


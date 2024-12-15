import { OracleClient } from '@zkportal/aleo-oracle-sdk';
import { Sample_programContract } from '../artifacts/js/sample_program';
import { Official_oracle_v2Contract } from '../artifacts/js/official_oracle_v2';
import { ExecutionMode } from '@doko-js/core';
import { getReport } from '../artifacts/js/leo2js/official_oracle_v2';
import { getReportDataLeo, getReportLeo } from '../artifacts/js/js2leo/official_oracle_v2';

const sample_program = new Sample_programContract({ mode: ExecutionMode.SnarkExecute });
const official_oracle_v2 = new Official_oracle_v2Contract({ mode: ExecutionMode.SnarkExecute });
const client = new OracleClient(); // will use default notarizer and verifier

async function check() {
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
    const report = getReportDataLeo(parsed);
    const parsed2 = JSON.parse(attestedResponses[0].oracleData.userData);
    const reportLeo = getReportLeo(parsed2)
    console.log(report);
    const signature = attestedResponses[0].oracleData.signature;

    const set_data_sgx = await official_oracle_v2.set_data_sgx(parsed2, parsed, signature, attestedResponses[0].oracleData.address);
    const set = await set_data_sgx.wait();
    console.log(set);
    console.log(set_data_sgx);

}

check()
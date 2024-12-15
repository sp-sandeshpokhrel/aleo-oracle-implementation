// The 'sample_program' program.
import official_oracle_v2.aleo;

program sample_program.aleo {

    struct TimestampedHash {        // Aleo struct definition for calculating the timestamped hash
        request_hash: u128,           // This is the hash from above depending on the coin
        attestation_timestamp: u128   // This is the timestamp you got from the git repo
    }

    const aleo_request_hash:u128=325436984254736568690754472542545613141u128;

    async transition query_oracle () -> Future {
        return finalize_query_oracle();
    }

    async function finalize_query_oracle() {
        
    // use the correct request hash for the respective coin
    // let aleo_request_hash: u128 = 325436984254736568690754472542545613141u128;

    // read latest available value from the oracle
    // you get the latest published quote when request hash used at it is

    // read data attested by an SGX enclave
    let sgx_latest_data_from_oracle: AttestedData = official_oracle_v2.aleo/sgx_attested_data.get(aleo_request_hash);
    // read data attested by a Nitro enclave
    let nitro_latest_data_from_oracle: AttestedData = official_oracle_v2.aleo/nitro_attested_data.get(aleo_request_hash);

    // sgx_latest_data_from_oracle.data                        // latest available Aleo price attested by an SGX
    // sgx_latest_data_from_oracle.attestation_timestamp       // timestamp of when this quote was created

    // compare the timestamps to identify which quote is newer to use the latest available
    let sgx_is_newer: bool = sgx_latest_data_from_oracle.attestation_timestamp.gte(nitro_latest_data_from_oracle.attestation_timestamp);
    // use the newer price
    let latest_available_price: u128 = sgx_is_newer ? sgx_latest_data_from_oracle.data : nitro_latest_data_from_oracle.data;



    // to get a quote at a specific timestamp you need to create a timestamped request hash
    // you can get all the available timestamps from our GitHub repository
    // https://github.com/zkportal/aleo-price-feed-index
    let target_timestamp: u128 = 1729697539u128;

    let struct_to_hash: TimestampedHash = TimestampedHash {
      request_hash: aleo_request_hash,      // same request hash
      attestation_timestamp: target_timestamp                         // time of attestation
    };

    let timestamped_hash: u128 = Poseidon8::hash_to_u128(struct_to_hash);

    // read oracle with created hash
    let sgx_historic_data_from_oracle: AttestedData = official_oracle_v2.aleo/sgx_attested_data.get(timestamped_hash);
    let nitro_historic_data_from_oracle: AttestedData = official_oracle_v2.aleo/nitro_attested_data.get(timestamped_hash);

    // historic_data_from_oracle.data                     // aleo price at a specific timestamp attested by an SGX
    // historic_data_from_oracle.attestation_timestamp    // timestamp of when this quote was created, 1729697539u128 in the current example
  }
}
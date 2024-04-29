import {
  DataHandlerContext,
  Log,
  assertNotNull,
} from "@subsquid/evm-processor";
import { Store } from "@subsquid/typeorm-store";
import * as EASContract from "../abi/EAS";
import * as SchemaContract from "../abi/Schema";
import { SchemaEncoder } from "@ethereum-attestation-service/eas-sdk";

import {
  PROJECT_VERIFY_SCHEMA,
  EAS_CONTRACT_ADDRESS,
  SCHEMA_CONTRACT_ADDRESS,
} from "../constants";
import { Attestor, Organisation, AttestorOrganisation } from "../model";
import { authorizeAttestation } from "../controllers/authorizeAttestation";
import { projectVeriricationAttestation } from "../controllers/projectVerificationAttestation";

export async function processAttest(
  ctx: DataHandlerContext<Store>,
  log: Log
): Promise<void> {
  const {
    uid,
    schema: schemaUid,
    attestor: issuer,
  } = EASContract.events.Attested.decode(log);
  const easContract = new EASContract.Contract(
    ctx,
    log.block,
    EAS_CONTRACT_ADDRESS
  );
  const schemaContract = new SchemaContract.Contract(
    ctx,
    log.block,
    SCHEMA_CONTRACT_ADDRESS
  );

  switch (schemaUid.toLocaleLowerCase()) {
    case PROJECT_VERIFY_SCHEMA:
      await projectVeriricationAttestation(ctx, log);
      break;

    default:
      await authorizeAttestation(ctx, log);
  }
}

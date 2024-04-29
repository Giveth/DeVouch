module.exports = class Data1714394155334 {
    name = 'Data1714394155334'

    async up(db) {
        await db.query(`CREATE TABLE "attestor" ("id" character varying NOT NULL, CONSTRAINT "PK_2ba0dae296b9deebeb9ecbbf508" PRIMARY KEY ("id"))`)
        await db.query(`CREATE TABLE "organisation" ("id" character varying NOT NULL, "name" text NOT NULL, "schema_uid" text NOT NULL, "schema_user_field" text NOT NULL, "issuer" text NOT NULL, "color" text, CONSTRAINT "PK_c725ae234ef1b74cce43d2d00c1" PRIMARY KEY ("id"))`)
        await db.query(`CREATE UNIQUE INDEX "IDX_d9428f9c8e3052d6617e3aab0e" ON "organisation" ("name") `)
        await db.query(`CREATE TABLE "attestor_organisation" ("id" character varying NOT NULL, "attest_timestamp" TIMESTAMP WITH TIME ZONE NOT NULL, "revoked" boolean NOT NULL, "attestor_id" character varying, "organisation_id" character varying, CONSTRAINT "PK_ac02a8a577635d60275796a9d03" PRIMARY KEY ("id"))`)
        await db.query(`CREATE INDEX "IDX_22cd09c4533533cebedb5487f4" ON "attestor_organisation" ("attestor_id") `)
        await db.query(`CREATE INDEX "IDX_b0d947390c1e10152bb1387fa2" ON "attestor_organisation" ("organisation_id") `)
        await db.query(`CREATE TABLE "project" ("id" character varying NOT NULL, "source" text NOT NULL, "project_id" text NOT NULL, "title" text, "description" text, "total_vouches" integer NOT NULL, "total_flags" integer NOT NULL, "last_updated_timestamp" TIMESTAMP WITH TIME ZONE NOT NULL, CONSTRAINT "PK_4d68b1358bb5b766d3e78f32f57" PRIMARY KEY ("id"))`)
        await db.query(`CREATE TABLE "project_attestation" ("id" character varying NOT NULL, "vouch_or_flag" boolean NOT NULL, "tx_hash" text NOT NULL, "revoked" boolean NOT NULL, "attest_timestamp" TIMESTAMP WITH TIME ZONE NOT NULL, "comment" text, "attestor_organisation_id" character varying, "project_id" character varying, CONSTRAINT "PK_b54887e7eb9193e705303c2b0a0" PRIMARY KEY ("id"))`)
        await db.query(`CREATE INDEX "IDX_d482a5af31e29569b8b42d9252" ON "project_attestation" ("attestor_organisation_id") `)
        await db.query(`CREATE INDEX "IDX_1082147528db937cb5b50fb2a0" ON "project_attestation" ("project_id") `)
        await db.query(`ALTER TABLE "attestor_organisation" ADD CONSTRAINT "FK_22cd09c4533533cebedb5487f44" FOREIGN KEY ("attestor_id") REFERENCES "attestor"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
        await db.query(`ALTER TABLE "attestor_organisation" ADD CONSTRAINT "FK_b0d947390c1e10152bb1387fa23" FOREIGN KEY ("organisation_id") REFERENCES "organisation"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
        await db.query(`ALTER TABLE "project_attestation" ADD CONSTRAINT "FK_d482a5af31e29569b8b42d92525" FOREIGN KEY ("attestor_organisation_id") REFERENCES "attestor_organisation"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
        await db.query(`ALTER TABLE "project_attestation" ADD CONSTRAINT "FK_1082147528db937cb5b50fb2a05" FOREIGN KEY ("project_id") REFERENCES "project"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
    }

    async down(db) {
        await db.query(`DROP TABLE "attestor"`)
        await db.query(`DROP TABLE "organisation"`)
        await db.query(`DROP INDEX "public"."IDX_d9428f9c8e3052d6617e3aab0e"`)
        await db.query(`DROP TABLE "attestor_organisation"`)
        await db.query(`DROP INDEX "public"."IDX_22cd09c4533533cebedb5487f4"`)
        await db.query(`DROP INDEX "public"."IDX_b0d947390c1e10152bb1387fa2"`)
        await db.query(`DROP TABLE "project"`)
        await db.query(`DROP TABLE "project_attestation"`)
        await db.query(`DROP INDEX "public"."IDX_d482a5af31e29569b8b42d9252"`)
        await db.query(`DROP INDEX "public"."IDX_1082147528db937cb5b50fb2a0"`)
        await db.query(`ALTER TABLE "attestor_organisation" DROP CONSTRAINT "FK_22cd09c4533533cebedb5487f44"`)
        await db.query(`ALTER TABLE "attestor_organisation" DROP CONSTRAINT "FK_b0d947390c1e10152bb1387fa23"`)
        await db.query(`ALTER TABLE "project_attestation" DROP CONSTRAINT "FK_d482a5af31e29569b8b42d92525"`)
        await db.query(`ALTER TABLE "project_attestation" DROP CONSTRAINT "FK_1082147528db937cb5b50fb2a05"`)
    }
}

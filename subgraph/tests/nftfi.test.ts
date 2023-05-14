import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { Address, BigInt } from "@graphprotocol/graph-ts"
import { AdminFeeUpdated } from "../generated/schema"
import { AdminFeeUpdated as AdminFeeUpdatedEvent } from "../generated/DirectLoanFixedOfferRedeploy/DirectLoanFixedOfferRedeploy"
import { handleAdminFeeUpdated } from "../src/nftfi"
import { createAdminFeeUpdatedEvent } from "./nftfi-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let newAdminFee = 123
    let newAdminFeeUpdatedEvent = createAdminFeeUpdatedEvent(newAdminFee)
    handleAdminFeeUpdated(newAdminFeeUpdatedEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("AdminFeeUpdated created and stored", () => {
    assert.entityCount("AdminFeeUpdated", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "AdminFeeUpdated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "newAdminFee",
      "123"
    )

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  })
})

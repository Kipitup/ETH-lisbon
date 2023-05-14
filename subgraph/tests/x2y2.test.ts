import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { Address, Bytes, BigInt } from "@graphprotocol/graph-ts"
import { AdminFeeReceiverUpdated } from "../generated/schema"
import { AdminFeeReceiverUpdated as AdminFeeReceiverUpdatedEvent } from "../generated/Contract/Contract"
import { handleAdminFeeReceiverUpdated } from "../src/x2y2"
import { createAdminFeeReceiverUpdatedEvent } from "./x2y2-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let param0 = Address.fromString(
      "0x0000000000000000000000000000000000000001"
    )
    let newAdminFeeReceiverUpdatedEvent = createAdminFeeReceiverUpdatedEvent(
      param0
    )
    handleAdminFeeReceiverUpdated(newAdminFeeReceiverUpdatedEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("AdminFeeReceiverUpdated created and stored", () => {
    assert.entityCount("AdminFeeReceiverUpdated", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "AdminFeeReceiverUpdated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "param0",
      "0x0000000000000000000000000000000000000001"
    )

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  })
})

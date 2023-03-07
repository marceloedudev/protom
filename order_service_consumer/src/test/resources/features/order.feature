Feature: Order Consumer

  Scenario: Place order event
    Given consumer event and valid item for order
    When produces the place order event with 1 item and 2 quantity
    Then checks if order exists and item id and quantity

  Scenario: Cancel order event
    Given valid order with item and pending status
    When produces event to cancel the order
    Then checks if the status of the order has changed to canceled

  Scenario: Reject order event
    Given valid order with item and pending status to reject
    When produces event to reject the order
    Then checks if the status of the order has changed to rejected

const tracks = [
  {
    "id": 0,
    "name": "root",
    "maxDeciding": 1,
    "decisionDeposit": "3333333300000000",
    "preparePeriod": 1800,
    "decisionPeriod": 403200,
    "confirmPeriod": 1800,
    "minEnactmentPeriod": 1800,
    "minApproval": {
      "reciprocal": {
        "factor": 222222224,
        "xOffset": 333333335,
        "yOffset": 333333332
      }
    },
    "minSupport": {
      "linearDecreasing": {
        "length": 1000000000,
        "floor": 0,
        "ceil": 500000000
      }
    }
  },
  {
    "id": 1,
    "name": "whitelisted_caller",
    "maxDeciding": 10,
    "decisionDeposit": "33333333000000000",
    "preparePeriod": 1800,
    "decisionPeriod": 403200,
    "confirmPeriod": 100,
    "minEnactmentPeriod": 300,
    "minApproval": {
      "reciprocal": {
        "factor": 270899180,
        "xOffset": 389830523,
        "yOffset": 305084738
      }
    },
    "minSupport": {
      "reciprocal": {
        "factor": 5062500,
        "xOffset": 12500000,
        "yOffset": 95000000
      }
    }
  },
  {
    "id": 10,
    "name": "staking_admin",
    "maxDeciding": 10,
    "decisionDeposit": "16666666500000",
    "preparePeriod": 4,
    "decisionPeriod": 403200,
    "confirmPeriod": 1800,
    "minEnactmentPeriod": 28800,
    "minApproval": {
      "linearDecreasing": {
        "length": 607142857,
        "floor": 500000000,
        "ceil": 1000000000
      }
    },
    "minSupport": {
      "reciprocal": {
        "factor": 7892829,
        "xOffset": 15544040,
        "yOffset": -7772020
      }
    }
  },
  {
    "id": 11,
    "name": "treasurer",
    "maxDeciding": 10,
    "decisionDeposit": "16666666500000",
    "preparePeriod": 4,
    "decisionPeriod": 403200,
    "confirmPeriod": 1800,
    "minEnactmentPeriod": 28800,
    "minApproval": {
      "reciprocal": {
        "factor": 222222224,
        "xOffset": 333333335,
        "yOffset": 333333332
      }
    },
    "minSupport": {
      "linearDecreasing": {
        "length": 1000000000,
        "floor": 0,
        "ceil": 500000000
      }
    }
  },
  {
    "id": 12,
    "name": "lease_admin",
    "maxDeciding": 10,
    "decisionDeposit": "16666666500000",
    "preparePeriod": 4,
    "decisionPeriod": 403200,
    "confirmPeriod": 1800,
    "minEnactmentPeriod": 28800,
    "minApproval": {
      "linearDecreasing": {
        "length": 607142857,
        "floor": 500000000,
        "ceil": 1000000000
      }
    },
    "minSupport": {
      "reciprocal": {
        "factor": 7892829,
        "xOffset": 15544040,
        "yOffset": -7772020
      }
    }
  },
  {
    "id": 13,
    "name": "fellowship_admin",
    "maxDeciding": 10,
    "decisionDeposit": "16666666500000",
    "preparePeriod": 4,
    "decisionPeriod": 403200,
    "confirmPeriod": 1800,
    "minEnactmentPeriod": 28800,
    "minApproval": {
      "linearDecreasing": {
        "length": 607142857,
        "floor": 500000000,
        "ceil": 1000000000
      }
    },
    "minSupport": {
      "reciprocal": {
        "factor": 7892829,
        "xOffset": 15544040,
        "yOffset": -7772020
      }
    }
  },
  {
    "id": 14,
    "name": "general_admin",
    "maxDeciding": 10,
    "decisionDeposit": "16666666500000",
    "preparePeriod": 4,
    "decisionPeriod": 403200,
    "confirmPeriod": 1800,
    "minEnactmentPeriod": 28800,
    "minApproval": {
      "reciprocal": {
        "factor": 222222224,
        "xOffset": 333333335,
        "yOffset": 333333332
      }
    },
    "minSupport": {
      "reciprocal": {
        "factor": 49586777,
        "xOffset": 90909091,
        "yOffset": -45454546
      }
    }
  },
  {
    "id": 15,
    "name": "auction_admin",
    "maxDeciding": 10,
    "decisionDeposit": "16666666500000",
    "preparePeriod": 4,
    "decisionPeriod": 403200,
    "confirmPeriod": 1800,
    "minEnactmentPeriod": 28800,
    "minApproval": {
      "reciprocal": {
        "factor": 222222224,
        "xOffset": 333333335,
        "yOffset": 333333332
      }
    },
    "minSupport": {
      "reciprocal": {
        "factor": 49586777,
        "xOffset": 90909091,
        "yOffset": -45454546
      }
    }
  },
  {
    "id": 20,
    "name": "referendum_canceller",
    "maxDeciding": 1000,
    "decisionDeposit": "166666665000000",
    "preparePeriod": 4,
    "decisionPeriod": 403200,
    "confirmPeriod": 1800,
    "minEnactmentPeriod": 100,
    "minApproval": {
      "linearDecreasing": {
        "length": 607142857,
        "floor": 500000000,
        "ceil": 1000000000
      }
    },
    "minSupport": {
      "reciprocal": {
        "factor": 7892829,
        "xOffset": 15544040,
        "yOffset": -7772020
      }
    }
  },
  {
    "id": 21,
    "name": "referendum_killer",
    "maxDeciding": 1000,
    "decisionDeposit": "166666665000000",
    "preparePeriod": 4,
    "decisionPeriod": 403200,
    "confirmPeriod": 1800,
    "minEnactmentPeriod": 100,
    "minApproval": {
      "linearDecreasing": {
        "length": 607142857,
        "floor": 500000000,
        "ceil": 1000000000
      }
    },
    "minSupport": {
      "reciprocal": {
        "factor": 7892829,
        "xOffset": 15544040,
        "yOffset": -7772020
      }
    }
  },
  {
    "id": 30,
    "name": "small_tipper",
    "maxDeciding": 200,
    "decisionDeposit": "16666666500",
    "preparePeriod": 4,
    "decisionPeriod": 403200,
    "confirmPeriod": 1800,
    "minEnactmentPeriod": 403200,
    "minApproval": {
      "linearDecreasing": {
        "length": 357142857,
        "floor": 500000000,
        "ceil": 1000000000
      }
    },
    "minSupport": {
      "reciprocal": {
        "factor": 1620729,
        "xOffset": 3231018,
        "yOffset": -1615509
      }
    }
  },
  {
    "id": 31,
    "name": "big_tipper",
    "maxDeciding": 100,
    "decisionDeposit": "166666665000",
    "preparePeriod": 4,
    "decisionPeriod": 403200,
    "confirmPeriod": 3600,
    "minEnactmentPeriod": 403200,
    "minApproval": {
      "linearDecreasing": {
        "length": 357142857,
        "floor": 500000000,
        "ceil": 1000000000
      }
    },
    "minSupport": {
      "reciprocal": {
        "factor": 4149097,
        "xOffset": 8230453,
        "yOffset": -4115227
      }
    }
  },
  {
    "id": 32,
    "name": "small_spender",
    "maxDeciding": 50,
    "decisionDeposit": "1666666650000",
    "preparePeriod": 4,
    "decisionPeriod": 403200,
    "confirmPeriod": 7200,
    "minEnactmentPeriod": 403200,
    "minApproval": {
      "linearDecreasing": {
        "length": 607142857,
        "floor": 500000000,
        "ceil": 1000000000
      }
    },
    "minSupport": {
      "reciprocal": {
        "factor": 7892829,
        "xOffset": 15544040,
        "yOffset": -7772020
      }
    }
  },
  {
    "id": 33,
    "name": "medium_spender",
    "maxDeciding": 20,
    "decisionDeposit": "4999999950000",
    "preparePeriod": 4,
    "decisionPeriod": 403200,
    "confirmPeriod": 14400,
    "minEnactmentPeriod": 403200,
    "minApproval": {
      "linearDecreasing": {
        "length": 821428571,
        "floor": 500000000,
        "ceil": 1000000000
      }
    },
    "minSupport": {
      "reciprocal": {
        "factor": 14377233,
        "xOffset": 27972031,
        "yOffset": -13986016
      }
    }
  },
  {
    "id": 34,
    "name": "big_spender",
    "maxDeciding": 10,
    "decisionDeposit": "16666666500000",
    "preparePeriod": 4,
    "decisionPeriod": 403200,
    "confirmPeriod": 28800,
    "minEnactmentPeriod": 403200,
    "minApproval": {
      "linearDecreasing": {
        "length": 1000000000,
        "floor": 500000000,
        "ceil": 1000000000
      }
    },
    "minSupport": {
      "reciprocal": {
        "factor": 28326977,
        "xOffset": 53763445,
        "yOffset": -26881723
      }
    }
  }
]

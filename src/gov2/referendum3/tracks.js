const tracks = [
  {
    "id": 0,
    "name": "root",
    "maxDeciding": 1,
    "decisionDeposit": "1000000000000000000",
    "preparePeriod": 3600,
    "decisionPeriod": 806400,
    "confirmPeriod": 3600,
    "minEnactmentPeriod": 3600,
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
    "decisionDeposit": "10000000000000000000",
    "preparePeriod": 3600,
    "decisionPeriod": 806400,
    "confirmPeriod": 200,
    "minEnactmentPeriod": 600,
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
    "decisionDeposit": "5000000000000000",
    "preparePeriod": 4,
    "decisionPeriod": 806400,
    "confirmPeriod": 3600,
    "minEnactmentPeriod": 57600,
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
    "decisionDeposit": "5000000000000000",
    "preparePeriod": 4,
    "decisionPeriod": 806400,
    "confirmPeriod": 3600,
    "minEnactmentPeriod": 57600,
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
    "decisionDeposit": "5000000000000000",
    "preparePeriod": 4,
    "decisionPeriod": 806400,
    "confirmPeriod": 3600,
    "minEnactmentPeriod": 57600,
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
    "decisionDeposit": "5000000000000000",
    "preparePeriod": 4,
    "decisionPeriod": 806400,
    "confirmPeriod": 3600,
    "minEnactmentPeriod": 57600,
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
    "decisionDeposit": "5000000000000000",
    "preparePeriod": 4,
    "decisionPeriod": 806400,
    "confirmPeriod": 3600,
    "minEnactmentPeriod": 57600,
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
    "decisionDeposit": "5000000000000000",
    "preparePeriod": 4,
    "decisionPeriod": 806400,
    "confirmPeriod": 3600,
    "minEnactmentPeriod": 57600,
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
    "decisionDeposit": "50000000000000000",
    "preparePeriod": 4,
    "decisionPeriod": 806400,
    "confirmPeriod": 3600,
    "minEnactmentPeriod": 200,
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
    "decisionDeposit": "50000000000000000",
    "preparePeriod": 4,
    "decisionPeriod": 806400,
    "confirmPeriod": 3600,
    "minEnactmentPeriod": 200,
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
    "decisionDeposit": "5000000000000",
    "preparePeriod": 4,
    "decisionPeriod": 806400,
    "confirmPeriod": 3600,
    "minEnactmentPeriod": 806400,
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
    "decisionDeposit": "50000000000000",
    "preparePeriod": 4,
    "decisionPeriod": 806400,
    "confirmPeriod": 7200,
    "minEnactmentPeriod": 806400,
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
    "decisionDeposit": "500000000000000",
    "preparePeriod": 4,
    "decisionPeriod": 806400,
    "confirmPeriod": 14400,
    "minEnactmentPeriod": 806400,
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
    "decisionDeposit": "1500000000000000",
    "preparePeriod": 4,
    "decisionPeriod": 806400,
    "confirmPeriod": 28800,
    "minEnactmentPeriod": 806400,
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
    "decisionDeposit": "5000000000000000",
    "preparePeriod": 4,
    "decisionPeriod": 806400,
    "confirmPeriod": 57600,
    "minEnactmentPeriod": 806400,
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

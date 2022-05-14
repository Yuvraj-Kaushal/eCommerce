// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {
  let pincodes = {
    "831003": ["East Singhbhum", "Jharkhand"],
    "110003": ["Delhi", "Delhi"],
    "721302": ["Kharagpur", "West Bengal"],
  }
    res.status(200).json(pincodes)
  }
  
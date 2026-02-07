import React from 'react';
import { FrameworkType, FrameworkModel, SubscriptionTier } from './types';
import { LayoutDashboard, Target, TrendingUp, ShieldCheck, Zap, Briefcase } from 'lucide-react';

const ORG_BASIC_FEATURES = [
  "Non-Exclusive Rights to the Model",
  "Standard Implementation Support",
  "Quarterly Strategy Review",
  "Access to Basic Templates",
  "Consulting Partner Status"
];

const ORG_EXCLUSIVE_FEATURES = [
  "Exclusive Rights in Your Industry",
  "Priority Implementation Support",
  "Monthly Strategy Sessions",
  "Competitor Lock-out Protocol",
  "Exclusive Partner Status"
];

const ORG_ASSOCIATE_FEATURES = [
  "Sole Exclusion Across All Industries",
  "Full-Time Dedicated Strategist",
  "Weekly Deep-Dive Strategy",
  "Total Market Dominance Protocol",
  "Exclusive Associate Status"
];

const PE_BASIC_FEATURES = [
  "Non-Exclusive Rights to the Model",
  "Deal Flow Optimization Support",
  "Quarterly Portfolio Review",
  "Access to Valuation Templates",
  "Consulting Partner Status"
];

const PE_EXCLUSIVE_FEATURES = [
  "Exclusive Rights in Target Sector",
  "Priority Deal Structuring Support",
  "Monthly Investment Committee Strategy",
  "Bid Strategy Lock-out Protocol",
  "Exclusive Partner Status"
];

const PE_ASSOCIATE_FEATURES = [
  "Sole Exclusion Across All Sectors",
  "Dedicated Deal Strategist (Full-Time)",
  "Weekly High-Stakes Negotiation Prep",
  "Total Market Consolidation Protocol",
  "Exclusive Associate Status"
];

export const FRAMEWORKS: FrameworkModel[] = [
  {
    type: FrameworkType.ORGANIZATIONAL,
    title: "An Offensive Approach for Businesses to Win, Dominate, and Lead in Competitive Markets",
    subtitle: "PREDATOR MODEL",
    description: "An aggressive framework designed for companies to seize market share by out-pacing the competition. This model focuses on rapid innovation, high-velocity customer acquisition, and setting the industry standard to force rivals into a reactive state.",
    details: {
      longDescription: "An aggressive framework designed for companies to seize market share by out-pacing the competition. This model focuses on rapid innovation, high-velocity customer acquisition, and setting the industry standard to force rivals into a reactive state.",
      modules: [
        {
          title: "Internal Alignment Protocol",
          description: "Eliminating the principal-agent problem within your workforce to ensure every calorie of energy is directed towards market conquest."
        },
        {
          title: "Asymmetric Competition",
          description: "Identifying and exploiting structural weaknesses in your competitors' business models that they cannot defend against without hurting their own revenue."
        },
        {
          title: "Market Dominance Loop",
          description: "A recursive framework for capturing market share, locking in customers, and raising switching costs to create unassailable moats."
        }
      ],
      benefits: [
        "Rapid Market Share Acquisition",
        "Increased Organizational Velocity",
        "Competitor Displacement",
        "Higher Profit Margins"
      ]
    },
    plans: [
      {
        id: 'org-consulting',
        tier: SubscriptionTier.BASIC,
        name: "Consulting Partner",
        price: "R1,999 - R2,999",
        priceValue: 1999.00,
        features: ORG_BASIC_FEATURES,
        cta: "Subscribe"
      },
      {
        id: 'org-partner',
        tier: SubscriptionTier.EXCLUSIVE,
        name: "Exclusive Partner",
        price: "R4,999 - R9,999",
        priceValue: 4999.00,
        features: ORG_EXCLUSIVE_FEATURES,
        cta: "Subscribe"
      },
      {
        id: 'org-associate',
        tier: SubscriptionTier.ASSOCIATE,
        name: "Exclusive Associate",
        price: "R39,999 - R99,999",
        priceValue: 39999.00,
        features: ORG_ASSOCIATE_FEATURES,
        cta: "Subscribe"
      }
    ]
  },
  {
    type: FrameworkType.PRIVATE_EQUITY,
    title: "An Offensive Approach for Firms to Win, Dominate, and Lead in Competitive Private Equity Markets",
    subtitle: "PREDATOR MODEL",
    description: "A high-performance model for firms to dominate the investment landscape through proactive capital deployment. It prioritizes proprietary deal sourcing, rapid operational scaling, and aggressive \"buy-and-build\" strategies to maximize IRR and exit value.",
    details: {
      longDescription: "A high-performance model for firms to dominate the investment landscape through proactive capital deployment. It prioritizes proprietary deal sourcing, rapid operational scaling, and aggressive \"buy-and-build\" strategies to maximize IRR and exit value.",
      modules: [
        {
          title: "Deal Alpha Generation",
          description: "Proprietary screening algorithms that filter for game-theoretic advantages in potential targets, identifying undervalued assets with high strategic leverage."
        },
        {
          title: "Negotiation Dynamics",
          description: "Behavioral frameworks for controlling the pace, framing, and outcome of high-stakes negotiations, maximizing your position at the table."
        },
        {
          title: "Value Extraction Integration",
          description: "Post-acquisition playbooks designed to rapidly restructure incentives and operations to realize immediate value and prepare for lucrative exits."
        }
      ],
      benefits: [
        "Superior Deal Sourcing",
        "Negotiation Leverage",
        "Risk Mitigation",
        "Maximized Exit Multiples"
      ]
    },
    plans: [
      {
        id: 'pe-consulting',
        tier: SubscriptionTier.BASIC,
        name: "Consulting Partner",
        price: "R4,999 - R6,999",
        priceValue: 4999.00,
        features: PE_BASIC_FEATURES,
        cta: "Subscribe"
      },
      {
        id: 'pe-partner',
        tier: SubscriptionTier.EXCLUSIVE,
        name: "Exclusive Partner",
        price: "R9,999 - R14,999",
        priceValue: 9999.00,
        features: PE_EXCLUSIVE_FEATURES,
        cta: "Subscribe"
      },
      {
        id: 'pe-associate',
        tier: SubscriptionTier.ASSOCIATE,
        name: "Exclusive Associate",
        price: "R59,999 - R149,999",
        priceValue: 59999.00,
        features: PE_ASSOCIATE_FEATURES,
        cta: "Subscribe"
      }
    ]
  }
];

export const CORE_VALUES = [
  {
    icon: <Target className="w-6 h-6 text-white" />,
    title: "Mathematical Dominance",
    description: "Moving beyond intuition into verifiable game theory strategies that predict competitor moves."
  },
  {
    icon: <Briefcase className="w-6 h-6 text-white" />,
    title: "Institutional Ready",
    description: "Engineered for organizations that require rigid systems for hyper-growth and stability."
  },
  {
    icon: <TrendingUp className="w-6 h-6 text-white" />,
    title: "Recursive Growth",
    description: "Self-optimizing frameworks that improve as your business complexity increases."
  }
];
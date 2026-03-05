import { asyncHandler } from "../utils/asyncHandler.js";
import { APIError } from "../utils/APIError.js";
import { APIResponse } from "../utils/APIResponse.js";
import Company from "../models/company.model.js";
import Application from "../models/application.model.js";
import Employee from "../models/employee.model.js";
import Repo from "../models/repoSchema.model.js";

export const getApplicationStats = asyncHandler(async (req, res) => {
    const userId = req.user._id;
  
    const now = new Date();
    const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  
    const stats = await Application.aggregate([
      {
        $match: { user: userId }
      },
      {
        $facet: {
          // Total Applications
          totalApplications: [
            { $count: "count" }
          ],
  
          // Status Breakdown
          statusStats: [
            {
              $group: {
                _id: "$status",
                count: { $sum: 1 }
              }
            }
          ],
  
          // Platform Breakdown
          platformStats: [
            {
              $group: {
                _id: "$platform",
                count: { $sum: 1 }
              }
            }
          ],
  
          // Applications This Month
          thisMonth: [
            {
              $match: { appliedDate: { $gte: firstDayOfMonth } }
            },
            { $count: "count" }
          ],
  
          // Interviews Scheduled
          interviewsScheduled: [
            {
              $match: { status: "Interviewing" }
            },
            { $count: "count" }
          ],
  
          // Offers
          offers: [
            {
              $match: { status: "Offered" }
            },
            { $count: "count" }
          ]
        }
      }
    ]);
  
    const result = stats[0];
  
    const total = result.totalApplications[0]?.count || 0;
    const offers = result.offers[0]?.count || 0;
  
    const offerRate = total > 0 ? ((offers / total) * 100).toFixed(2) : 0;
  
    return res.status(200).json(
      new APIResponse(
        200,
        {
          totalApplications: total,
          statusBreakdown: result.statusStats,
          platformBreakdown: result.platformStats,
          appliedThisMonth: result.thisMonth[0]?.count || 0,
          interviewsScheduled: result.interviewsScheduled[0]?.count || 0,
          offers,
          offerRate: `${offerRate}%`
        },
        "Application statistics fetched successfully"
      )
    );
});

export const getCompanyStats = asyncHandler(async (req, res) => {

const stats = await Company.aggregate([
    {
    $facet: {
        // Total Companies
        totalCompanies: [
        { $count: "count" }
        ],

        // Type Breakdown
        typeStats: [
        {
            $group: {
            _id: "$type",
            count: { $sum: 1 }
            }
        }
        ],

        // Company Size Breakdown
        sizeStats: [
        {
            $group: {
            _id: "$companySize",
            count: { $sum: 1 }
            }
        }
        ],

        // Salary Band Breakdown
        salaryStats: [
        {
            $group: {
            _id: "$averageSalaryBand",
            count: { $sum: 1 }
            }
        }
        ],

        // Industry Breakdown
        industryStats: [
        {
            $group: {
            _id: "$industry",
            count: { $sum: 1 }
            }
        }
        ],

        // Recently Added (Last 30 Days)
        recentCompanies: [
        {
            $match: {
            createdAt: {
                $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
            }
            }
        },
        { $count: "count" }
        ]
    }
    }
]);

const result = stats[0];

return res.status(200).json(
    new APIResponse(
    200,
    {
        totalCompanies: result.totalCompanies[0]?.count || 0,
        typeBreakdown: result.typeStats,
        sizeBreakdown: result.sizeStats,
        salaryBreakdown: result.salaryStats,
        industryBreakdown: result.industryStats,
        addedLast30Days: result.recentCompanies[0]?.count || 0
    },
    "Company statistics fetched successfully"
    )
);
});

export const getEmployeeStats = asyncHandler(async (req, res) => {
    const userId = req.user._id;
  
    const stats = await Employee.aggregate([
      {
        $match: { user: userId }
      },
      {
        $facet: {
          totalEmployees: [
            { $count: "count" }
          ],
  
          contactedStats: [
            {
              $group: {
                _id: "$isContacted",
                count: { $sum: 1 }
              }
            }
          ],
  
          companyStats: [
            {
              $group: {
                _id: "$company",
                count: { $sum: 1 }
              }
            },
            { $sort: { count: -1 } },
            { $limit: 5 }
          ],
  
          successLevelStats: [
            {
              $group: {
                _id: "$successLevel",
                count: { $sum: 1 }
              }
            },
            { $sort: { _id: 1 } }
          ],
  
          recentlyContacted: [
            {
              $match: {
                lastContactedAt: {
                  $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
                }
              }
            },
            { $count: "count" }
          ]
        }
      }
    ]);
  
    const result = stats[0];
  
    return res.status(200).json(
      new APIResponse(
        200,
        {
          totalEmployees: result.totalEmployees[0]?.count || 0,
          contactedBreakdown: result.contactedStats,
          topCompanies: result.companyStats,
          successLevelDistribution: result.successLevelStats,
          contactedLast30Days: result.recentlyContacted[0]?.count || 0
        },
        "Employee CRM statistics fetched successfully"
      )
    );
});

export const getGithubStats = asyncHandler(async (req, res) => {

    try {
        const stats = await Repo.aggregate([
            {
              $facet: {
                totalRepos: [
                  { $count: "count" }
                ],
        
                totalStars: [
                  {
                    $group: {
                      _id: null,
                      total: { $sum: "$stars" }
                    }
                  }
                ],
        
                totalForks: [
                  {
                    $group: {
                      _id: null,
                      total: { $sum: "$forks" }
                    }
                  }
                ],
        
                mostStarred: [
                  { $sort: { stars: -1 } },
                  { $limit: 1 }
                ],
        
                techStackStats: [
                  { $unwind: "$techStack" },
                  {
                    $group: {
                      _id: "$techStack",
                      count: { $sum: 1 }
                    }
                  },
                  { $sort: { count: -1 } }
                ],
        
                recentlyUpdated: [
                  {
                    $match: {
                      updatedAtGithub: {
                        $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
                      }
                    }
                  },
                  { $count: "count" }
                ]
              }
            }
          ]);
        
          const result = stats[0];
        
          return res.status(200).json(
            new APIResponse(
              200,
              {
                totalRepositories: result.totalRepos[0]?.count || 0,
                totalStars: result.totalStars[0]?.total || 0,
                totalForks: result.totalForks[0]?.total || 0,
                mostStarredRepo: result.mostStarred[0] || null,
                techStackBreakdown: result.techStackStats,
                updatedLast30Days: result.recentlyUpdated[0]?.count || 0
              },
              "GitHub repository statistics fetched successfully"
            )
          );
    } catch (error) {
        return res
            .status(500)
            .json(new APIError(500, "Failed to get Github Repo Stats", error));
    }
});
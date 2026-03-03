// BAGIC AI Leadership Coach Platform - Mock Data Layer
// Comprehensive realistic data for 5000+ employees across all personas

export const MOCK_DATA = {
    // Company Structure
    businessUnits: [
        { id: 'claims', name: 'Claims', employeeCount: 1847, headId: 'E2001' },
        { id: 'underwriting', name: 'Underwriting', employeeCount: 1523, headId: 'E2002' },
        { id: 'distribution', name: 'Distribution', employeeCount: 982, headId: 'E2003' },
        { id: 'finance', name: 'Finance', employeeCount: 423, headId: 'E2004' },
        { id: 'it', name: 'IT', employeeCount: 225, headId: 'E2005' }
    ],

    // Employee/Coachee Data - Rahul Sharma
    employee: {
        id: 'E1001',
        name: 'Rahul Sharma',
        email: 'rahul.sharma@bagic.com',
        role: 'Claims Team Lead',
        band: 4,
        bu: 'Claims',
        location: 'Mumbai',
        tenure: 36,
        manager: 'Priya Mehta',
        goals: [
            {
                id: 'G001',
                title: 'Handle Tough Feedback Conversations',
                description: 'Develop skills to provide constructive feedback during difficult conversations with team members',
                category: 'Leadership',
                framework: 'GROW',
                progress: 60,
                startDate: '2024-01-15',
                targetDate: '2024-04-15',
                status: 'active',
                milestones: [
                    { title: 'Complete SBI Framework Training', completed: true, date: '2024-01-20' },
                    { title: 'Practice 3 Role-play Scenarios', completed: true, date: '2024-02-05' },
                    { title: 'Conduct 2 Real Feedback Sessions', completed: true, date: '2024-02-18' },
                    { title: 'Receive 360 Feedback', completed: false, date: '2024-03-10' },
                    { title: 'Master Defensive Response Handling', completed: false, date: '2024-04-01' }
                ]
            },
            {
                id: 'G002',
                title: 'Improve Delegation Skills',
                description: 'Learn to effectively delegate tasks and empower team members',
                category: 'Team Management',
                framework: 'CLEAR',
                progress: 35,
                startDate: '2024-02-01',
                targetDate: '2024-05-01',
                status: 'active',
                milestones: [
                    { title: 'Complete Delegation Canvas Workshop', completed: true, date: '2024-02-10' },
                    { title: 'Identify 5 Delegation Opportunities', completed: true, date: '2024-02-20' },
                    { title: 'Delegate 3 Tasks Successfully', completed: false, date: '2024-03-15' },
                    { title: 'Monitor and Support Delegates', completed: false, date: '2024-04-10' }
                ]
            }
        ],
        recentSessions: [
            {
                id: 'S001',
                date: '2024-02-20',
                time: '10:30 AM',
                type: 'AI',
                framework: 'GROW',
                stage: 'Reality',
                topic: 'Handling Defensive Team Member',
                duration: 12,
                sentiment: 'positive',
                outcome: 'Identified specific triggers and developed action plan'
            },
            {
                id: 'S002',
                date: '2024-02-18',
                time: '2:15 PM',
                type: 'AI',
                framework: 'GROW',
                stage: 'Options',
                topic: 'Feedback Conversation Strategies',
                duration: 15,
                sentiment: 'positive',
                outcome: 'Explored 5 different approaches for providing constructive feedback'
            },
            {
                id: 'S003',
                date: '2024-02-15',
                time: '9:00 AM',
                type: 'Human',
                coach: 'Deepak Kumar',
                topic: 'Managing Team Conflicts',
                duration: 45,
                sentiment: 'positive',
                outcome: 'Developed conflict resolution framework for team'
            }
        ],
        nudges: [
            {
                id: 'N001',
                message: 'Before your 1:1 with Amit tomorrow at 2 PM, prepare one specific example using SBI framework',
                type: 'action',
                priority: 'high',
                dueDate: '2024-02-21',
                action: 'Prepare feedback example',
                status: 'pending'
            },
            {
                id: 'N002',
                message: 'Great progress on feedback skills! You\'ve completed 3 practice sessions this month',
                type: 'celebration',
                priority: 'low',
                date: '2024-02-19',
                status: 'read'
            },
            {
                id: 'N003',
                message: 'Consider booking a human coach session to discuss delegation challenges in depth',
                type: 'recommendation',
                priority: 'medium',
                date: '2024-02-17',
                status: 'pending'
            }
        ],
        contentRecommendations: [
            {
                id: 'C001',
                title: 'SBI Feedback Technique',
                type: 'Article',
                source: 'BAGIC Playbook',
                duration: 10,
                relevance: 92,
                topics: ['feedback', 'communication', 'leadership'],
                description: 'Situation-Behavior-Impact framework for delivering effective feedback',
                completionRate: 84,
                peerUsage: '84% Claims managers found this helpful',
                viewed: true,
                completed: true,
                rating: 5
            },
            {
                id: 'C002',
                title: 'Defensive Team Member Role-Play',
                type: 'Interactive',
                source: 'AI Practice',
                duration: 15,
                relevance: 89,
                topics: ['conflict', 'feedback', 'emotional-intelligence'],
                description: 'Practice handling defensive reactions during feedback conversations',
                completionRate: 0,
                peerUsage: '78% users saw improvement after 3+ practice sessions',
                viewed: false,
                completed: false
            },
            {
                id: 'C003',
                title: 'Delegation Canvas Workshop',
                type: 'Video',
                source: 'BAGIC L&D',
                duration: 25,
                relevance: 87,
                topics: ['delegation', 'team-management', 'productivity'],
                description: 'Structured approach to effective task delegation',
                completionRate: 100,
                peerUsage: '91% new managers completed this in first 90 days',
                viewed: true,
                completed: true,
                rating: 4
            },
            {
                id: 'C004',
                title: 'Handling Claims SLA Breach Conversations',
                type: 'Case Study',
                source: 'BAGIC Claims',
                duration: 12,
                relevance: 85,
                topics: ['claims', 'accountability', 'feedback'],
                description: 'Real scenarios from Claims BU on managing performance discussions',
                completionRate: 0,
                peerUsage: 'Specific to Claims Team Leads',
                viewed: false,
                completed: false
            }
        ],
        chatHistory: [
            {
                timestamp: '2024-02-20 10:30',
                sender: 'ai',
                message: 'Hi Rahul! How\'s it going with the feedback conversation we planned?'
            },
            {
                timestamp: '2024-02-20 10:31',
                sender: 'user',
                message: 'My team member got defensive. I\'m not sure what to do next.'
            },
            {
                timestamp: '2024-02-20 10:32',
                sender: 'ai',
                message: 'I understand that can be challenging. Let\'s use the GROW framework to work through this. We\'re in the Reality stage - let\'s understand what happened. Can you describe the specific moment they became defensive? What did you say, and how did they respond?',
                framework: 'GROW',
                stage: 'Reality'
            },
            {
                timestamp: '2024-02-20 10:34',
                sender: 'user',
                message: 'I mentioned that the last 3 claims he processed had errors. He immediately said "nobody told me about those issues" and crossed his arms.'
            },
            {
                timestamp: '2024-02-20 10:35',
                sender: 'ai',
                message: 'Thank you for that specific detail. That defensive body language and deflecting responsibility are common reactions. A few questions: 1) How did you frame the feedback initially? 2) What was your tone? 3) Did you start with context or jump straight to the errors?'
            },
            {
                timestamp: '2024-02-20 10:37',
                sender: 'user',
                message: 'I think I jumped straight to the errors. I said "You made mistakes on these 3 claims." Maybe that was too direct?'
            },
            {
                timestamp: '2024-02-20 10:38',
                sender: 'ai',
                message: 'That\'s great self-awareness, Rahul. Starting with "You made mistakes" can feel like an attack. Let\'s explore Options. The SBI framework could help here: Situation (context), Behavior (specific actions), Impact (consequences). Would you like to rewrite that opening using SBI?',
                framework: 'GROW',
                stage: 'Options'
            },
            {
                timestamp: '2024-02-20 10:40',
                sender: 'user',
                message: 'Yes! How about: "In the last 2 weeks (Situation), I noticed 3 claims you processed had documentation errors (Behavior). This delays our customer payouts and impacts our SLA scores (Impact)."'
            },
            {
                timestamp: '2024-02-20 10:41',
                sender: 'ai',
                message: 'Excellent! That\'s much less accusatory. Now you\'re describing observable facts, not making judgments. What else could you add to make him feel safe to discuss it?'
            },
            {
                timestamp: '2024-02-20 10:42',
                sender: 'user',
                message: 'Maybe ask "What\'s your perspective on this?" instead of assuming he was careless?'
            },
            {
                timestamp: '2024-02-20 10:43',
                sender: 'ai',
                message: 'Perfect! That question invites dialogue instead of triggering defense. Here\'s your action plan: 1) Practice rewriting 2 more feedback examples using SBI, 2) Before your next 1:1, ask yourself "Am I describing behavior or making judgments?", 3) Try the "What\'s your perspective?" question. I\'ll send you the Defensive Response Handling role-play to practice. Sound good?',
                framework: 'GROW',
                stage: 'Will'
            }
        ]
    },

    // Manager Data - Priya Mehta
    manager: {
        id: 'E2001',
        name: 'Priya Mehta',
        email: 'priya.mehta@bagic.com',
        role: 'Senior Claims Manager',
        band: 5,
        bu: 'Claims',
        location: 'Mumbai',
        teamSize: 12,
        team: [
            {
                id: 'E1001',
                name: 'Rahul Sharma',
                role: 'Claims Team Lead',
                band: 4,
                goalsActive: 2,
                progress: 60,
                sessionsThisMonth: 3,
                lastSession: '2024-02-20',
                status: 'on-track',
                riskLevel: 'low',
                next1on1: '2024-02-22 14:00'
            },
            {
                id: 'E1002',
                name: 'Amit Verma',
                role: 'Senior Claims Executive',
                band: 3,
                goalsActive: 1,
                progress: 85,
                sessionsThisMonth: 4,
                lastSession: '2024-02-19',
                status: 'on-track',
                riskLevel: 'low',
                next1on1: '2024-02-23 10:00'
            },
            {
                id: 'E1003',
                name: 'Vikram Singh',
                role: 'Claims Team Lead',
                band: 4,
                goalsActive: 2,
                progress: 25,
                sessionsThisMonth: 0,
                lastSession: '2024-02-03',
                status: 'at-risk',
                riskLevel: 'high',
                next1on1: '2024-02-21 16:00',
                alerts: ['No sessions for 2 weeks', 'Goal progress stalled']
            },
            {
                id: 'E1004',
                name: 'Sneha Reddy',
                role: 'Claims Executive',
                band: 3,
                goalsActive: 1,
                progress: 70,
                sessionsThisMonth: 2,
                lastSession: '2024-02-18',
                status: 'on-track',
                riskLevel: 'low'
            },
            {
                id: 'E1005',
                name: 'Karthik Nair',
                role: 'Senior Claims Executive',
                band: 3,
                goalsActive: 2,
                progress: 55,
                sessionsThisMonth: 2,
                lastSession: '2024-02-17',
                status: 'on-track',
                riskLevel: 'medium',
                next1on1: '2024-02-24 11:00'
            },
            {
                id: 'E1006',
                name: 'Anjali Desai',
                role: 'Claims Team Lead',
                band: 4,
                goalsActive: 1,
                progress: 90,
                sessionsThisMonth: 5,
                lastSession: '2024-02-20',
                status: 'exceeding',
                riskLevel: 'low'
            },
            {
                id: 'E1007',
                name: 'Rajesh Kumar',
                role: 'Claims Executive',
                band: 3,
                goalsActive: 1,
                progress: 45,
                sessionsThisMonth: 1,
                lastSession: '2024-02-14',
                status: 'needs-attention',
                riskLevel: 'medium',
                alerts: ['Low engagement - only 1 session this month']
            },
            {
                id: 'E1008',
                name: 'Pooja Iyer',
                role: 'Senior Claims Executive',
                band: 3,
                goalsActive: 2,
                progress: 75,
                sessionsThisMonth: 3,
                lastSession: '2024-02-19',
                status: 'on-track',
                riskLevel: 'low'
            },
            {
                id: 'E1009',
                name: 'Sanjay Patel',
                role: 'Claims Team Lead',
                band: 4,
                goalsActive: 1,
                progress: 80,
                sessionsThisMonth: 4,
                lastSession: '2024-02-20',
                status: 'on-track',
                riskLevel: 'low'
            },
            {
                id: 'E1010',
                name: 'Meera Joshi',
                role: 'Claims Executive',
                band: 3,
                goalsActive: 1,
                progress: 50,
                sessionsThisMonth: 2,
                lastSession: '2024-02-16',
                status: 'on-track',
                riskLevel: 'low'
            },
            {
                id: 'E1011',
                name: 'Arjun Rao',
                role: 'Senior Claims Executive',
                band: 3,
                goalsActive: 2,
                progress: 40,
                sessionsThisMonth: 1,
                lastSession: '2024-02-10',
                status: 'needs-attention',
                riskLevel: 'medium',
                alerts: ['Sentiment showing stress indicators']
            },
            {
                id: 'E1012',
                name: 'Divya Shah',
                role: 'Claims Executive',
                band: 3,
                goalsActive: 1,
                progress: 65,
                sessionsThisMonth: 3,
                lastSession: '2024-02-18',
                status: 'on-track',
                riskLevel: 'low'
            }
        ],
        teamAnalytics: {
            avgGoalCompletion: 62,
            totalActiveSessions: 26,
            avgSessionsPerEmployee: 2.2,
            riskDistribution: {
                low: 8,
                medium: 3,
                high: 1
            },
            topSkills: ['feedback', 'delegation', 'conflict-resolution', 'stakeholder-management'],
            improvementTrends: {
                feedbackSkill: 19,
                delegationSkill: 12,
                emotionalIntelligence: 15
            }
        },
        sessionPrep: {
            upcomingMeetings: [
                {
                    employee: 'Rahul Sharma',
                    date: '2024-02-22',
                    time: '14:00',
                    duration: 30,
                    lastSession: '2024-02-15',
                    aiSuggestions: {
                        topics: [
                            'Review feedback conversation outcome with defensive team member',
                            'Explore delegation opportunities for upcoming project',
                            'Discuss progress on SBI framework implementation'
                        ],
                        questions: [
                            'How did the conversation with your team member go after our coaching session?',
                            'What specific SBI examples have you practiced this week?',
                            'What support do you need to continue improving your feedback skills?'
                        ],
                        framework: 'GROW',
                        stage: 'Options',
                        resources: [
                            'Rahul\'s goal progress dashboard',
                            'Recent AI coaching session transcript',
                            'Delegation canvas template'
                        ]
                    }
                },
                {
                    employee: 'Vikram Singh',
                    date: '2024-02-21',
                    time: '16:00',
                    duration: 45,
                    lastSession: '2024-02-03',
                    aiSuggestions: {
                        topics: [
                            'Address 2-week gap in coaching engagement',
                            'Understand barriers to goal progress',
                            'Discuss workload and stress management'
                        ],
                        questions: [
                            'I noticed you haven\'t had any coaching sessions in 2 weeks. What\'s going on?',
                            'What obstacles are preventing you from making progress on your delegation goal?',
                            'How can I better support you right now?'
                        ],
                        framework: 'CLEAR',
                        stage: 'Listen',
                        alerts: ['High risk - disengagement pattern', 'Consider escalation to HR/EAP'],
                        resources: [
                            'Burnout assessment tool',
                            'Workload analysis',
                            'EAP contact information'
                        ]
                    }
                }
            ]
        }
    },

    // HR Program Data - Neha Kapoor
    hr: {
        id: 'E3001',
        name: 'Neha Kapoor',
        email: 'neha.kapoor@bagic.com',
        role: 'L&D Head',
        band: 6,
        bu: 'HR',
        programs: [
            {
                id: 'P001',
                name: 'New Manager Accelerator',
                status: 'active',
                startDate: '2024-01-01',
                duration: 90,
                enrolled: 212,
                active: 168,
                completed: 44,
                eligibility: 'Band 4+, <18 months in people management role',
                targetBUs: ['Claims', 'Underwriting', 'Distribution'],
                goals: ['Feedback Skills', 'Delegation', '1:1 Excellence'],
                metrics: {
                    enrollmentRate: 100,
                    activeRate: 79,
                    completionRate: 21,
                    avgSessions: 3.2,
                    goal360Improvement: 23,
                    managerConfidenceImprovement: 31,
                    costPerEmployee: 48,
                    totalCostSavings: 1800000
                },
                components: [
                    { week: '1-2', title: 'Goal Setting', type: 'AI-guided GROW', completion: 95 },
                    { week: '3-6', title: 'Feedback Skills', type: 'SBI playbook + role-plays', completion: 84 },
                    { week: '7-10', title: 'Delegation', type: 'Video + peer practice', completion: 68 },
                    { week: '11-12', title: '1:1 Excellence', type: 'AI session prep', completion: 52 }
                ]
            },
            {
                id: 'P002',
                name: 'Feedback Excellence',
                status: 'active',
                startDate: '2023-11-01',
                duration: 60,
                enrolled: 347,
                active: 298,
                completed: 182,
                eligibility: 'All people managers',
                targetBUs: ['All'],
                goals: ['SBI Mastery', 'Difficult Conversations', 'Continuous Feedback Culture'],
                metrics: {
                    enrollmentRate: 87,
                    activeRate: 86,
                    completionRate: 52,
                    avgSessions: 4.1,
                    goal360Improvement: 28,
                    costPerEmployee: 35
                }
            },
            {
                id: 'P003',
                name: 'HiPo Accelerator',
                status: 'active',
                startDate: '2024-01-15',
                duration: 180,
                enrolled: 150,
                active: 142,
                completed: 8,
                eligibility: '9-box High Potential, Band 3-4',
                targetBUs: ['All'],
                goals: ['Stakeholder Influence', 'Strategic Thinking', 'Cross-functional Leadership'],
                metrics: {
                    enrollmentRate: 100,
                    activeRate: 95,
                    completionRate: 5,
                    avgSessions: 5.8,
                    successionReadinessImprovement: 22,
                    costPerEmployee: 125
                }
            },
            {
                id: 'P004',
                name: 'Stakeholder Influence',
                status: 'active',
                startDate: '2023-12-01',
                duration: 120,
                enrolled: 89,
                active: 76,
                completed: 34,
                eligibility: 'Band 3+, Underwriting/Finance',
                targetBUs: ['Underwriting', 'Finance'],
                goals: ['Stakeholder Mapping', 'Influence Strategies', 'Executive Presence'],
                metrics: {
                    enrollmentRate: 93,
                    activeRate: 85,
                    completionRate: 38,
                    avgSessions: 3.7,
                    stakeholderFeedbackImprovement: 35
                }
            }
        ],
        impactDashboard: {
            totalEmployees: 5000,
            totalEnrolled: 798,
            totalActive: 684,
            enrollmentRate: 16,
            activeEngagementRate: 86,
            totalSessions: 2847,
            avgSessionsPerUser: 4.2,
            totalGoals: 1247,
            goalsCompleted: 687,
            goalCompletionRate: 55,
            totalCostSavings: 2200000,
            avgCostPerEmployee: 60,
            externalCoachingAvoidance: 3300000,
            roi: 7.3,
            manager360Improvement: 23,
            hipoRetentionImprovement: 18,
            timeToCompetencyReduction: 20,
            boundaryViolations: 0,
            escalations: 18,
            auditPassRate: 100,
            userTrustScore: 4.4
        },
        roiCalculator: {
            assumptions: {
                externalCoachingCost: 18000,
                externalCoachingUsers: 50,
                internalCoachingScaleUpCost: 12000,
                internalCoachingScaleUpUsers: 200,
                platformCostYear1: 340000,
                platformCostYear2Plus: 300000,
                managerAttritionReduction: 20,
                avgReplacementCost: 120000,
                productivityGain: 5,
                avgManagerSalary: 80000,
                timeToProductivityReduction: 30
            },
            calculations: {
                externalCoachingAvoided: 900000,
                internalScaleUpAvoided: 2400000,
                totalAvoidance: 3300000,
                netSavingsYear1: 2960000,
                attritionSavings: 2400000,
                productivityGain: 800000,
                timeToProductivitySavings: 328000,
                totalValueYear1: 6488000,
                roiYear1: 8.7
            }
        },
        grmQueries: [
            {
                id: 'Q001',
                query: 'Why did AI suggest SBI Feedback content to Rahul Sharma on 2024-02-20?',
                timestamp: '2024-02-20 15:30',
                user: 'Neha Kapoor',
                results: {
                    reasoningEventId: 'R-2024-001234',
                    employee: 'Rahul Sharma (E1001)',
                    decision: 'Recommend content C001 (SBI Feedback Technique)',
                    evidenceChain: [
                        { type: 'Goal', data: 'Employee has active goal "Handle Tough Feedback Conversations"' },
                        { type: 'Topic', data: 'Recent session topic: feedback + conflict' },
                        { type: 'Framework', data: 'GROW Reality stage needs skill building' },
                        { type: 'Peer Data', data: '84% Claims managers with similar goals rated this 4+' },
                        { type: 'BU Context', data: 'Claims-specific scenarios included' }
                    ],
                    rules: [
                        'Goal-Content Matching: If active goal matches content topics → High relevance',
                        'Framework Alignment: GROW Reality stage → Skill-building content priority',
                        'Peer Success: Completion rate >80% in similar cohort → Boost confidence',
                        'BU Specificity: Content has BU-specific examples → Higher relevance'
                    ],
                    score: 92,
                    confidence: 'High',
                    humanReview: 'Not required',
                    policyCompliance: 'PASS'
                }
            },
            {
                id: 'Q002',
                query: 'Show all Claims managers who received conflict resolution nudges in Q4 2023',
                timestamp: '2024-02-15 11:20',
                user: 'Neha Kapoor',
                results: {
                    count: 47,
                    employees: ['E1001', 'E1003', 'E1009', '... (44 more)'],
                    avgNudgeResponseRate: 68,
                    goalProgressImprovement: 15,
                    completionRate: 72
                }
            }
        ]
    },

    // Compliance Data - Arjun Patel
    compliance: {
        id: 'E4001',
        name: 'Arjun Patel',
        email: 'arjun.patel@bagic.com',
        role: 'Risk & Compliance Officer',
        band: 6,
        bu: 'Risk',
        complianceOverview: {
            totalReasoningEvents: 12847,
            period: 'Q4 2023',
            violations: 0,
            escalations: 43,
            humanReviews: 43,
            auditTrailComplete: 12847,
            auditPassRate: 100,
            policyCompliance: 100,
            boundaryCategories: {
                clinical: { checks: 12847, violations: 0, escalations: 8 },
                legal: { checks: 12847, violations: 0, escalations: 2 },
                hr: { checks: 12847, violations: 0, escalations: 12 },
                confidentiality: { checks: 12847, violations: 0, escalations: 3 }
            }
        },
        grmExplorer: {
            recentQueries: [
                {
                    id: 'R-2024-001234',
                    timestamp: '2024-02-20 10:43',
                    employee: 'Rahul Sharma (E1001)',
                    session: 'S001',
                    decision: 'Recommend Defensive Response Role-play',
                    evidenceGraph: {
                        nodes: [
                            { id: 'E1', type: 'Employee', label: 'Rahul Sharma' },
                            { id: 'G1', type: 'Goal', label: 'Feedback Skills' },
                            { id: 'T1', type: 'Topic', label: 'Conflict + Feedback' },
                            { id: 'F1', type: 'Framework', label: 'GROW - Options Stage' },
                            { id: 'C1', type: 'Content', label: 'Defensive Response Role-play' },
                            { id: 'P1', type: 'Peers', label: '78% success rate' }
                        ],
                        edges: [
                            { from: 'E1', to: 'G1', label: 'HAS_GOAL' },
                            { from: 'G1', to: 'T1', label: 'DEVELOPS_TOPIC' },
                            { from: 'E1', to: 'F1', label: 'CURRENT_STAGE' },
                            { from: 'F1', to: 'C1', label: 'REQUIRES_PRACTICE' },
                            { from: 'P1', to: 'C1', label: 'VALIDATED' }
                        ]
                    },
                    rulesApplied: [
                        'GROW Options stage → Practice-based content priority',
                        'Topic match (conflict + feedback) → Relevant scenario',
                        'Peer success rate >75% → High confidence recommendation',
                        'BU context (Claims) → Claims-specific defensive scenarios'
                    ],
                    policyChecks: [
                        { policy: 'Clinical Boundary', status: 'PASS', note: 'No mental health advice given' },
                        { policy: 'Confidentiality', status: 'PASS', note: 'No PII shared' },
                        { policy: 'BAGIC Feedback Guidelines', status: 'PASS', note: 'SBI framework aligned' }
                    ],
                    outcome: 'Recommendation delivered, user accepted',
                    humanReview: 'Not required',
                    confidence: 89
                },
                {
                    id: 'R-2024-001189',
                    timestamp: '2024-02-18 14:22',
                    employee: 'Vikram Singh (E1003)',
                    session: 'S156',
                    decision: 'Escalate to EAP',
                    evidenceGraph: {
                        nodes: [
                            { id: 'E3', type: 'Employee', label: 'Vikram Singh' },
                            { id: 'K1', type: 'Keywords', label: 'overwhelmed, anxious, can\'t sleep' },
                            { id: 'G2', type: 'Guardrail', label: 'Mental Health Escalation' },
                            { id: 'E2', type: 'EAP', label: 'Employee Assistance Program' }
                        ],
                        edges: [
                            { from: 'E3', to: 'K1', label: 'EXPRESSED' },
                            { from: 'K1', to: 'G2', label: 'TRIGGERED' },
                            { from: 'G2', to: 'E2', label: 'ESCALATE_TO' }
                        ]
                    },
                    rulesApplied: [
                        'Stress keywords detected: "overwhelmed", "anxious", "can\'t sleep"',
                        'Pattern: 3+ stress indicators in single session',
                        'Guardrail: Mental health concerns → Mandatory EAP escalation',
                        'AI response: "This sounds challenging. Let me connect you with our EAP..."'
                    ],
                    policyChecks: [
                        { policy: 'Clinical Boundary', status: 'TRIGGERED', note: 'Mental health escalation required' },
                        { policy: 'Duty of Care', status: 'PASS', note: 'Proper escalation executed' }
                    ],
                    outcome: 'EAP referral sent, HR notified, Manager alerted',
                    humanReview: 'Approved by HR',
                    confidence: 100
                }
            ],
            violationMonitor: {
                totalViolations: 0,
                lastViolation: 'None',
                categories: {
                    clinicalBoundary: 0,
                    legalRisk: 0,
                    confidentiality: 0,
                    policyBreach: 0
                },
                recentAlerts: []
            }
        },
        auditReports: [
            {
                id: 'A-Q4-2023',
                period: 'Q4 2023',
                generated: '2024-01-05',
                totalEvents: 12847,
                violations: 0,
                escalations: 43,
                policyCompliance: 100,
                status: 'PASS',
                auditor: 'Arjun Patel',
                exported: true,
                exportDate: '2024-01-05'
            },
            {
                id: 'A-Q3-2023',
                period: 'Q3 2023',
                generated: '2023-10-05',
                totalEvents: 9234,
                violations: 0,
                escalations: 28,
                policyCompliance: 100,
                status: 'PASS',
                auditor: 'Arjun Patel',
                exported: true,
                exportDate: '2023-10-05'
            }
        ],
        policyManagement: {
            activePolicies: [
                {
                    id: 'POL-001',
                    name: 'Clinical Boundary Policy',
                    category: 'Safety',
                    version: '2.1',
                    lastUpdated: '2023-12-01',
                    status: 'Active',
                    description: 'Prevents AI from providing mental health diagnosis, therapy, or medical advice',
                    triggers: ['depression', 'suicide', 'therapy', 'medication', 'diagnosis'],
                    action: 'Block response, escalate to EAP',
                    testsPassed: 147,
                    violations: 0
                },
                {
                    id: 'POL-002',
                    name: 'Confidentiality Policy',
                    category: 'Privacy',
                    version: '1.8',
                    lastUpdated: '2023-11-15',
                    status: 'Active',
                    description: 'Ensures no PII or confidential business data is logged or shared',
                    triggers: ['salary details', 'personal contact', 'performance ratings'],
                    action: 'Redact data, log audit event',
                    testsPassed: 89,
                    violations: 0
                },
                {
                    id: 'POL-003',
                    name: 'BAGIC Feedback Guidelines',
                    category: 'Culture',
                    version: '3.2',
                    lastUpdated: '2024-01-10',
                    status: 'Active',
                    description: 'Aligns AI coaching with BAGIC leadership principles and feedback standards',
                    principles: ['SBI framework', 'Growth mindset', 'Respect and empathy'],
                    action: 'Guide AI responses to align with BAGIC values',
                    testsPassed: 234,
                    violations: 0
                }
            ]
        }
    },

    // Content Library
    contentLibrary: [
        {
            id: 'C001',
            title: 'SBI Feedback Technique',
            type: 'Article',
            source: 'BAGIC Playbook',
            duration: 10,
            topics: ['feedback', 'communication', 'leadership'],
            skills: ['feedback', 'emotional-intelligence'],
            description: 'Situation-Behavior-Impact framework for delivering effective feedback',
            targetRoles: ['Team Lead', 'Manager', 'Senior Manager'],
            targetBUs: ['All'],
            views: 1847,
            completions: 1552,
            avgRating: 4.6,
            peerSuccess: 84
        },
        {
            id: 'C002',
            title: 'Defensive Team Member Role-Play',
            type: 'Interactive',
            source: 'AI Practice',
            duration: 15,
            topics: ['conflict', 'feedback', 'emotional-intelligence'],
            skills: ['conflict-resolution', 'empathy'],
            description: 'Practice handling defensive reactions during feedback conversations',
            targetRoles: ['Team Lead', 'Manager'],
            targetBUs: ['All'],
            views: 892,
            completions: 698,
            avgRating: 4.4,
            peerSuccess: 78
        },
        {
            id: 'C003',
            title: 'Delegation Canvas Workshop',
            type: 'Video',
            source: 'BAGIC L&D',
            duration: 25,
            topics: ['delegation', 'team-management', 'productivity'],
            skills: ['delegation', 'team-leadership'],
            description: 'Structured approach to effective task delegation',
            targetRoles: ['Team Lead', 'Manager'],
            targetBUs: ['All'],
            views: 1234,
            completions: 1123,
            avgRating: 4.7,
            peerSuccess: 91
        },
        {
            id: 'C004',
            title: 'Handling Claims SLA Breach Conversations',
            type: 'Case Study',
            source: 'BAGIC Claims',
            duration: 12,
            topics: ['claims', 'accountability', 'feedback'],
            skills: ['accountability', 'feedback'],
            description: 'Real scenarios from Claims BU on managing performance discussions',
            targetRoles: ['Team Lead', 'Manager'],
            targetBUs: ['Claims'],
            views: 567,
            completions: 482,
            avgRating: 4.5,
            peerSuccess: 85
        }
    ],

    // Skills Taxonomy
    skills: [
        { id: 'SK001', name: 'Feedback', category: 'Leadership', demandScore: 92 },
        { id: 'SK002', name: 'Delegation', category: 'Team Management', demandScore: 87 },
        { id: 'SK003', name: 'Conflict Resolution', category: 'Interpersonal', demandScore: 79 },
        { id: 'SK004', name: 'Stakeholder Influence', category: 'Leadership', demandScore: 84 },
        { id: 'SK005', name: 'Emotional Intelligence', category: 'Interpersonal', demandScore: 88 },
        { id: 'SK006', name: 'Strategic Thinking', category: 'Leadership', demandScore: 76 },
        { id: 'SK007', name: 'Coaching', category: 'People Development', demandScore: 71 }
    ]
};

export function getEmployeeById(id) {
    if (id === 'E1001') return MOCK_DATA.employee;
    if (id === 'E2001') return MOCK_DATA.manager;
    return null;
}

export function getTeamMemberById(id) {
    return MOCK_DATA.manager.team.find(member => member.id === id);
}

export function getProgramById(id) {
    return MOCK_DATA.hr.programs.find(program => program.id === id);
}


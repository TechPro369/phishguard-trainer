import { createClient } from "@supabase/supabase-js"

// Initialize the Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// Create a singleton instance of the Supabase client
let supabase: ReturnType<typeof createClient> | null = null

export function getSupabase() {
  // If environment variables are not set, return null and use mock data
  if (!supabaseUrl || !supabaseAnonKey) {
    return null
  }

  if (!supabase) {
    supabase = createClient(supabaseUrl, supabaseAnonKey)
  }
  return supabase
}

// Safe database operations with fallbacks to mock data
export async function getCampaigns() {
  try {
    const supabase = getSupabase()
    if (!supabase) {
      console.log("Using mock campaign data")
      return mockCampaigns
    }

    const { data, error } = await supabase.from("campaigns").select("*").order("created_at", { ascending: false })

    if (error) throw error
    return data || mockCampaigns
  } catch (error) {
    console.error("Error fetching campaigns:", error)
    return mockCampaigns
  }
}

export async function createCampaign(campaignData: any) {
  try {
    const supabase = getSupabase()
    if (!supabase) {
      console.log("Using mock data - campaign would be created:", campaignData)
      // Return a mock successful response with the data
      return {
        success: true,
        data: {
          id: "mock-id-" + Date.now(),
          ...campaignData,
          recipients: Math.floor(Math.random() * 100) + 50,
          click_rate: 0,
          submission_rate: 0,
          report_rate: 0,
          created_at: new Date().toISOString(),
        },
      }
    }

    const { data, error } = await supabase.from("campaigns").insert(campaignData).select()

    if (error) throw error
    return { success: true, data }
  } catch (error) {
    console.error("Error creating campaign:", error)
    return { success: false, error }
  }
}

export async function getCampaignById(id: string) {
  try {
    const supabase = getSupabase()
    if (!supabase) {
      // Find the campaign in mock data
      const campaign = mockCampaigns.find((c) => c.id === id)
      return campaign || null
    }

    const { data, error } = await supabase.from("campaigns").select("*").eq("id", id).single()

    if (error) throw error
    return data
  } catch (error) {
    console.error("Error fetching campaign:", error)
    return null
  }
}

// Mock data for fallback when database is not available
const mockCampaigns = [
  {
    id: "campaign-1",
    name: "Password Reset Campaign",
    description: "Simulated password reset request",
    start_date: "2023-03-15",
    end_date: "2023-03-22",
    template: "password-reset",
    audience: "department",
    department: "marketing",
    recipients: 145,
    click_rate: 24.3,
    submission_rate: 12.7,
    report_rate: 38.2,
    created_at: "2023-03-15T00:00:00Z",
  },
  {
    id: "campaign-2",
    name: "Document Share Simulation",
    description: "Simulated document sharing notification",
    start_date: "2023-02-22",
    end_date: "2023-03-01",
    template: "document-share",
    audience: "department",
    department: "finance",
    recipients: 132,
    click_rate: 31.2,
    submission_rate: 18.5,
    report_rate: 29.7,
    created_at: "2023-02-22T00:00:00Z",
  },
  {
    id: "campaign-3",
    name: "Package Delivery Notice",
    description: "Simulated package delivery notification",
    start_date: "2023-01-10",
    end_date: "2023-01-17",
    template: "package-delivery",
    audience: "department",
    department: "sales",
    recipients: 156,
    click_rate: 35.8,
    submission_rate: 22.1,
    report_rate: 25.3,
    created_at: "2023-01-10T00:00:00Z",
  },
]

// Mock data for users
export const mockUsers = [
  { id: "user-1", email: "john.smith@example.com", department: "IT" },
  { id: "user-2", email: "sarah.johnson@example.com", department: "Marketing" },
  { id: "user-3", email: "michael.chen@example.com", department: "Finance" },
  { id: "user-4", email: "emily.davis@example.com", department: "Sales" },
  { id: "user-5", email: "robert.wilson@example.com", department: "HR" },
]

// Mock function to record interactions
export async function recordInteraction(campaignId: string, email: string, type: string) {
  console.log(`Mock: Recording ${type} interaction for ${email} in campaign ${campaignId}`)
  return { success: true }
}


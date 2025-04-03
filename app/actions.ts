"use server"

import { createCampaign } from "@/lib/db"

export async function createCampaignAction(formData: FormData) {
  try {
    // Extract and validate form data
    const name = formData.get("name") as string
    const description = formData.get("description") as string
    const startDate = formData.get("startDate") as string
    const endDate = formData.get("endDate") as string
    const template = formData.get("template") as string
    const audience = formData.get("audience") as string
    const department = formData.get("department") as string

    // Basic validation
    if (!name || !startDate || !endDate || !template) {
      return {
        success: false,
        message: "Please fill in all required fields",
      }
    }

    // Create campaign in database or mock data
    const campaignData = {
      name,
      description,
      start_date: startDate,
      end_date: endDate,
      template,
      audience,
      department,
      recipients: 0,
      click_rate: 0,
      submission_rate: 0,
      report_rate: 0,
      created_at: new Date().toISOString(),
    }

    const result = await createCampaign(campaignData)

    if (result.success) {
      return {
        success: true,
        message: "Campaign created successfully",
        data: result.data,
      }
    } else {
      return {
        success: false,
        message: "Failed to create campaign",
      }
    }
  } catch (error) {
    console.error("Error in createCampaignAction:", error)
    return {
      success: false,
      message: "An unexpected error occurred",
    }
  }
}


'use server';

import { zkpMatch, type ZkpMatchInput, type ZkpMatchOutput } from "@/ai/flows/zkp-match";
import { z } from "zod";

const ZkpDatingSchema = z.object({
  ageRange: z.string().min(1, "Age range is required."),
  locationProximity: z.string().min(1, "Location proximity is required."),
  sharedInterests: z.string().min(1, "Shared interests are required."),
  trustScoreThreshold: z.coerce.number().min(0).max(100, "Trust score must be between 0 and 100."),
});

export interface ZkActionState {
    message: string | null;
    result: ZkpMatchOutput | null;
}

export async function findZkMatch(
    prevState: ZkActionState,
    formData: FormData,
): Promise<ZkActionState> {
    const validatedFields = ZkpDatingSchema.safeParse({
        ageRange: formData.get('ageRange'),
        locationProximity: formData.get('locationProximity'),
        sharedInterests: formData.get('sharedInterests'),
        trustScoreThreshold: formData.get('trustScoreThreshold'),
    });

    if (!validatedFields.success) {
        return {
            message: "Please fill in all required fields.",
            result: null,
        }
    }
    
    try {
        const result = await zkpMatch(validatedFields.data as ZkpMatchInput);
        return {
            message: "Match found!",
            result: result,
        };
    } catch (e) {
        return {
            message: "An error occurred while finding a match. Please try again.",
            result: null,
        }
    }
}

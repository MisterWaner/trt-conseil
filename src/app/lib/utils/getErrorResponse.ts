import { NextResponse } from "next/server";
import { ZodError } from "zod";

// This function is used to return a JSON response with a status code and a message
export function getErrorResponse(
    status: number = 500,
    message: string,
    errors: ZodError | null = null
) {
    return new NextResponse(
        JSON.stringify({
            status: status < 500 ? "fail" : "error",
            message,
            errors: errors ? errors.flatten() : null
        }),
        {
            status,
            headers: {
                "Content-Type": "application/json"
            }
        }
    )
}
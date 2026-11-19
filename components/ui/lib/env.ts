function required(name:string,value:string | undefined):string {
    if(!value) {
        throw new Error (`Missing required env var: ${name}`)
    } 
    return value
}

export const env ={
    apiUrl: required(
    "NEXT_PUBLIC_API_URL",
    process.env.NEXT_PUBLIC_API_URL
    ).replace(/\/$/, ""),
    razorpaykeyId:process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID ?? "",
    isDev: process.env.NODE_ENV === "development",
} as const
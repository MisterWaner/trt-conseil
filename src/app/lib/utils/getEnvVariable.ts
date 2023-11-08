type EnvVariableKey = "JWT_SECRET_KEY" | "JWT_EXPIRES_IN";

//Function to get the value of an environment variable
export function getEnvVariable(key: EnvVariableKey): string {
    const value = process.env[key];

    if (!value || value.length === 0) {
        console.error(`Env variable ${key} is not defined`);
        throw new Error(`Env variable ${key} is not defined`);
    }

    return value;
}

import { Context } from "hono"

interface ProfileResponse {
    profiles: {
        [uuid: string]: {
            cute_name: string;
            game_mode: string;
            current: boolean;
        };
    };
}

export class SkycryptAPI {
    private static readonly profileEndpoint = 'https://sky.shiiyu.moe/api/v2/profile/'
    private static context: Context

    constructor(context: Context) {
        SkycryptAPI.context = context
    }

    public static getCurrentProfileUUID(user: string): string {
        try {
            const response = fetch(`${SkycryptAPI.profileEndpoint}${user}`);
            const data: ProfileResponse = response.json();
            const profiles = data.profiles;

            for (const [uuid, profile] of Object.entries(profiles)) {
                if (profile.current) {
                    return uuid;
                }
            }
            return ''; // Return an empty string if no current profile is found
        } catch (err) {
            console.error(err);
            return ''; // Return an empty string on error
        }
    }

    public static async getProfileDetails(user: string, uuid: string): Promise<string> {
        try {
            const response = await fetch(`${SkycryptAPI.profileEndpoint}${user}`);
            const data: ProfileResponse = await response.json();
            const profile = data.profiles[uuid];

            if (profile) {
                const { cute_name, game_mode } = profile;
                return `${cute_name}, ${game_mode}`;
            }
            return ''; // Return an empty string if the profile with the given UUID is not found
        } catch (err) {
            console.error(err);
            return ''; // Return an empty string on error
        }
    }
    
}

export const debugger$ = async (c: Context) => {
};
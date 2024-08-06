interface ProfileResponse {
    profiles: {
        [uuid: string]: {
            cute_name: string;
            game_mode: string;
            current: boolean;
        };
    };
}

interface ErrorResponse {
    error: string;
}

export enum Answer {
    NONE = 'none',
    ERROR = 'error',
    NOT_FOUND = 'notfound'
}

export class SkycryptAPI {
    private static readonly profileEndpoint = 'https://sky.shiiyu.moe/api/v2/profile/'

    public static async getCurrentProfileUUID(user: string): Promise<string> {
        const response = await fetch(`${SkycryptAPI.profileEndpoint}${user}`);
        const data: ProfileResponse | ErrorResponse = await response.json();
        if ('error' in data) {
            if (data.error.startsWith('SkyCryptError: No user with the name')) {
                return Answer.NOT_FOUND;
            } else if (data.error === 'Player has no SkyBlock profiles.') {
                return Answer.NONE;
            } else {
                return Answer.ERROR;
            }
        }
        
        const profiles = data.profiles;

        if (!response.ok) {
            return Answer.ERROR;
        }

        for (const [uuid, profile] of Object.entries(profiles)) {
            if (profile.current) {
                return uuid;
            }
        }
        return Answer.NONE;
    }

    public static async getProfileDetails(user: string, uuid: string): Promise<string[]> {
        try {
            const response = await fetch(`${SkycryptAPI.profileEndpoint}${user}`);
            const data: ProfileResponse = await response.json();
            const profile = data.profiles[uuid];

            if (profile) {
                const { cute_name, game_mode } = profile;
                return [cute_name, game_mode];
            }
            return ['none', 'none']; // Return an empty string if the profile with the given UUID is not found
        } catch (err) {
            console.error(err);
            return []; // Return an empty string on error
        }
    }
    
}
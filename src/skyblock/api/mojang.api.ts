interface SuccessResponse { id: string, name: string }
interface ErrorResponse { path: string, errorMessage: string }

class MojangAPI {
    public static async getUUID(name: string) {
        const res = await fetch('https://api.mojang.com/users/profiles/minecraft/' + name);
        const data = await (res.json() as Promise<SuccessResponse | ErrorResponse>);
        if ('id' in data) {
            return data.id;
        } else {
            return 'null';
        }
    }
}
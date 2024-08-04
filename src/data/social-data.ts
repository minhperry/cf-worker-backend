import socials from '../../data/socials.json';

type TKey = keyof typeof socials

export const getSocialData = (): Response => {
    let key: TKey

    const filtered = Object.keys(socials).reduce((obj, key) => {
        obj[key as TKey] = socials[key as TKey]
            .filter((item) => !item.hidden)
            .map(({hidden, ...rest}) => rest);
        return obj;
    }, {} as Record<TKey, Omit<typeof socials[TKey][number], 'hidden'>[]>);

    
    return new Response(JSON.stringify(filtered), {
        headers: { 'Content-Type': 'application/json' },
    });
}
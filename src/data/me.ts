import { Context } from 'hono';
import data from '../../json-data/personal.json'
import { getUserField } from '../utils/jwt';

export const personalHandler = (c: Context) => {
    const user = getUserField(c)
    if (user === undefined) { return c.json({error: 'Invalid payload'}, 400)}
    if (user.role === 'admin' || user.role === 'recruiter') {
        return c.json(data)
    } else return c.json({ error: 'Unauthorized' }, 401)
}

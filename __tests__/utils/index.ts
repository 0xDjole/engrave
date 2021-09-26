import faker from 'faker'
import moment from 'moment'

export const randomData = (): string => {
    const name = `${faker.lorem.word(
        5
    )}-${moment().toISOString()}-${faker.lorem.word(5)}`

    return name
}

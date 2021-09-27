import faker from 'faker'
import moment from 'moment'

export const randomData = (): Buffer => {
    const name = `${faker.lorem.word(
        5
    )}-${moment().toISOString()}-${faker.lorem.word(5)}`

    return Buffer.from(name)
}

export const randomImage = (): string => {
    const image = faker.image.image()
    return image
}

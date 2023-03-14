import { createElement } from 'react'
import type { IconName } from './IconName.type'

const SPRITE_PATH = 'sprite.svg'

export const Icon = ({ name }: { name: IconName }) =>
    createElement(
        'svg',
        { name },
        createElement('use', { "x:href": `${SPRITE_PATH}#${name}` })
    )

export type { IconName } 

import React from 'react'
import type { IconNames } from './sources'

const SPRITE_PATH = 'sprite.svg'

export const Icon = ({ name }: { name: IconNames }) =>
    React.createElement(
        'svg',
        { name },
        React.createElement('use', { "x:href": `${SPRITE_PATH}#${name}` })
    )

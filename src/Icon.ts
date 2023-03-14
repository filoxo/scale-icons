import React from 'react'
import type { IconName } from './IconName'

const SPRITE_PATH = 'sprite.svg'

export const Icon = ({ name }: { name: IconName }) =>
    React.createElement(
        'svg',
        { name },
        React.createElement('use', { "x:href": `${SPRITE_PATH}#${name}` })
    )

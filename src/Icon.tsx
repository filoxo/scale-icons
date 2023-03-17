import type { IconName } from './IconName.type'

const SPRITE_PATH = 'sprite.svg'

export const Icon = ({ name }: { name: IconName }) => (
    <svg>
        <use xlinkHref={`${SPRITE_PATH}#${name}`} />
    </svg>
)

export type { IconName } 
